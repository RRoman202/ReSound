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

        public async Task<Template> CopyTemplate([FromBody] CopyTempalteDTO template)
        {
            return await _sequencersRepository.CopyTemplate(template);
        }

        public async Task DeleteSequencer(Guid id)
        {
            await _sequencersRepository.DeleteSequencer(id);
        }

        public async Task DeleteTemplate(Guid id)
        {
            await _sequencersRepository.DeleteTemplate(id);
        }

        public async Task<Sequencer> GetSequencer(Guid id, Guid iduser)
        {
            return await _sequencersRepository.GetSequencer(id, iduser);
        }

        public async Task<IEnumerable<Sequencer>> GetSequencers(Guid iduser)
        {
            return await _sequencersRepository.GetSequencers(iduser);
        }

        public async Task<Template> GetTemplate(Guid id)
        {
            return await _sequencersRepository.GetTemplate(id);
        }

        public async Task<IEnumerable<Template>> GetTemplates(Guid idsequencer)
        {
            return await _sequencersRepository.GetTemplates(idsequencer);
        }

        public async Task PatchTemplate([FromBody] TemplatePatchDTO templatePatchDTO)
        {
            await _sequencersRepository.PatchTemplate(templatePatchDTO);
        }

        public async Task<Sequencer> PostSequencer([FromBody] SequencerDTO sequencerDTO)
        {
            return await _sequencersRepository.PostSequencer(sequencerDTO);
        }

        public async Task<Template> PostTemplate([FromBody] TemplateDTO templateDTO)
        {
            return await _sequencersRepository.PostTemplate(templateDTO);
        }

        public async Task PutSequencer([FromBody] SequencerPatchDTO sequencerPatchDTO)
        {
            await _sequencersRepository.PutSequencer(sequencerPatchDTO);
        }
    }
}
