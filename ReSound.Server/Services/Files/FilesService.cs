
using ReSound.Server.Repositories.Files;

namespace ReSound.Server.Services.Files
{
    public class FilesService : IFilesService
    {
        private readonly IFilesRepository _filesRepository;

        public FilesService(IFilesRepository filesRepository)
        {
            _filesRepository = filesRepository;
        }

        public async Task<IEnumerable<string>> GetFileNames()
        {
            return await _filesRepository.GetFileNames();
        }
    }
}
