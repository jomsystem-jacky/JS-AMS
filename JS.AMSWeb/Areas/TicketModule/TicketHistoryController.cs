using System.Data;
using JS.AMSWeb.Areas.TicketModule.ViewModels.TicketHistory;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using X.PagedList;
using JS.AMS.Data;
using JS.AMSWeb.DTO.Identity;
using JS.AMSWeb.Utils;
using JS.AMSWeb.DTO.Shared;
using JS.AMS.Data.Entity.TicketModule;
using JS.AMS.Data.Entity.Shared.Enum;
using JS.AMS.Data.Entity.Shared;
using JS.AMSWeb.Services.Azure;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace JS.AMSWeb.Areas.TicketModule
{
    [Area("TicketModule")]
    public class TicketHistoryController : Controller
    {
        private readonly AMSDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IAzureBlobService _azureBlobService;

        public TicketHistoryController(AMSDbContext db, IWebHostEnvironment webHostEnvironment, IAzureBlobService azureBlobService)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;
            _azureBlobService = azureBlobService;
        }

        public IActionResult Index(int? page, string searchName, Guid ticketInfoId)
        {
            var pagination = new PaginationDTO();
            pagination.CurrentPage = page ?? 1;

            var sessionData = HttpContext.Session?.GetObjectFromJson<UserSessionDTO>("UserSession") ?? null;
            if (sessionData == null)
            {
                return Redirect("/");
            }

            var ticketInfo = _db.TicketInfos
                .Include(m => m.TicketHistories).ThenInclude(m => m.TicketStatus)
                .Include(m => m.TicketRaisedByStaff).ThenInclude(m => m.CompanyProfile)
                .Include(m => m.TicketCategory)
                .FirstOrDefault(x => x.Active && x.Id == ticketInfoId);
            if (ticketInfo == null)
            {
                return BadRequest("Ticket Info not found");
            }

            if (!string.IsNullOrWhiteSpace(searchName))
            {
                ticketInfo = (TicketInfo)ticketInfo.TicketHistories.Where(x => x.TicketStatus.Name.ToLower().Replace(" ", "").Contains(searchName.ToLower().Replace(" ", "")));
            }

            var listVm = new List<TicketHistoryViewModel>();

            var ticketHistoriesList = ticketInfo.TicketHistories.ToList();
            foreach (var a in ticketHistoriesList)
            {
                var vm = new TicketHistoryViewModel();
                vm.TicketInfoId = a.TicketInfoId;
                vm.TicketInfoName = a.TicketInfo.TicketRaisedByStaff.CompanyProfile.Name;
                vm.TicketCategoryId = a.TicketInfoId;
                vm.TicketCategoryName = a.TicketInfo.TicketCategory.Name;
                vm.TicketStatusId = a.TicketStatusId;
                vm.TicketStatusName = a.TicketStatus.Name;
                vm.Remark = a.Remark;
                vm.OtherDescription = a.OtherDescription;

                //if (a.CoverPhotoId.HasValue)
                //{
                //    vm.CoverPhotoUrl = _azureBlobService.GetBlobUrl(a.CoverPhoto.Url, ImageContainer.TICKET_METHOD_IMAGE_CONTAINER);
                //}

                listVm.Add(vm);
            }

            int pageSize = 10;
            int pageNumber = page ?? 1;

            ViewData["SearchName"] = searchName;

            var listing = listVm.ToPagedList(pageNumber, pageSize);

            var result = new TicketHistoryPageViewModel();
            result.Listing = listing;
            result.UpdateTicketStatusDTO = new UpdateTicketStatusViewModel();
            result.UpdateTicketStatusDTO.TicketInfoId = ticketInfo.Id;

            ViewBag.TicketStatuses = new SelectList(_db.TicketStatuses.Where(x => x.Active).ToList(), "Id", "Name");

            return View(result);
        }

        [HttpPost]
        public IActionResult Search(string? searchName, int? page)
        {
            if (page == 0 || page == null)
            {
                page = 1;
            }

            return RedirectToAction("Index", new { page = page, searchName = searchName });
        }

        [HttpPost]
        public async Task<IActionResult> UpdateStatus(UpdateTicketStatusViewModel dto)
        {
            var sessionData = HttpContext.Session?.GetObjectFromJson<UserSessionDTO>("UserSession") ?? null;
            if (sessionData == null)
            {
                return Redirect("/");
            }

            var ticketInfo = _db.TicketInfos
                .FirstOrDefault(x => x.Id == dto.TicketInfoId);
            if (ticketInfo == null)
            {
                return BadRequest("Ticket Info not found");
            }

            var ticketHistory = new TicketHistory();
            ticketHistory.Active = true;
            ticketHistory.Remark = dto.Remark;
            ticketHistory.OtherDescription = dto.OtherDescription;
            ticketHistory.TicketInfo = ticketInfo;

            var ticketStatus = _db.TicketStatuses
                .FirstOrDefault(x => x.Id == dto.TicketStatusId);
            if (ticketStatus == null)
            {
                return BadRequest("Ticket Status not found");
            }

            ticketHistory.TicketStatus = ticketStatus;

            _db.TicketHistories.Add(ticketHistory);
            _db.SaveChanges(sessionData.Username);

            foreach (var file in dto.Files)
            {
                if (file.Length > 0)
                {
                    var filePath = await ImageHelper.GetTempUploadedFilePath(file);

                    var media = new Media();
                    media.Name = $"{file.FileName}".ToUpper();
                    media.Url = $"{media.Name}-{Guid.NewGuid()}";
                    media.Active = true;
                    media.MediaType = MediaTypeEnum.Image;

                    _db.Medias.Add(media);
                    _db.SaveChanges(sessionData.Username);

                    var uploadedImage = _azureBlobService.AddImage(media.Url, filePath, ImageContainer.TICKET_METHOD_IMAGE_CONTAINER);
                    if (!uploadedImage)
                    {
                        return BadRequest("Image blob upload failed");
                    }

                    var ticketHistoryMedia = new TicketHistoryMedia();
                    ticketHistoryMedia.Active = true;
                    ticketHistoryMedia.Media = media;
                    ticketHistoryMedia.TicketHistory = ticketHistory;

                    _db.TicketHistoryMedias.Add(ticketHistoryMedia);
                    _db.SaveChanges(sessionData.Username);
                }
            }

            return RedirectToAction("Index", new { ticketInfoId = ticketInfo.Id });
        }
    }
}


