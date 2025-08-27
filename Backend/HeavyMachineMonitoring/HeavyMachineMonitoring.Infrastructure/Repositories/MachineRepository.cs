namespace HeavyMachineMonitoring.Infrastructure.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using HeavyMachineMonitoring.Domain.Entities; // <-- Adicionado using
    using HeavyMachineMonitoring.Domain.Interfaces; // <-- Adicionado using
    using HeavyMachineMonitoring.Infrastructure.Data; // <-- Adicionado using
    using Microsoft.EntityFrameworkCore;

    public class MachineRepository : IMachineRepository
    {
        private readonly AppDbContext _context;

        public MachineRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Machine> GetByIdAsync(Guid id) => await _context.Machines.FindAsync(id);

        public async Task<IEnumerable<Machine>> GetAllAsync() => await _context.Machines.ToListAsync();

        public async Task<IEnumerable<Machine>> GetByStatusAsync(MachineStatus status) =>
            await _context.Machines.Where(m => m.Status == status).ToListAsync();

        public async Task AddAsync(Machine machine)
        {
            _context.Machines.Add(machine);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Machine machine)
        {
            _context.Entry(machine).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var machine = await _context.Machines.FindAsync(id);
            if (machine != null)
            {
                _context.Machines.Remove(machine);
                await _context.SaveChangesAsync();
            }
        }
    }
}
