using System;
using JS.AMS.Data.Entity.User.Enum;

namespace JS.AMSWeb.DTO.Identity
{
    public class UserSessionDTO
    {
        public string Username { get; set; }
        public string FullName { get; set; }

        public string Role { get; set; }
        public UserRole UserRole { get; set; }
        public string ProfilePictureUrl { get; set; }
        public string Designation { get; set; }
        public string? DesignationList { get; set; }
        public string? CompanyProfileId { get; set; }
        public string? CompanyBranchList { get; set; }
        public string CompanyBranchName { get; set; }
        public string CompanyName { get; set; }
    }
}
