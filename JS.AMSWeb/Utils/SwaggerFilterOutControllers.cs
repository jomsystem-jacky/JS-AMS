using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace JS.AMSWeb.Utils
{
    public class SwaggerFilterOutControllers : IDocumentFilter
    {
        public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
        {
            foreach (var item in swaggerDoc.Paths.ToList())
            {
                //if (item.Key.Contains("api/v1/user/PassbotExternalLogin"))
                //{
                //    continue;
                //}

                //if (item.Key.Contains("api/v1/parlo"))
                //{
                //    continue;
                //}

                if (item.Key.ToLower().Contains("/api"))
                {
                    swaggerDoc.Paths.Remove(item.Key);
                }
            }

        }
    }
}
