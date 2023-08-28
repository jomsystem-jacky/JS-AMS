namespace JS.AMSWeb.Services.Core
{
    public interface ILogService
    {
        Task LogError(string origin, string message);
    }
}
