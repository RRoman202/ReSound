using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReSound.Server.Data.Models;
using ReSound.Server.Data;
using ReSound.Server.DTO;
using ReSound.Server.Services.Sequencers;

namespace ReSound.Server.Controllers
{
    [Route("api/[controller]")]
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

        [HttpGet("{id}")]
        public async Task<ActionResult<Sequencer>> GetSequencer(Guid id, Guid iduser)
        {
            return await _sequencersService.GetSequencer(id, iduser);
        }


        [HttpPut("{id}")]
        public async Task PutSequencer(Guid id, Sequencer sequencer)
        {
            await _sequencersService.PutSequencer(id, sequencer);
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
    }
}
