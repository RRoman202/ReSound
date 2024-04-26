using ReSound.Server.Repositories.Files;
using ReSound.Server.Services.Files;

namespace ReSound.Server
{
    public static class ServiceCollectionExts
    {
        public static IServiceCollection AddServicesAndRepositories(this IServiceCollection services)
        {
            services.AddScoped<IFilesRepository, FilesRepository>();
            services.AddScoped<IFilesService, FilesService>();

            return services;
        }

        public static IServiceCollection AddBusinessLogic(this IServiceCollection services)
        {
            services.AddMediator(
                options =>
                {
                    options.ServiceLifetime = ServiceLifetime.Scoped;
                }
            );
            return services;
        }
    }
}
