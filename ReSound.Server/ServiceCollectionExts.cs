using ReSound.Server.Repositories.Sequencers;
using ReSound.Server.Services.Sequencers;

namespace ReSound.Server
{
    public static class ServiceCollectionExts
    {
        public static IServiceCollection AddServicesAndRepositories(this IServiceCollection services)
        {
            services.AddScoped<ISequencersRepository, SequencersRepository>();
            services.AddScoped<ISequencersService, SequencersService>();

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
