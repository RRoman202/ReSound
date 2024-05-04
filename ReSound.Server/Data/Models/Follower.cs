namespace ReSound.Server.Data.Models
{
    public class Follower
    {
        public Guid Id { get; set; }
        public Guid IdUser { get; set; }
        public Guid IdFollower { get; set; }

        public User? User { get; set; }
        public User? FollowerUser { get; set; }
    }
}
