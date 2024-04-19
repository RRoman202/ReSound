﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ReSound.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FilesController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public FilesController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpGet]
        public IActionResult GetFiles()
        {
            var folderPath = Path.Combine(_env.WebRootPath, "sounds");

            var files = System.IO.Directory.GetFiles(folderPath);

            return Ok(files);
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
