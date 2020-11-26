using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using dating.app.data;
using dating.app.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System;
using dating.app.Filters;
using dating.app.Helper;

namespace dating.app.Controllers {
    [ServiceFilter(typeof(AppActionFilter))]
    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase {
        private IDatingRepository _datingRepo;
        private IMapper _autoMapper;
        public UserController (
            IDatingRepository datingRepository,
            IMapper autoMapper) {
            _datingRepo = datingRepository;
            _autoMapper = autoMapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUser ([FromQuery]UserParams userParams) {
            var users = await _datingRepo.GetAllUser (userParams);
            Response.AddPagination(users.CurrentPage,users.PageSize,users.TotalCount,users.TotalPages);
            var userToReturn = _autoMapper.Map<IEnumerable<UserListDto>>(users);
            return Ok (userToReturn);
        }

        [HttpGet ("{id}")]
        public async Task<IActionResult> GetUser (int id) {
            var user = await _datingRepo.GetUser (id);
            var userToReturn = _autoMapper.Map<UserDetailsDto>(user);
            return Ok (userToReturn);

        }

        [HttpPost ("SaveAll")]
        public async Task<IActionResult> SaveAll () {
            var isSave = await _datingRepo.SaveAll ();
            return Ok (isSave);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserToUpdateDto user)
        {
            
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
           
            var userToUpdate = await _datingRepo.GetUser(id);
            _autoMapper.Map(user, userToUpdate);
        
            if (await _datingRepo.SaveAll())
                return NoContent();

            throw new Exception("failed to update user");

        }

    }
}