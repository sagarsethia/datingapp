using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using dating.app.data;
using dating.app.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dating.app.Controllers {
    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase {
        private IDatingRepository _datingRepo;
        private IMapper _autoMapper;
        public UserController (IDatingRepository datingRepository, IMapper autoMapper) {
            _datingRepo = datingRepository;
            _autoMapper = autoMapper;
        }

        [HttpGet]
        public async Task<ActionResult> GetUser () {
            var users = await _datingRepo.GetAllUser ();
            var userToReturn = _autoMapper.Map<IEnumerable<UserListDto>>(users);
            return Ok (userToReturn);
        }

        [HttpGet ("{id}")]
        public async Task<ActionResult> GetUser (int id) {
            var user = await _datingRepo.GetUser (id);
            var userToReturn = _autoMapper.Map<UserDetailsDto>(user);
            return Ok (userToReturn);

        }

        [HttpPost ("SaveAll")]
        public async Task<ActionResult> SaveAll () {
            var isSave = await _datingRepo.SaveAll ();
            return Ok (isSave);
        }

        // public void DeleteUser(User user){
        //     _datingRepo.DeleteUser(user);
        // }

        // public void AddUser(User user){
        //     _datingRepo.AddUsers(user);
        // }

    }
}