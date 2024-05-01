namespace ReSound.Server.DTO
{
    public class SequencerPatchDTO
    {
        public Guid IdSequencer { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool Private { get; set; }
    }
}
