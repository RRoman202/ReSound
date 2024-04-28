using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReSound.Server.Data.Models
{
    public class Template
    {
        [Key]
        public Guid IdTemplate { get; set; }

        public int Volume { get; set; }

        public string? Name { get; set; }

        
        public string? Notes { get; set; }

        public Guid IdSound { get; set; }

        public Sound? Sound { get; set; }
    }
}
