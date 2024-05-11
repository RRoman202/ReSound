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

            Response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate");
            Response.Headers.Add("Pragma", "no-cache");
            Response.Headers.Add("Expires", "0");

            return PhysicalFile(audioFilePath, "audio/mpeg");
        }

        [HttpGet("avatar")]
        public IActionResult GetAvatarFile(Guid iduser)
        {
            string avatarFolderPath = Path.Combine(_env.WebRootPath, "avatars");
            string avatarFileName = iduser + ".png";
            string avatarFilePath = Path.Combine(avatarFolderPath, avatarFileName);

            if (!System.IO.File.Exists(avatarFilePath))
            {
                return NotFound();
            }

            string fileExtension = Path.GetExtension(avatarFileName);

            string mimeType = MimeTypes.GetMimeType(fileExtension);

            if (mimeType == null)
            {
                return BadRequest("Unsupported file type");
            }

            Response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate");
            Response.Headers.Add("Pragma", "no-cache");
            Response.Headers.Add("Expires", "0");

            return PhysicalFile(avatarFilePath, mimeType);
        }

        [HttpGet("cover")]
        public IActionResult GetCoverFile(Guid idsequencer)
        {
            string avatarFolderPath = Path.Combine(_env.WebRootPath, "covers");
            string avatarFileName = idsequencer + ".png";
            string avatarFilePath = Path.Combine(avatarFolderPath, avatarFileName);

            if (!System.IO.File.Exists(avatarFilePath))
            {
                return NotFound();
            }

            string fileExtension = Path.GetExtension(avatarFileName);

            string mimeType = MimeTypes.GetMimeType(fileExtension);

            if (mimeType == null)
            {
                return BadRequest("Unsupported file type");
            }

            Response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate");
            Response.Headers.Add("Pragma", "no-cache");
            Response.Headers.Add("Expires", "0");

            return PhysicalFile(avatarFilePath, mimeType);
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

        [HttpGet("categories-files")]
        public IActionResult GetCategoriesFileNames(string category)
        {
            var folderPath = Path.Combine(_env.WebRootPath, "sounds/" + category);

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
