using System.ComponentModel.DataAnnotations;

namespace ReSound.Server.Data.Models
{
    public class Sound
    {
        [Key]
        public Guid IdSound { get; set; }


        public string? Name { get; set; }
        public string? Path { get; set; }
        public string? FileName { get; set; }
    }
}
