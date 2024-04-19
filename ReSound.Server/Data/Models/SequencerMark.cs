namespace ReSound.Server.Data.Models
{
    public class SequencerMark
    {
        public Guid Id { get; set; }
        public Guid IdSequencer { get; set; }
        public Guid IdMark { get; set; }

        public Sequencer? Sequencer { get; set; }
        public Mark? Mark { get; set; }
    }
}
