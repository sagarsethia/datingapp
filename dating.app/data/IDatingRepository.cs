using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dating.app.data
{
    public interface IDatingRepository
    {
        void AddUsers<T>(T entity) where T:class;

        void DeleteUser<T>(T entity) where T:class;
        
        Task<bool> SaveAll();

        Task<IEnumerable<User>> GetAllUser();

        Task<User> GetUser(int userId);

    }
}