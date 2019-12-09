using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace dating.app.data
{
    public class SeedWorldData
    {
        public static void Seed()
        {

            var worldData = System.IO.File.ReadAllText("data/cities.Json");
             var countries = JsonConvert.DeserializeObject<Countries[]>(worldData);
            // if (!dbcontext.Countries.Any())
            // {
            //     var worldData = System.IO.File.ReadAllText("data/cities.Json");
            //    // var countries = JsonConvert.DeserializeObject<Countries[]>(worldData);
            //     // foreach (var item in countries)
            //     // {
                   
            //     // }
            //     dbcontext.SaveChangesAsync();
            // }
        }
    }
}