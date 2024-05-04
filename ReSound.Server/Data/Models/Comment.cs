using System.ComponentModel.DataAnnotations;

namespace ReSound.Server.Data.Models
{
    public class Comment
    {
        [Key]
        public Guid IdComment { get; set; }

        public Guid IdUser { get; set; }

        public Guid IdSequencer { get; set; }

        public DateTime Created {  get; set; }

        public string? Content { get; set; }

        public User? User { get; set; }

        public Sequencer? Sequencer { get; set; }
    }
}
