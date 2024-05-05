using Microsoft.AspNetCore.Identity;

namespace ReSound.Server.DTO
{
    public class FollowerDTO
    {
        public Guid IdUser { get; set; }
        public Guid IdFollower { get; set; }
    }
}
