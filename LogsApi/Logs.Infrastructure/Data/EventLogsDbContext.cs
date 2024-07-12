using System;
using System.Collections.Generic;
using Logs.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Logs.Infrastructure.Data;

public partial class EventLogsDbContext : DbContext
{
    public EventLogsDbContext()
    {
    }

    public EventLogsDbContext(DbContextOptions<EventLogsDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<EventLog> EventLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EventLog>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__EventLog__3214EC07244C3835");

            entity.Property(e => e.Fecha).HasColumnType("datetime");
            entity.Property(e => e.Tipo).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
