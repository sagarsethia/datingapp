using System;
using System.Collections;
using System.Collections.Generic;

namespace dating.app.data {
    public class User {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Sex { get; set; }
        public string Interest { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string LookingFor { get; set; }
        public string City { get; set; }
        public string country { get; set; }
        public ICollection<Photo> Photos { get; set; }

    }
}