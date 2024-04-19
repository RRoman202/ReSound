using System.ComponentModel.DataAnnotations;

namespace ReSound.Server.Data.Models
{
    public class Sequencer
    {
        [Key]
        public Guid IdSequencer { get; set; }

        public Guid IdUser { get; set; }

        public Guid IdSettingsSequencer { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public DateTime? Created { get; set; }

        public DateTime? Updated { get; set; }
        
        public bool Private { get; set; }

        public string? Photo {  get; set; }

        public User? User { get; set; }

        public SettingsSequencer? SettingsSequencer { get; set; }



    }
}
