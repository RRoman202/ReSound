using System.ComponentModel.DataAnnotations;

namespace ReSound.Server.Data.Models
{
    public class SettingsSequencer
    {
        [Key]
        public Guid IdSettingsSequencer { get; set; }

        public int BPM { get; set; }

        public int Volume { get; set; }


    }
}
