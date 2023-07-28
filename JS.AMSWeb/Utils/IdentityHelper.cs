using System.Security.Claims;

namespace JS.AMSWeb.Utils
{
    public static class IdentityHelper
    {

        public const string BPOS_SUPER_ADMIN = "BPOS_SUPER_ADMIN";
        public const string ADMIN = "ADMIN";
        public const string BPOS_USER = "BPOS_USER";

        public static string GetSpecificClaim(this ClaimsIdentity claimsIdentity, string claimType)
        {
            var claim = claimsIdentity.Claims.FirstOrDefault(x => x.Type == claimType);

            return claim != null ? claim.Value : string.Empty;
        }

    }
}
