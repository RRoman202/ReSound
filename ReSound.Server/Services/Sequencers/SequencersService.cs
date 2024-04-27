using Microsoft.AspNetCore.Mvc;
using ReSound.Server.Data.Models;
using ReSound.Server.Repositories.Sequencers;

namespace ReSound.Server.Services.Sequencers
{
    public class SequencersService : ISequencersService
    {
        private readonly ISequencersRepository _sequencersRepository;

        public SequencersService(ISequencersRepository sequencersRepository)
        {
            _sequencersRepository = sequencersRepository;
        }

        public async Task<IEnumerable<Sequencer>> GetSequencers()
        {
            return await _sequencersRepository.GetSequencers();
        }
    }
}
