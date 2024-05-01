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

        public UsersController(ReSoundContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
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
