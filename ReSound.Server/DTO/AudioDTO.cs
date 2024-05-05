namespace ReSound.Server.DTO
{
    public class AudioDTO
    {
        public IFormFile? audioFile {  get; set; }
        public Guid IdSequencer { get; set; }
    }
}
