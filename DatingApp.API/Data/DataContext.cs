using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}


        public DbSet<Value> MyProperty {get;set;}
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos {get;set;}

    }
}