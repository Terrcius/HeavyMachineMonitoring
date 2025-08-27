namespace HeavyMachineMonitoring.Infrastructure.Data
{
    using Machine = HeavyMachineMonitoring.Domain.Entities.Machine;
    using HeavyMachineMonitoring.Domain.Entities; // <-- Adicionado using
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Reflection.Emit;
    using System.Reflection.PortableExecutable;

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Machine> Machines { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Machine>().HasData(
                new Machine { Id = Guid.NewGuid(), Name = "Escavadeira Caterpillar 320D", Location = "Mina A, Setor 1", Status = MachineStatus.Operating },
                new Machine { Id = Guid.NewGuid(), Name = "Pá Carregadeira Volvo L120F", Location = "Pátio de Carga B", Status = MachineStatus.Stopped },
                new Machine { Id = Guid.NewGuid(), Name = "Trator de Esteira Komatsu D65EX", Location = "Área de Terraplanagem C", Status = MachineStatus.Maintenance }
            );
        }
    }
}
