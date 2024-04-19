using System.ComponentModel.DataAnnotations;

namespace ReSound.Server.Data.Models
{
    public class Track
    {
        [Key]
        public Guid IdTrack { get; set; } 

        public int Volume { get; set; }
    }
}
