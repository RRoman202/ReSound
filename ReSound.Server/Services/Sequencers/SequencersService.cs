using Microsoft.AspNetCore.Mvc;
using ReSound.Server.Data.Models;
using ReSound.Server.DTO;
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

        public async Task DeleteSequencer(Guid id)
        {
            await _sequencersRepository.DeleteSequencer(id);
        }

        public async Task<Sequencer> GetSequencer(Guid id, Guid iduser)
        {
            return await _sequencersRepository.GetSequencer(id, iduser);
        }

        public async Task<IEnumerable<Sequencer>> GetSequencers(Guid iduser)
        {
            return await _sequencersRepository.GetSequencers(iduser);
        }

        public async Task<Sequencer> PostSequencer([FromBody] SequencerDTO sequencerDTO)
        {
            return await _sequencersRepository.PostSequencer(sequencerDTO);
        }

        public async Task PutSequencer(Guid id, Sequencer sequencer)
        {
            await _sequencersRepository.PutSequencer(id, sequencer);
        }
    }
}
