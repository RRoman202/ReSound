using System.ComponentModel.DataAnnotations;

namespace ReSound.Server.Data.Models
{
    public class Mark
    {
        [Key]
        public Guid IdMark { get; set; }

        public Guid IdUser { get; set; }

        public DateTime Created { get; set; }

        public int Value { get; set; }

        public User? User { get; set; }
    }
}
