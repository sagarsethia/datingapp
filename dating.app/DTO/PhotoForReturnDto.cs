using System;

namespace dating.app.DTO
{
    public class PhotoForReturnDto
    {
        public int Id { get; set; }
        public string Description { get; set; }

        public string Url { get; set; }

        public string publicId {get; set;}

        public bool isMain { get; set; }

        public DateTime DateAdded { get; set; }

    }
}