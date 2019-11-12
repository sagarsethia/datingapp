using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using dating.app.data;
using dating.app.DTO;
using dating.app.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace dating.app.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotoController : ControllerBase
    {

        private IDatingRepository _repo;
        private IMapper _autoMapper;
        private IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotoController(IDatingRepository repository, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _repo = repository;
            _autoMapper = mapper;

            Account account = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(account);
        }

        [HttpPut("AddAsMainPhoto/{photoId}")]
        public async Task<IActionResult> AddAsMainPhoto(int userId, int photoId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var userFromRepo = await _repo.GetUser(userId);

            if (!userFromRepo.Photos.Any(p => p.Id == photoId))
                return Unauthorized();

            var photoFromRepo = await _repo.GetPhotos(photoId);
            if (photoFromRepo.IsMain == true)
                return BadRequest("Already Main Photo");

            photoFromRepo.IsMain = true;
            var userMainPhoto = await _repo.GetUserMainPhoto(userId);
            if(userMainPhoto!=null)
            userMainPhoto.IsMain = false;

            if (await _repo.SaveAll())
                return Ok(photoFromRepo);

            return BadRequest("Issue in saving Main Photo");

        }

        [HttpPost]
        public async Task<IActionResult> AddUserPhoto(int userId, [FromForm] PhotoForCreationDto photoForCreationDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);
            var file = photoForCreationDto.File;
            var uploadResult = new ImageUploadResult();
            using (var stream = file.OpenReadStream())
            {
                var uploadParam = new ImageUploadParams()
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                };
                uploadResult = _cloudinary.Upload(uploadParam);
            }
            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.publicId = uploadResult.PublicId;

            var photo = _autoMapper.Map<Photo>(photoForCreationDto);
            if (!userFromRepo.Photos.Any(r => r.IsMain))
                photo.IsMain = true;

            userFromRepo.Photos.Add(photo);

            if (await _repo.SaveAll())
            {
                var photoFromRepo = await _repo.GetPhotos(photo.Id);
                var photoToReturn = _autoMapper.Map<PhotoForReturnDto>(photoFromRepo);
                return Ok(photoToReturn);

            }
            return BadRequest("Error in Uploading Photo");

        }

        [HttpDelete]
        public async Task<IActionResult> DeletePhoto(Photo photo)
        {
            if (await _repo.Delete<Photo>(photo))
            {
               _cloudinary.DeleteResources(photo.PublicId);
                return Ok(photo);
            }
            return BadRequest("Error deleting photo");
        }

    }
}