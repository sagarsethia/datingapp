using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace dating.app.data {
    public class SeedUser {
        public static void Seed (DataContext dbcontext) {
            
                if(!dbcontext.User.Any()){
                var userData = System.IO.File.ReadAllText ("data/UserSeed.Json");
                
                var users = JsonConvert.DeserializeObject<List<User>> (userData);
                foreach (var user in users) {
                    byte[] passwordSalt, hashPassword;
                    CreatePasswordHash ("Password", out hashPassword, out passwordSalt);
                    user.PasswordHash = hashPassword;
                    user.PasswordSalt = passwordSalt;
                    user.UserName = user.UserName.ToLower();
                    dbcontext.User.Add(user);
                }
                dbcontext.SaveChanges ();
            }
        }

        private static void CreatePasswordHash (string password, out byte[] passwordHash, out byte[] passwordSalt) {
            using (var hmac = new System.Security.Cryptography.HMACSHA512 ()) {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash (System.Text.Encoding.UTF8.GetBytes (password));
            }
        }
    }
}