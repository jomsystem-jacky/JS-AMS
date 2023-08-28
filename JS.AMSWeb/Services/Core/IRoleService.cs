namespace JS.AMSWeb.Services.Core
{
    public interface IRoleService
    {
        Task<List<string>> InitRolesAvailable();
    }
}
