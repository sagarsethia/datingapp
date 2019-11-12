using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace dating.app.data {
    public class AuthRepository : IAuthRepository {
        private DataContext _dbContext;
        public AuthRepository (DataContext dataContext) {
            _dbContext = dataContext;
        }
        public async Task<bool> isUserExist (string userName) {
            var user = await _dbContext.User.FirstOrDefaultAsync (r => r.UserName == userName);
            if (user != null)
                return true;
            return false;
        }

        public async Task<User> Login (string username, string password) {
            var user = await _dbContext.User.Include(r=>r.Photos).FirstOrDefaultAsync (r=>r.UserName==username);
            if (user == null)
                return null;
            if (!VerifyHashPassword (password, user.PasswordSalt, user.PasswordHash))
                return null;
            return user;
        }

        private bool VerifyHashPassword (string password, byte[] passwordsalt, byte[] passwordhash) {
            using (var hmac = new System.Security.Cryptography.HMACSHA512 (passwordsalt)) {
                var computedHash = hmac.ComputeHash (System.Text.Encoding.UTF8.GetBytes (password));
                for (int i = 0; i < computedHash.Length; i++) {
                    if (computedHash[i] != passwordhash[i]) {
                        return false;
                    }
                }
            }
            return true;
        }

        public async Task<User> Register (User user, string password) {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash (password,
                out passwordHash,
                out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            await _dbContext.AddAsync (user);
            await _dbContext.SaveChangesAsync ();

            return user;
        }
        private void CreatePasswordHash (string password, out byte[] passwordHash, out byte[] passwordSalt) {
            using (var hmac = new System.Security.Cryptography.HMACSHA512 ()) {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash (System.Text.Encoding.UTF8.GetBytes (password));
            }
        }
    }
}