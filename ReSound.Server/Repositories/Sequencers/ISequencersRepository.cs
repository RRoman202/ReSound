using Microsoft.AspNetCore.Mvc;
using ReSound.Server.Data.Models;

namespace ReSound.Server.Repositories.Sequencers
{
    public interface ISequencersRepository
    {
        Task<IEnumerable<Sequencer>> GetSequencers();
    }
}
