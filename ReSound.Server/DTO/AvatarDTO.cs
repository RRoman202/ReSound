namespace ReSound.Server.DTO
{
    public class AvatarDTO
    {
        public IFormFile? avatarFile { get; set; }
        public Guid IdUser { get; set; }
    }
}
