namespace ReSound.Server.Data.Models
{
    public class SequencerGenre
    {
        public Guid Id { get; set; }
        public Guid IdSequencer { get; set; }
        public Guid IdGenre { get; set; }

        public Sequencer? Sequencer { get; set; }
        public Genre? Genre { get; set; }
    }
}
