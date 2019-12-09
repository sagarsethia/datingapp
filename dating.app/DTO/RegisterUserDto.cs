using System;
using System.ComponentModel.DataAnnotations;

namespace dating.app.DTO {
    public class RegisterUserDto {
        [Required]
        public string UserName { get; set; }

        [Required]
        [StringLength (10, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        public string Password { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string City { get; set; }

        public string country { get; set; }

        public string Sex { get; set; }
    }
}