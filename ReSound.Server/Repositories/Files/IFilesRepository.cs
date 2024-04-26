namespace ReSound.Server.Repositories.Files
{
    public interface IFilesRepository
    {
        Task<IEnumerable<string>> GetFileNames();
    }
}
