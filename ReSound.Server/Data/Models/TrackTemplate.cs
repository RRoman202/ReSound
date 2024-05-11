namespace ReSound.Server.Data.Models
{
    public class TrackTemplate
    {
        public Guid Id { get; set; }
        public Guid IdTrack {  get; set; }
        public Guid IdTemplate { get; set; }
        public long PositionTemplate { get; set; }

        public Track? Track { get; set; }
        public Template? Template { get; set; }
    }
}
