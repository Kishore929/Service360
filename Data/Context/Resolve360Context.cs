using System;
using System.Collections.Generic;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Data.Context
{
    public partial class Resolve360Context : DbContext
    {
        public Resolve360Context()
        {
        }

        public Resolve360Context(DbContextOptions<Resolve360Context> options)
            : base(options)
        {
        }

        public virtual DbSet<User> User { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=LAPTOP-CCA8K04A\\JIRASERVER;Database=resolve360;User Id=sa;Password=Satya225@gmail;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id); // Set Id as the primary key

                entity.ToTable("User");

                entity.Property(e => e.Id).ValueGeneratedOnAdd(); // Ensure Id is auto-generated

                entity.Property(e => e.UserName).IsRequired(); // Make UserName not nullable
                entity.Property(e => e.PasswordHash).IsRequired(); // Make PasswordHash not nullable
                entity.Property(e => e.Email).IsRequired().HasMaxLength(50); // Make Email not nullable with max length of 50
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
