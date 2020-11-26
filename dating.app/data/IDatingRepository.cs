using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dating.app.Helper;

namespace dating.app.data
{
    public interface IDatingRepository
    {
        void AddUsers<T>(T entity) where T:class;

        Task<bool> Delete<T>(T entity) where T:class;
        
        Task<bool> SaveAll();

        Task<PagedList<User>> GetAllUser(UserParams userParams);

        Task<User> GetUser(int userId);
        Task<Photo>GetPhotos(int id);

        Task<Photo>GetUserMainPhoto(int id);
       

    }
}