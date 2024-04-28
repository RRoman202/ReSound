using Microsoft.AspNetCore.Mvc;
using ReSound.Server.Data.Models;
using ReSound.Server.DTO;

namespace ReSound.Server.Services.Sequencers
{
    public interface ISequencersService
    {
        Task<IEnumerable<Sequencer>> GetSequencers(Guid iduser);
        Task<Sequencer> GetSequencer(Guid id, Guid iduser);
        Task PutSequencer(Guid id, Sequencer sequencer);
        Task<Sequencer> PostSequencer([FromBody] SequencerDTO sequencerDTO);
        Task DeleteSequencer(Guid id);
    }
}
