using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

using MoonLightBooks.Domain.Entities;
using System.Collections.Generic;

namespace MoonLightBooks.Infrastructure.Data
{
    public class AppDbContext : IdentityDbContext<MoonLightBooks.Domain.Entities.ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options) { }

        public DbSet<MoonLightBooks.Domain.Entities.ApplicationUser> Users => Set<MoonLightBooks.Domain.Entities.ApplicationUser>();
        public DbSet<Book> Books => Set<Book>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<OrderItem> OrderItems => Set<OrderItem>();

        public DbSet<CartItem> CartItems => Set<CartItem>();
        public DbSet<Review> Reviews { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseAsyncSeeding(async (dbContext, _, _) =>
            {
                var rolesQuery = dbContext.Set<IdentityRole>().AsQueryable();

                if (!rolesQuery.Any())
                {
                    var userRole = new IdentityRole
                    {
                        Id = Guid.NewGuid().ToString(),
                        ConcurrencyStamp = DateTime.Now.Ticks.ToString(),
                        Name = "User",
                        NormalizedName = "user"
                    };

                    var adminRole = new IdentityRole
                    {
                        Id = Guid.NewGuid().ToString(),
                        ConcurrencyStamp = DateTime.Now.Ticks.ToString(),
                        Name = "Admin",
                        NormalizedName = "admin"
                    };
                    
                    var superAdmin = new ApplicationUser
                    {
                        Id = Guid.NewGuid().ToString(),
                        Email = "admin@admin.com",
                        NormalizedEmail = "admin@admin.com",
                        FullName = "Super Admin",
                        UserName = "admin@admin.com",
                    };

                    var passwordHasher = new PasswordHasher<ApplicationUser>();
                    superAdmin.PasswordHash = passwordHasher.HashPassword(superAdmin, "pwd123**");

                    dbContext.Add(userRole);
                    dbContext.Add(adminRole);
                    dbContext.Add(superAdmin);

                    dbContext.Set<IdentityUserRole<string>>().Add(new IdentityUserRole<string>
                    {
                        RoleId = adminRole.Id,
                        UserId = superAdmin.Id
                    });

                    await dbContext.SaveChangesAsync();
                }
            });

            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure decimal properties for precision and scale
            modelBuilder.Entity<Book>()
                .Property(b => b.Price)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Order>()
                .Property(o => o.TotalAmount)
                .HasColumnType("decimal(18,2)");
            
            modelBuilder.Entity<Order>()
                .Property(o => o.TotalPrice)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<OrderItem>()
                .Property(oi => oi.UnitPrice)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Review>()
              .HasOne(r => r.User)
              .WithMany(u => u.Reviews)
              .HasForeignKey(r => r.UserId);

            modelBuilder.Entity<Review>()
                .HasOne(r => r.Book)
                .WithMany(b => b.Reviews)
                .HasForeignKey(r => r.BookId);

            modelBuilder.Entity<CartItem>()
                .HasOne(ci => ci.User)
                .WithMany(u => u.CartItems)
                .HasForeignKey(ci => ci.UserId);
 
            modelBuilder.Entity<CartItem>()
                .HasOne(ci => ci.Book)
                .WithMany()
                .HasForeignKey(ci => ci.BookId);





        }     
    }
}
