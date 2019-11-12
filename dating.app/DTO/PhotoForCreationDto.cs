using System;
using Microsoft.AspNetCore.Http;

namespace dating.app.DTO
{
    public class PhotoForCreationDto
    {
        public string Description { get; set; }

        public IFormFile File {get; set;}
        public string Url { get; set; }

        public DateTime DateTime { get; set; }

        public string publicId {get; set;}

        public PhotoForCreationDto()
        {
            DateTime = DateTime.Now;
        }
    }
}