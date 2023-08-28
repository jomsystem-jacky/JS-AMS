using System.ComponentModel.DataAnnotations;
using System.Net.Mail;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Web;
//using JS.AMS.Data.Entity.Shared;

namespace JS.BPOSWeb.Utils
{
    public static class CommonHelper
    {
        public static string GetDisplayName(this Enum enumValue)
        {
            return enumValue.GetType().GetMember(enumValue.ToString())
                           .First()
                           ?.GetCustomAttribute<DisplayAttribute>()
                           ?.Name ?? enumValue.ToString();
        }
        public static async Task DownloadFile(string url, string pathToSave, string fileName)
        {
            var content = await GetUrlContent(url);
            if (content != null)
            {
                if (!Directory.Exists(pathToSave)) Directory.CreateDirectory(pathToSave);
                await File.WriteAllBytesAsync($"{pathToSave}/{fileName}", content);
            }
        }

        public static async Task<byte[]?> GetUrlContent(string url)
        {
            using (var client = new HttpClient())
            using (var result = await client.GetAsync(url))
                return result.IsSuccessStatusCode ? await result.Content.ReadAsByteArrayAsync() : null;
        }

        public static string StripHTML(string input)
        {
            return Regex.Replace(input, "<.*?>", string.Empty);
        }

        public static string RemoveQueryStringsFromUrl(this string url, string[] keys)
        {
            if (!url.Contains("?"))
                return url;

            string[] urlParts = url.ToLower().Split('?');
            try
            {
                var querystrings = HttpUtility.ParseQueryString(urlParts[1]);
                foreach (string key in keys)
                    querystrings.Remove(key.ToLower());

                if (querystrings.Count > 0)
                    return urlParts[0]
                      + "?"
                      + string.Join("&", querystrings.AllKeys.Select(c => c.ToString() + "=" + querystrings[c.ToString()]));
                else
                    return urlParts[0];
            }
            catch (NullReferenceException)
            {
                return urlParts[0];
            }
        }
        //public static string CombineLocationToFullAddress(Location location)
        //{
        //    string address = "";
        //    if (string.IsNullOrEmpty(location.Address))
        //    {
        //        address = location.AddressOne + " " + location.AddressTwo + " ";
        //    }
        //    else
        //    {
        //        address = location.Address + " ";
        //    }

        //    if (location.PostalCode.HasValue)
        //    {
        //        address += location.PostalCode.Value + " ";
        //    }

        //    if (location.City != null)
        //    {
        //        address += location.City.Name + " ";
        //    }

        //    if (location.City?.State != null)
        //    {
        //        address += location.City.State.Name;
        //    }

        //    return address;
        //}

        public static bool IsValidEmail(string emailaddress)
        {
            try
            {
                MailAddress m = new MailAddress(emailaddress);

                return true;
            }
            catch (FormatException ex)
            {
                return false;
            }
        }

    }
}
