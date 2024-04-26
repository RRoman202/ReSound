namespace ReSound.Server.Services.Files
{
    public interface IFilesService
    {
        Task<IEnumerable<string>> GetFileNames();
    }
}
