using Microsoft.AspNetCore.Mvc;

namespace ReSound.Server.Repositories.Files
{
    public class FilesRepository : IFilesRepository
    {
        private readonly IWebHostEnvironment _env;

        public FilesRepository(IWebHostEnvironment env)
        {
            _env = env;
        }
        public async Task<IEnumerable<string>> GetFileNames()
        {
            var folderPath = Path.Combine(_env.WebRootPath, "sounds");

            try
            {
                return await Task.Run(() => Directory.GetFiles(folderPath).Select(Path.GetFileName));
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<string>();
            }
        }

        
    }
}
