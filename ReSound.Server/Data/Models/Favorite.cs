namespace ReSound.Server.Data.Models
{
    public class Favorite
    {
        public Guid Id { get; set; }
        public Guid IdUser { get; set; }
        public Guid IdSequencer { get; set; }

        public User? User { get; set; }
        public Sequencer? Sequencer { get; set; }
    }
}
