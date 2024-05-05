using System.ComponentModel.DataAnnotations;

namespace ReSound.Server.DTO
{
    public class UserFollowerDTO
    {
        public Guid IdUser { get; set; }

        public string? Login { get; set; }

        public string? Email { get; set; }

        public string? Photo { get; set; }

        public DateTime? DateCreated { get; set; }

        public DateTime? DateUpdated { get; set; }
    }
}
