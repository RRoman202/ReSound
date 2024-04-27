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
        private readonly ReSoundContext _context;

        public SequencersController(ReSoundContext context, ISequencersService sequencersService)
        {
            _context = context;
            _sequencersService = sequencersService;
        }

        // GET: api/Sequencer
        [HttpGet]
        public async Task<IEnumerable<Sequencer>> GetSequencers()
        {
            return await _sequencersService.GetSequencers();
        }

        // GET: api/Sequencer/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sequencer>> GetSequencer(Guid id)
        {
            var sequencer = await _context.Sequencers.FindAsync(id);

            if (sequencer == null)
            {
                return NotFound();
            }

            return sequencer;
        }

        // PUT: api/Sequencer/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSequencer(Guid id, Sequencer sequencer)
        {
            if (id != sequencer.IdSequencer)
            {
                return BadRequest();
            }

            _context.Entry(sequencer).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Sequencer
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Sequencer>> PostSequencer([FromBody] SequencerDTO sequencerDTO)
        {
            var sequencer = new Sequencer
            {
                IdSequencer = Guid.NewGuid(),
                IdUser = sequencerDTO.IdUser,
                Name = sequencerDTO.Name,
                Description = sequencerDTO.Description,
                Private = sequencerDTO.Private,
                Created = DateTime.UtcNow,
                Updated = DateTime.UtcNow
            };

            var settingsSequencer = new SettingsSequencer
            {
                IdSettingsSequencer = Guid.NewGuid(),
                BPM = 120, // Default BPM
                Volume = 100 // Default Volume
            };

            
            sequencer.IdSettingsSequencer = settingsSequencer.IdSettingsSequencer;
            sequencer.SettingsSequencer = settingsSequencer;


            _context.Sequencers.Add(sequencer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSequencer", new { id = sequencer.IdSequencer }, sequencer);
        }

        // DELETE: api/Sequencer/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSequencer(Guid id)
        {
            var sequencer = await _context.Sequencers.FindAsync(id);
            if (sequencer == null)
            {
                return NotFound();
            }

            _context.Sequencers.Remove(sequencer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
