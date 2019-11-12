using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dating.app.DTO;
using Microsoft.EntityFrameworkCore;

namespace dating.app.data {
    public class DatingRepository : IDatingRepository {
        private DataContext _dbContext;
        public DatingRepository (DataContext dbcontext) {
            _dbContext = dbcontext;
        }
        public void AddUsers<T> (T entity) where T:class{
           _dbContext.Add(entity);
        }

        public async Task<bool> Delete<T> (T entity) where T:class {
             _dbContext.Remove(entity);
            var isSave= await SaveAll();
            return isSave;
        }

       public async Task<IEnumerable<User>> GetAllUser () {
            var user=  await _dbContext.User.Include(r=>r.Photos).ToListAsync();
            return user;
        }

        public async Task<Photo> GetPhotos(int id)
        {
           var photo= await _dbContext.Photos.FirstOrDefaultAsync(r=>r.Id==id);
           return photo;
        }

        public async Task<User> GetUser(int userId)
        {
            var user= await _dbContext.User.Include(r=>r.Photos).FirstOrDefaultAsync(r=>r.Id==userId);
            return user; 
        }

        public async Task<Photo> GetUserMainPhoto(int id)
        {
             return await _dbContext.Photos.Where(r=>r.IsMain==true && r.UserId==id).FirstOrDefaultAsync();
        }

        public async Task<bool> SaveAll () {
            return await _dbContext.SaveChangesAsync() > 0;
        }

    }
}