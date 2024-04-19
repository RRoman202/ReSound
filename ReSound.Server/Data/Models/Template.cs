using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReSound.Server.Data.Models
{
    public class Template
    {
        [Key]
        public Guid IdTemplate { get; set; }

        public int Volume { get; set; }

        [Column(TypeName = "jsonb")]
        public bool[][]? Notes { get; set; }

        public Guid IdSound { get; set; }

        public Sound? Sound { get; set; }
    }
}
