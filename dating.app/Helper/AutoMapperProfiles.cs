using System.Linq;
using AutoMapper;
using dating.app.data;
using dating.app.DTO;

namespace dating.app.Helper {
    public class AutoMapperProfiles : Profile {
        public AutoMapperProfiles () {
            CreateMap<User, UserDetailsDto> ().ForMember (dest => dest.Url, opt => opt.MapFrom (src =>
                src.Photos.FirstOrDefault (r => r.IsMain).Url)).ForMember (dest => dest.Age, opt => opt.MapFrom (
                src => src.DateOfBirth.CalulateAge ()
            ));
            CreateMap<User, UserListDto> ().ForMember (dest => dest.Url, opt => opt.MapFrom (src =>
                src.Photos.FirstOrDefault (r => r.IsMain).Url)).ForMember (dest => dest.Age, opt => opt.MapFrom (
                src => src.DateOfBirth.CalulateAge ()
            ));
            CreateMap<Photo, photosDto> ();
        }
    }
}