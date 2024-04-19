namespace ReSound.Server.Data.Models
{
    public class SequencerTemplate
    {
        public Guid Id { get; set; }
        public Guid IdSequencer { get; set; }
        public Guid IdTemplate { get; set; }

        public Sequencer? Sequencer { get; set; }
        public Template? Template { get; set; }
    }
}
