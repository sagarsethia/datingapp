using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using dating.app.data;
using dating.app.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace dating.app.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private const string INVALID_USER_ERROR = "Invalid user name or password";
        private IAuthRepository _authService;
        private IMapper _mapper;
        private IConfiguration _config;
        public AuthController(IAuthRepository authService, IConfiguration configuration, IMapper mapper)
        {
            _authService = authService;
            _config = configuration;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUserDto loginDto)
        {
            try
            {
                var user = await _authService.Login(loginDto.Username, loginDto.Password);
                if (user == null)
                    return Unauthorized(INVALID_USER_ERROR);
                var claims = new[] {
                new Claim (ClaimTypes.NameIdentifier, user.Id.ToString ()),
                    new Claim (ClaimTypes.Name, user.UserName)
            };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config.GetSection("AppSetting:token").Value));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddDays(1),
                    SigningCredentials = creds
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);
                var mappedUser = _mapper.Map<UserDetailsDto>(user);

                return Ok(new
                {
                    tokenString,
                    mappedUser
                }
                );
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(RegisterUserDto loginDto)
        {
            try {
            var isUserExist = await _authService.isUserExist(loginDto.UserName);
            if (isUserExist)
                return BadRequest("User Already Exist");
            var userToCreate = new User()
            {
                UserName = loginDto.UserName,
                country = loginDto.country,
                City = loginDto.City,
                DateOfBirth = loginDto.DateOfBirth,
                Sex= loginDto.Sex,
                Created=DateTime.Now
            };
            var registerUser = await _authService.Register(userToCreate, loginDto.Password);
            return Ok(registerUser);
            }
            catch(Exception ex){
                return BadRequest(ex.ToString());
            }

        }
    }
}