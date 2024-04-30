using Microsoft.AspNetCore.Mvc;
using ReSound.Server.Data.Models;
using ReSound.Server.DTO;

namespace ReSound.Server.Services.Sequencers
{
    public interface ISequencersService
    {
        Task<IEnumerable<Sequencer>> GetSequencers(Guid iduser);
        Task<Sequencer> GetSequencer(Guid id, Guid iduser);
        Task<Template> GetTemplate(Guid id);
        Task PutSequencer(Guid id, Sequencer sequencer);
        Task PatchTemplate([FromBody] TemplatePatchDTO templatePatchDTO);
        Task<Sequencer> PostSequencer([FromBody] SequencerDTO sequencerDTO);
        Task DeleteSequencer(Guid id);
        Task<IEnumerable<Template>> GetTemplates(Guid idsequencer);
        Task<Template> PostTemplate([FromBody] TemplateDTO templateDTO);
        Task DeleteTemplate(Guid id);
    }
}
