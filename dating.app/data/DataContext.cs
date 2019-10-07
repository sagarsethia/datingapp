using System;
using dating.app.Models;
using Microsoft.EntityFrameworkCore;

namespace dating.app.data {
    public class DataContext : DbContext {
        public DataContext (DbContextOptions<DataContext> options) : base (options) { }
        public DbSet<Value> Value { get; set; }
        public DbSet<User> User { get; set; }
    }
}