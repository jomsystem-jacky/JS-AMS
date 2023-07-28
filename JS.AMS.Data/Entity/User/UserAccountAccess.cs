using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.User
{
    public class UserAccountAccess : Auditable
    {
        public string UserAccountId { get; set; }
        public UserAccount UserAccount { get; set; }

        public Guid AccessInfoId { get; set; }
        public AccessInfo AccessInfo { get; set; }
    }
}