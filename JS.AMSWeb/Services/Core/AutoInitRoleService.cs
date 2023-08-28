using Microsoft.Extensions.DependencyInjection;

namespace JS.AMSWeb.Services.Core
{
    public class AutoInitRoleService : IHostedService
    {
        private readonly IRoleService _roleService;
        public AutoInitRoleService(IServiceProvider serviceProvider)
        {
            _roleService = serviceProvider.CreateScope().ServiceProvider.GetRequiredService<IRoleService>();
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            AutoInitRole();
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        private async void AutoInitRole()
        {
            await _roleService.InitRolesAvailable();
        }
    }
}
