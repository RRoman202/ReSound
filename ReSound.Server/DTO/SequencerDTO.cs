namespace ReSound.Server.DTO
{
    public class SequencerDTO
    {
        public Guid IdUser { get; set; }
        public string? Name { get; set; }

        public string? Description { get; set; }
        public bool Private { get; set; }
    }
}
