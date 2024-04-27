using Microsoft.AspNetCore.Mvc;
using ReSound.Server.Data.Models;

namespace ReSound.Server.Services.Sequencers
{
    public interface ISequencersService
    {
        Task<IEnumerable<Sequencer>> GetSequencers();
    }
}
