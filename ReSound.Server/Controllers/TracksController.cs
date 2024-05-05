using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReSound.Server.Data;
using ReSound.Server.Data.Models;

namespace ReSound.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TracksController : ControllerBase
    {
        private readonly ReSoundContext _context;

        private readonly IWebHostEnvironment _env;

        public TracksController(ReSoundContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpGet]
        public async Task<IEnumerable<Sequencer>> GetTracks()
        {
            var folderPath = Path.Combine(_env.WebRootPath, "tracks");

            var fileNames = Directory.GetFiles(folderPath)
                .Select(Path.GetFileName)
                .ToList();

            var fileNamesNoMp3 = new List<string>();

            foreach (var file in fileNames)
            {
                fileNamesNoMp3.Add(file.Replace(".mp3", ""));
            }
            return await _context.Sequencers
                .Where(s => s.Private == false && fileNamesNoMp3.Contains(s.IdSequencer.ToString())).Include(s => s.User)
                .ToListAsync();
        }

        [HttpGet("user")]
        public async Task<IEnumerable<Sequencer>> GetUserTracks(Guid iduser)
        {
            var folderPath = Path.Combine(_env.WebRootPath, "tracks");

            var fileNames = Directory.GetFiles(folderPath)
                .Select(Path.GetFileName)
                .ToList();

            var fileNamesNoMp3 = new List<string>();

            foreach (var file in fileNames)
            {
                fileNamesNoMp3.Add(file.Replace(".mp3", ""));
            }
            return await _context.Sequencers
                .Where(s => s.Private == false && s.IdUser == iduser && fileNamesNoMp3.Contains(s.IdSequencer.ToString())).Include(s => s.User)
                .ToListAsync();
        }


    }
}
