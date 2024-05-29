using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using NuGet.Versioning;
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

        private readonly IWebHostEnvironment _env;

        private readonly string _audioFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "tracks");
        private readonly string _avatarFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "avatars");
        private readonly string _coverFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "covers");

        public UsersController(ReSoundContext context, IConfiguration configuration, IWebHostEnvironment env)
        {
            _context = context;
            _configuration = configuration;
            _env = env;
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

            
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await avatarDTO.avatarFile.CopyToAsync(stream);
            }

            return Ok(new { avatarDTO.IdUser });
        }

        [HttpPost("upload-cover")]
        public async Task<IActionResult> UploadCover(CoverDTO coverDTO)
        {
            if (coverDTO.coverFile == null || coverDTO.coverFile.Length == 0)
            {
                return BadRequest("error");
            }

            Directory.CreateDirectory(_coverFolder);

            string fileExtension = Path.GetExtension(coverDTO.coverFile.FileName);
            string filePath = Path.Combine(_coverFolder, coverDTO.IdSequencer + fileExtension);


            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await coverDTO.coverFile.CopyToAsync(stream);
            }

            return Ok(new { coverDTO.IdSequencer });
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

        [HttpGet("users-count")]
        public async Task<long> GetCountUser()
        {
            var users = await _context.Users.ToListAsync();
            return users.Count;
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

            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await audioDTO.audioFile.CopyToAsync(stream);
            }

            var seq = await _context.Sequencers.FindAsync(audioDTO.IdSequencer);
            seq.PublicDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();

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

        [HttpGet("popularite")]
        public async Task<IEnumerable<User>> GetPopulariteUsers()
        {
            var users = await _context.Users.ToListAsync();
            

            var populariteList = new List<PopulariteUserDTO>();

            foreach (var user in users)
            {
                var followers = await _context.Followers.Where(x => x.IdUser == user.IdUser).ToListAsync();
                var followers_count = followers.Count();
                populariteList.Add(new PopulariteUserDTO
                {
                    IdUser = user.IdUser,
                    Followers = followers_count
                });
            }

            var sortedUsers = populariteList
                .OrderByDescending(item => item.Followers)
                .Select(item => users.First(s => s.IdUser == item.IdUser))
                .ToList();

            return sortedUsers;


        }

        [HttpGet("popularite-month")]
        public async Task<IEnumerable<User>> GetPopulariteMonthUsers()
        {
            var users = await _context.Users.ToListAsync();


            var populariteList = new List<PopulariteUserDTO>();

            foreach (var user in users)
            {
                var followers = await _context.Followers.Where(x => x.IdUser == user.IdUser).ToListAsync();
                var followers_count = followers.Count();
                populariteList.Add(new PopulariteUserDTO
                {
                    IdUser = user.IdUser,
                    Followers = followers_count
                });
            }

            var sortedUsers = populariteList
                .OrderByDescending(item => item.Followers)
                .Select(item => users.First(s => s.IdUser == item.IdUser))
                .ToList();

            return sortedUsers.Take(3);


        }

        [HttpGet("popularite-track")]
        public async Task<IEnumerable<Sequencer>> GetPopulariteUsersTrack()
        {

            var folderPath = Path.Combine(_env.WebRootPath, "tracks");

            var fileNames = Directory.GetFiles(folderPath)
                .Select(Path.GetFileName)
                .ToList();

            var fileNamesNoMp3 = new List<string>();

            foreach (var file in fileNames)
            {
                fileNamesNoMp3.Add(file.Replace(".mp3", ""));
            }

            var users = await _context.Users.ToListAsync();

            var populariteList = new List<PopulariteUserDTO>();

            foreach (var user in users)
            {
                var followers = await _context.Followers.Where(x => x.IdUser == user.IdUser).ToListAsync();
                var followers_count = followers.Count();
                populariteList.Add(new PopulariteUserDTO
                {
                    IdUser = user.IdUser,
                    Followers = followers_count
                });
            }

            var sortedUsers = populariteList
                .OrderByDescending(item => item.Followers)
                .Select(item => users.First(s => s.IdUser == item.IdUser))
                .ToList();

            var lasts = new List<Sequencer>();

            foreach(var user in sortedUsers.Take(3))
            {
                var sequencers = await _context.Sequencers.Where(x => x.IdUser == user.IdUser && x.Private == false && fileNamesNoMp3.Contains(x.IdSequencer.ToString())).ToListAsync();
                var orderedSequencers = sequencers.OrderByDescending(x => x.Created);
                var latestSequencer = orderedSequencers.FirstOrDefault();
                if(latestSequencer != null)
                {
                    lasts.Add(latestSequencer);
                }
                
            }

            return lasts;


        }

        [HttpGet("follower-count")]
        public long GetUserFollower(Guid iduser)
        {
            var followers = _context.Followers.Where(x => x.IdUser ==  iduser).ToList();
            return followers.Count();
        }

        [HttpGet("user-track")]
        public async Task<IEnumerable<Sequencer>> GetUserTrack(Guid iduser)
        {
            var folderPath = Path.Combine(_env.WebRootPath, "tracks");

            var fileNames = Directory.GetFiles(folderPath)
                .Select(Path.GetFileName)
                .ToList();

            var fileNamesNoMp3 = new List<string>();

            foreach (var file in fileNames)
            {
                fileNamesNoMp3.Add(file.Replace(".mp3", ""));
            }
            var sequencers = await _context.Sequencers.Where(x => x.IdUser == iduser && x.Private == false && fileNamesNoMp3.Contains(x.IdSequencer.ToString())).ToListAsync();
            return sequencers;
        }
    }
}
