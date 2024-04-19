namespace ReSound.Server.Data.Models
{
    public class SequencerComment
    {
        public Guid Id { get; set; }
        public Guid IdSequencer { get; set; }
        public Guid IdComment { get; set; }

        public Sequencer? Sequencer { get; set; }
        public Comment? Comment { get; set; }
    }
}
