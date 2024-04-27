using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReSound.Server.Data;
using ReSound.Server.Data.Models;

namespace ReSound.Server.Repositories.Sequencers
{
    public class SequencersRepository : ISequencersRepository
    {
        private readonly ReSoundContext _context;
        public SequencersRepository(ReSoundContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Sequencer>> GetSequencers()
        {
            return await _context.Sequencers
                .Include(s => s.SettingsSequencer) 
                .ToListAsync();
        }
    }
}
