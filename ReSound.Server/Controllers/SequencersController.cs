using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReSound.Server.Data.Models;
using ReSound.Server.Data;
using ReSound.Server.DTO;
using ReSound.Server.Services.Sequencers;
using Microsoft.AspNetCore.Authorization;

namespace ReSound.Server.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class SequencersController : ControllerBase
    {
        private readonly ISequencersService _sequencersService;

        public SequencersController(ISequencersService sequencersService)
        {
            _sequencersService = sequencersService;
        }

        
        [HttpGet]
        public async Task<IEnumerable<Sequencer>> GetSequencers(Guid iduser)
        {
            return await _sequencersService.GetSequencers(iduser);
        }

        [HttpGet("template")]
        public async Task<Template> GetTemplate(Guid id)
        {
            return await _sequencersService.GetTemplate(id);
        }

        [HttpGet("templates")]
        public async Task<IEnumerable<Template>> GetTemplates(Guid idsequencer)
        {
            return await _sequencersService.GetTemplates(idsequencer);
        }

        [HttpPost("templates")]
        public async Task<ActionResult<Template>> PostTemplate([FromBody] TemplateDTO templateDTO)
        {
            return await _sequencersService.PostTemplate(templateDTO);
        }
        [HttpPost("copy-templates")]
        public async Task<ActionResult<Template>> CopyTemplate([FromBody] CopyTempalteDTO templateDTO)
        {
            return await _sequencersService.CopyTemplate(templateDTO);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Sequencer>> GetSequencer(Guid id, Guid iduser)
        {
            return await _sequencersService.GetSequencer(id, iduser);
        }


        [HttpPatch]
        public async Task PutSequencer(SequencerPatchDTO sequencerPatchDTO)
        {
            await _sequencersService.PutSequencer(sequencerPatchDTO);
        }

        [HttpPatch("template")]
        public async Task PatchTemplate([FromBody] TemplatePatchDTO templatePatchDTO)
        {
            await _sequencersService.PatchTemplate(templatePatchDTO);
        }


        [HttpPost]
        public async Task<ActionResult<Sequencer>> PostSequencer([FromBody] SequencerDTO sequencerDTO)
        {
            return await _sequencersService.PostSequencer(sequencerDTO);
        }

        [HttpDelete("{id}")]
        public async Task DeleteSequencer(Guid id)
        {
            await _sequencersService.DeleteSequencer(id);
        }

        [HttpDelete("template/{id}")]
        public async Task DeleteTemplate(Guid id)
        {
            await _sequencersService.DeleteTemplate(id);
        }
    }
}
