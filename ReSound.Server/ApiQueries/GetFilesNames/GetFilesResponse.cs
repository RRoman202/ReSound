using System.Security.Claims;

namespace ReSound.Server.ApiQueries.GetFilesNames
{
    public class GetFilesResponse
    {
        public IEnumerable<string> Files { get; set; }
    }
}
