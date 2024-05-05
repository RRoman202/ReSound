using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReSound.Server.Data;

namespace ReSound.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FilesController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        private readonly ReSoundContext _context;

        public FilesController(IWebHostEnvironment env, ReSoundContext context)
        {
            _env = env;
            _context = context;
        }

        [HttpGet("/track/{idsequencer}")]
        public IActionResult GetAudioFile(Guid idsequencer)
        {
            string audioFolderPath = Path.Combine(_env.WebRootPath, "tracks");
            string audioFilePath = Path.Combine(audioFolderPath, idsequencer + ".mp3");

            if (!System.IO.File.Exists(audioFilePath))
            {
                return NotFound();
            }

            return PhysicalFile(audioFilePath, "audio/mpeg");
        }


        [HttpGet]
        public IActionResult GetFileNames()
        {
            var folderPath = Path.Combine(_env.WebRootPath, "sounds");

            var fileNames = Directory.GetFiles(folderPath)
                .Select(Path.GetFileName)
                .ToList();

            var fileNamesNoMp3 = new List<string>();

            foreach (var file in fileNames)
            {
                fileNamesNoMp3.Add(file.Replace(".mp3", ""));
            }

            return Ok(fileNamesNoMp3);
        }

        [HttpGet("Categories")]
        public IActionResult GetCategories()
        {
            var folderPath = Path.Combine(_env.WebRootPath, "sounds");
            var categories = Directory.GetDirectories(folderPath).Select(Path.GetFileName).ToList(); 
            return Ok(categories);
        }

        [HttpGet("{fileName}")]
        public IActionResult GetFileByName(string fileName)
        {
            var filePath = Path.Combine(_env.WebRootPath, "sounds", fileName);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);

            return File(fileBytes, "application/octet-stream", fileName);
        }

        [HttpGet("/audio/{fileName}")]
        public IActionResult GetAudioFile(string fileName)
        {
            string audioFolderPath = Path.Combine(_env.WebRootPath, "sounds");
            string audioFilePath = Path.Combine(audioFolderPath, fileName);

            if (!System.IO.File.Exists(audioFilePath))
            {
                return NotFound();
            }

            var bytes = System.IO.File.ReadAllBytes(audioFilePath);
            return File(bytes, "audio/mpeg");
        }
    }
}
