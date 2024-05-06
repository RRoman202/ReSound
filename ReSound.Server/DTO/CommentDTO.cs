using ReSound.Server.Data.Models;

namespace ReSound.Server.DTO
{
    public class CommentDTO
    {
        public Guid IdUser { get; set; }

        public Guid IdSequencer { get; set; }

        public DateTime Created { get; set; }

        public string? Content { get; set; }

    }
}
