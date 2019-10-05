using System;
using Microsoft.EntityFrameworkCore;
using dating.app.Models;

namespace dating.app.data {
    public class DataContext:DbContext
    {
	    public DataContext(DbContextOptions<DataContext>options):base(options){}
        public DbSet<Value>Value{get;set;}
	
    }
}