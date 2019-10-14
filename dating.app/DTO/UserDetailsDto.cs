using System;
using System.Collections;
using System.Collections.Generic;
using dating.app.data;

namespace dating.app.DTO
{
    public class UserDetailsDto
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

        public ICollection<photosDto> Photos {get ; set;}
    }
}