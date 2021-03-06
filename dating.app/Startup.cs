using dating.app.data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using AutoMapper;
using Newtonsoft.Json;
using Microsoft.IdentityModel.Tokens;
using dating.app.Helper;
using dating.app.Filters;

namespace dating.app
{
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // public void ConfigureDevelopmentServices(IServiceCollection services){
        //     services.AddDbContext<DataContext> (x => {x.UseSqlite (Configuration.GetConnectionString ("DefaultConnection"));});
        //     ConfigureServices(services);
        // }

        // public void ConfigureProductionServices(IServiceCollection services){
           
        //     ConfigureServices(services);
        // }

        public void ConfigureServices (IServiceCollection services) {
            services.AddDbContext<DataContext> (x => x.UseSqlite (Configuration.GetConnectionString ("DefaultConnection")));
            services.AddControllers ();
            services.AddCors ();
            services.AddScoped<IDatingRepository,DatingRepository>();
            services.AddScoped<IAuthRepository, AuthRepository> ();
            services.AddAutoMapper(typeof(DatingRepository).Assembly);
            var key = System.Text.Encoding.ASCII.GetBytes (Configuration.GetSection ("AppSetting:Token").Value);
            services.AddAuthentication (Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme).AddJwtBearer (options => {
                options.TokenValidationParameters = new TokenValidationParameters {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey (key),
                ValidateIssuer = false,
                ValidateAudience = false
                };
            });
            services.AddMvc(option => option.EnableEndpointRouting = false)
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
                .AddNewtonsoftJson(opt => opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
            
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySetting"));
            services.AddScoped<AppActionFilter>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            }
            app.UseDeveloperExceptionPage ();
            app.UseAuthentication();

            app.UseCors (x => x.AllowAnyOrigin ().AllowAnyMethod ().AllowAnyHeader ());
               
            // app.UseHttpsRedirection ();
            app.UseRouting ();
           
            app.UseAuthorization ();
            
            app.UseEndpoints (endpoints => {
                endpoints.MapControllers ();
            });
        }
    }
}