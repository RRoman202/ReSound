using System.ComponentModel.DataAnnotations;

namespace ReSound.Server.Data.Models
{
    public class Genre
    {
        [Key]
        public Guid IdGenre { get; set; }

        public string? Name { get; set; }
    }
}
