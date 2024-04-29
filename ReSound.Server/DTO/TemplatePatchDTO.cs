namespace ReSound.Server.DTO
{
    public class TemplatePatchDTO
    {
        public Guid IdTemplate { get; set; }
        public string? Name { get; set; }
        public int Volume { get; set; }
        public string? Notes { get; set; }
        public Guid IdSound { get; set; }
    }
}
