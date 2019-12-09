using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace dating.app.data
{
    public class Cities
    {
        [Key]
        public string cityName { get; set; }
    }

    public class Countries{

        [Key]
        public string countryName {get;set;}

        public Cities[] city { get; set; }

    }
}