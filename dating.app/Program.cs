using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dating.app.data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace dating.app {
    public class Program {
        public static void Main (string[] args) {
            var host = CreateHostBuilder (args).Build ();
            using (var scope = host.Services.CreateScope ()) {
                var service = scope.ServiceProvider;
                try {
                    var context = service.GetRequiredService<DataContext> ();
                    context.Database.Migrate ();
                    SeedUser.Seed (context);
                   // SeedWorldData.Seed(context);
                } catch (Exception ex)  {
                    throw ex;
                }

            }
            host.Run();

        }

        public static IHostBuilder CreateHostBuilder (string[] args) =>
            Host.CreateDefaultBuilder (args)
            .ConfigureWebHostDefaults (webBuilder => {
                webBuilder.UseStartup<Startup> ();
            });
    }
}