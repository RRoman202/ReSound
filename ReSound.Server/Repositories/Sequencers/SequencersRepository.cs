using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using ReSound.Server.Data;
using ReSound.Server.Data.Models;
using ReSound.Server.DTO;

namespace ReSound.Server.Repositories.Sequencers
{
    public class SequencersRepository : ISequencersRepository
    {
        private readonly ReSoundContext _context;
        public SequencersRepository(ReSoundContext context)
        {
            _context = context;
        }

        public async Task DeleteSequencer(Guid id)
        {
            var sequencer = await _context.Sequencers.FindAsync(id);
            if (sequencer != null)
            {
                _context.Sequencers.Remove(sequencer);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteTemplate(Guid id)
        {
            var sequencertemplate = _context.SequencersTemplates.Where(x => x.IdTemplate == id).FirstOrDefault();
            if(sequencertemplate != null)
            {
                _context.SequencersTemplates.Remove(sequencertemplate);
                await _context.SaveChangesAsync();
            }
            var template = await _context.Templates.FindAsync(id);
            if (template != null)
            {
                _context.Templates.Remove(template);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Sequencer> GetSequencer(Guid id, Guid iduser)
        {
            var sequencer = await _context.Sequencers.Where(s => s.IdUser == iduser && s.IdSequencer == id).FirstOrDefaultAsync();

            if (sequencer == null)
            {
                return null;
            }

            return sequencer;
        }

        public async Task<Template> GetTemplate(Guid id)
        {
            var template = await _context.Templates.Where(s => s.IdTemplate == id).FirstOrDefaultAsync();

            if (template == null)
            {
                return null;
            }

            return template;
        }

        public async Task<IEnumerable<Sequencer>> GetSequencers(Guid iduser)
        {
            return await _context.Sequencers.Where(s => s.IdUser == iduser)
                .Include(s => s.SettingsSequencer) 
                .ToListAsync();
        }

        public async Task<IEnumerable<Template>> GetTemplates(Guid idsequencer)
        {
            var templates = await _context.SequencersTemplates
                .Include(st => st.Template)
                .Where(st => st.IdSequencer == idsequencer)
                .Select(st => st.Template)
                .ToListAsync();


            return templates;
        }

        public async Task<Sequencer> PostSequencer([FromBody] SequencerDTO sequencerDTO)
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

            var template = new Template
            {
                IdSound = Guid.NewGuid(),
                IdTemplate = Guid.NewGuid(),
                Volume = 100,
                Notes = "null",
                Name = "Новый шаблон"
            };
            _context.Templates.Add(template);
            _context.Sequencers.Add(sequencer);
            _context.SequencersTemplates.Add(new SequencerTemplate
            {
                Id = Guid.NewGuid(),
                IdTemplate = template.IdTemplate,
                IdSequencer = sequencer.IdSequencer,
            
                Template = template,
                
            });
            await _context.SaveChangesAsync();

            return sequencer;
        }

        public async Task<Template> PostTemplate([FromBody] TemplateDTO templateDTO)
        {
            var template = new Template
            {
                IdTemplate = Guid.NewGuid(),
                IdSound = Guid.NewGuid(),
                Name = templateDTO.Name,
                Notes = "null",
                Volume = 100,
            };
            _context.Templates.Add(template);
            _context.SequencersTemplates.Add(new SequencerTemplate
            {
                Id = Guid.NewGuid(),
                IdTemplate = template.IdTemplate,
                IdSequencer = templateDTO.IdSequencer,
                Template = template
            });
            await _context.SaveChangesAsync();

            return template;
        }

        public async Task PutSequencer(Guid id, Sequencer sequencer)
        {
            if (id != sequencer.IdSequencer)
            {
                return;
            }

            _context.Entry(sequencer).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return;
        }

        public async Task PatchTemplate([FromBody] TemplatePatchDTO templatePatchDTO)
        {
            var template = await _context.Templates.SingleAsync(x => x.IdTemplate == templatePatchDTO.IdTemplate);

            template.Notes = templatePatchDTO.Notes;

            await _context.SaveChangesAsync();

            return;
        }
    }
}
