using ReSound.Server.Data.Models;

namespace ReSound.Server.DTO
{
    public class CopyTempalteDTO
    {
        public int Volume { get; set; }

        public string? Name { get; set; }

        public int BPM { get; set; }

        public string? Notes { get; set; }

        public Guid IdSound { get; set; }

        public Sound? Sound { get; set; }

        public Guid IdSequencer { get; set; }
    }
}
