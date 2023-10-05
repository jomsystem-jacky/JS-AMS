using System.Data;
using JS.AMSWeb.Areas.TicketModule.ViewModels.TicketInfo;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
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

namespace JS.AMSWeb.Areas.TicketModule
{
    [Area("TicketModule")]
    public class TicketInfoController : Controller
    {
        private readonly AMSDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IAzureBlobService _azureBlobService;

        public TicketInfoController(AMSDbContext db, IWebHostEnvironment webHostEnvironment, IAzureBlobService azureBlobService)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;
            _azureBlobService = azureBlobService;
        }

        public IActionResult Index(int? page, string searchName)
        {
            var pagination = new PaginationDTO();
            pagination.CurrentPage = page ?? 1;

            var sessionData = HttpContext.Session?.GetObjectFromJson<UserSessionDTO>("UserSession") ?? null;
            if (sessionData == null)
            {
                return Redirect("/");
            }

            var ticketInfo = _db.TicketInfos
                .Include(m => m.TicketRaisedByStaff)
                .Include(m => m.TicketCategory)
                .Where(x => x.Active);

            //if (!string.IsNullOrWhiteSpace(searchName))
            //{
                //assetInfo = assetInfo.Where(x => x.Name.ToLower().Replace(" ", "").Contains(searchName.ToLower().Replace(" ", "")));
            //}

            var listVm = new List<TicketInfoViewModel>();

            var ticketInfoList = ticketInfo.ToList();
            foreach (var a in ticketInfoList)
            {
                var vm = new TicketInfoViewModel();
                vm.Id = a.Id;
                vm.Remark = a.Remark;
                vm.TicketCategoryId = a.TicketCategoryId;
                vm.TicketCategoryName = a.TicketCategory.Name;
                vm.TicketRaisedByStaffId = a.TicketRaisedByStaffId;
                vm.TicketRaisedByStaffName = a.TicketRaisedByStaff.Name;

                //if (a.CoverPhotoId.HasValue)
                //{
                //    vm.CoverPhotoUrl = _azureBlobService.GetBlobUrl(a.CoverPhoto.Url, ImageContainer.PAYMENT_METHOD_IMAGE_CONTAINER);
                //}

                listVm.Add(vm);
            }

            int pageSize = 10;
            int pageNumber = page ?? 1;

            //ViewData["SearchName"] = searchName;

            var listing = listVm.ToPagedList(pageNumber, pageSize);

            var result = new TicketInfoPageViewModel();
            result.Listing = listing;
            result.AddTicketInfoDTO = new AddTicketInfoViewModel();

            ViewBag.TicketRaisedByStaff = new SelectList(_db.Staff.Where(x => x.Active), "Id", "Name");
            ViewBag.TicketCategories = new SelectList(_db.TicketCategories.Where(x => x.Active), "Id", "Name");
            return View(result);
        }

        //[HttpPost]
        //public IActionResult Search(string? searchName, int? page)
        //{
            //if (page == 0 || page == null)
            //{
                //page = 1;
            //}

            //return RedirectToAction("Index", new { page = page, searchName = searchName });
        //}

    [HttpPost]
    public async Task<IActionResult> Create(AddTicketInfoViewModel dto)
    {
        var sessionData = HttpContext.Session?.GetObjectFromJson<UserSessionDTO>("UserSession") ?? null;
        if (sessionData == null)
        {
            return Redirect("/");
        }

        try
        {
            var staff = _db.Staff
                .FirstOrDefault(x => x.Id == dto.TicketRaisedByStaffId);
            if (staff == null)
            {
                return BadRequest("Staff not found");
            }

            var ticketCategory = _db.TicketCategories
                .FirstOrDefault(x => x.Id == dto.TicketCategoryId);
            if (ticketCategory == null)
            {
                return BadRequest("Ticket Category not found");
            }

            var companyProfile = _db.CompanyProfiles
                .FirstOrDefault(x => x.Id == dto.CompanyProfileId);
            if (ticketCategory == null)
            {
                return BadRequest("company Category not found");
            }

            var ticketInfo = new TicketInfo();
            ticketInfo.Active = true;
            ticketInfo.Remark = dto.Remark;
            ticketInfo.TicketCategory = ticketCategory;
            ticketInfo.TicketRaisedByStaff = staff;

            _db.TicketInfos.Add(ticketInfo);
            _db.SaveChanges(sessionData.Username);

            var ticketHistory = new TicketHistory();
            ticketHistory.Active = true;
            ticketHistory.Remark = dto.Remark;
            ticketHistory.OtherDescription = dto.OtherDescription;
            ticketHistory.TicketInfo = ticketInfo;

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

                var uploadedImage = _azureBlobService.AddImage(media.Url, filePath, ImageContainer.PAYMENT_METHOD_IMAGE_CONTAINER);
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
            return RedirectToAction("Index");
        }
            catch (Exception ex)
        {
            return Ok(ex);
        }
    }

    }
}


