namespace HeavyMachineMonitoring.Domain.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using HeavyMachineMonitoring.Domain.Entities; // <-- Adicionado using

    public interface IMachineRepository
    {
        Task<Machine> GetByIdAsync(Guid id);
        Task<IEnumerable<Machine>> GetAllAsync();
        Task<IEnumerable<Machine>> GetByStatusAsync(MachineStatus status);
        Task AddAsync(Machine machine);
        Task UpdateAsync(Machine machine);
        Task DeleteAsync(Guid id);
    }
}