using System.Threading.Tasks;

namespace dating.app.data {
    public interface IAuthRepository {
        public Task<User> Register (User user, string password);
        public Task<User> Login (string username, string password);
        public Task<bool> isUserExist (string userName);
    }
}