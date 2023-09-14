using System;
using JS.AMS.Data.Entity.User.Enum;
using JS.AMS.Data.Entity.User.Enum;

namespace JS.AMSWeb.DTO.Identity
{
    public class UserSessionDTO
    {
        public string Username { get; set; }
        public UserRole UserRole { get; set; }
    }
}
