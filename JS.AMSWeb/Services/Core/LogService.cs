using JS.AMS.Data;

namespace JS.AMSWeb.Services.Core
{
    public class LogService : ILogService
    {
        private readonly AMSDbContext _context;
        public LogService(AMSDbContext context)
        {
            _context = context;
        }

        public async Task LogError(string origin, string message)
        {
            //var log = new AuditLog();
            //log.LogCategory = LogCategoryEnum.Error;
            //log.Message = message;
            //log.Username = origin;

            //_context.AuditLogs.Add(log);
            //await _context.SaveChangesAsync("LogService.LogError");
        }
    }
}
