using System;

namespace dating.app.DTO
{
    public class UserListDto
    {
        
        public int Id { get; set; }
        public string UserName { get; set; }

        public string Sex { get; set; }
        public string Interest { get; set; }
        public int Age { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string LookingFor { get; set; }
        public string City { get; set; }
        public string country { get; set; }

        public string Url {get ;set;}
        
    }
}