namespace ReSound.Server.Data.Models
{
    public class SequencerTrack
    {
        public Guid Id { get; set; }
        public Guid IdSequencer { get; set; }
        public Guid IdTrack { get; set; }
        

        public Sequencer? Sequencer { get; set; }
        public Track? Track { get; set; }
    }
}
