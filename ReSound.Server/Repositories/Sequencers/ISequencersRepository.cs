using Microsoft.AspNetCore.Mvc;
using ReSound.Server.Data.Models;
using ReSound.Server.DTO;

namespace ReSound.Server.Repositories.Sequencers
{
    public interface ISequencersRepository
    {
        Task<IEnumerable<Sequencer>> GetSequencers(Guid iduser);
        Task<Sequencer> GetSequencer(Guid id, Guid iduser);
        Task<Template> GetTemplate(Guid id);
        Task PutSequencer([FromBody] SequencerPatchDTO sequencerPatchDTO);
        Task PatchTemplate([FromBody] TemplatePatchDTO templatePatchDTO);
        Task<Sequencer> PostSequencer([FromBody] SequencerDTO sequencerDTO);
        Task DeleteSequencer(Guid id);
        Task DeleteTemplate(Guid id);
        Task<IEnumerable<Template>> GetTemplates(Guid idsequencer);
        Task<Template> PostTemplate([FromBody] TemplateDTO templateDTO);
    }
}
