using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ReSound.Server.Data;
using ReSound.Server.Data.Models;
using ReSound.Server.DTO;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ReSound.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ReSoundContext _context;

        private readonly IConfiguration _configuration;

        private readonly string _audioFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "tracks");
        private readonly string _avatarFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "avatars");

        public UsersController(ReSoundContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("upload-avatar")]
        public async Task<IActionResult> UploadAvatar(AvatarDTO avatarDTO)
        {
            if (avatarDTO.avatarFile == null || avatarDTO.avatarFile.Length == 0)
            {
                return BadRequest("error");
            }

            Directory.CreateDirectory(_avatarFolder);

            string fileExtension = Path.GetExtension(avatarDTO.avatarFile.FileName);

            string filePath = Path.Combine(_avatarFolder, avatarDTO.IdUser + fileExtension);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await avatarDTO.avatarFile.CopyToAsync(stream);
            }
            return Ok(new { avatarDTO.IdUser });
        }

        [HttpPatch("update")]
        public async Task PatchUser([FromBody] UserUpdateDTO userUpdateDTO)
        {
            var user = await _context.Users.SingleAsync(x => x.IdUser == userUpdateDTO.IdUser);

            user.Login = userUpdateDTO.Login;
            user.DateUpdated = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return;
        }

        [HttpPost("upload-audio")]
        public async Task<IActionResult> UploadAudio(AudioDTO audioDTO)
        {
            if (audioDTO.audioFile == null || audioDTO.audioFile.Length == 0)
            {
                return BadRequest("No audio file provided.");
            }

            Directory.CreateDirectory(_audioFolder);

            string filePath = Path.Combine(_audioFolder, audioDTO.IdSequencer + ".mp3");

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await audioDTO.audioFile.CopyToAsync(stream);
            }
            return Ok(new { audioDTO.IdSequencer });
        }
        

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<User>> Registration(User userModel)
        {
            var username = await (from u in _context.Users where u.Login == userModel.Login select u).FirstOrDefaultAsync();
            if (username != null)
            {
                return BadRequest("Пользователь с таким логином уже существует!");
            }
            else
            {
                userModel.Password = BCrypt.Net.BCrypt.HashPassword(userModel.Password);
                userModel.DateCreated = DateTime.UtcNow;
                userModel.DateUpdated = DateTime.UtcNow;
                _context.Users.Add(userModel);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetUserModel", new { id = userModel.IdUser }, userModel);
            }

        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(UserDTO request)
        {
            var user = await (from u in _context.Users where u.Login == request.Login select u).FirstOrDefaultAsync();
            if (user != null)
            {
                if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                {
                    return BadRequest("Неправильный пароль");
                }
            }
            else
            {
                return BadRequest("Неправильный логин");
            }

            string token = CreateToken(user);

            return Ok(token);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var userModel = await _context.Users.FindAsync(id);

            if (userModel == null)
            {
                return NotFound();
            }

            return userModel;
        }

        [Authorize]
        [HttpGet]
        public async Task<IEnumerable<User>> GetSequencers()
        {
            return await _context.Users
                .ToListAsync();
        }

        [HttpPost("Follower")]
        public async Task<Follower> PostFollower(FollowerDTO follower)
        {
            var newfollower = new Follower
            {
                Id = Guid.NewGuid(),
                IdUser = follower.IdUser,
                IdFollower = follower.IdFollower,
            };
            

            _context.Followers.Add(newfollower);
            await _context.SaveChangesAsync();

            return newfollower;
        }

        [HttpDelete("Follower")]
        public async Task DeleteFollower(FollowerDTO follower)
        {
            var followerdelete = _context.Followers.Where(x => x.IdFollower == follower.IdFollower && x.IdUser == follower.IdUser).FirstOrDefault();

            _context.Followers.Remove(followerdelete);
            await _context.SaveChangesAsync();

            return;
        }

        [HttpGet("Follower")]
        public async Task<IEnumerable<User>> GetTemplates(Guid iduser)
        {
            var usersid = await _context.Followers
                .Where(st => st.IdFollower == iduser)
                
                .ToListAsync();

            var users = new List<User>();

            foreach (var userId in usersid)
            {
                var user = await _context.Users.FindAsync(userId.IdUser);
                if (user != null)
                {
                    users.Add(user);
                }
            }


            return users;
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim("ID", user.IdUser.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JwtSettings:Key").Value!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                    issuer: _configuration.GetSection("JwtSettings:Issuer").Value,
                    audience: _configuration.GetSection("JwtSettings:Audience").Value,
                    claims: claims,
                    expires: DateTime.Now.AddHours(24),
                    signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;

        }
    }
}
