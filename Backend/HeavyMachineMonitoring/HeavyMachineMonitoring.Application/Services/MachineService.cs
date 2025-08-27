namespace HeavyMachineMonitoring.Application.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using HeavyMachineMonitoring.Application.DTOs; // <-- Adicionado using
    using HeavyMachineMonitoring.Domain.Entities; // <-- Adicionado using
    using HeavyMachineMonitoring.Domain.Interfaces; // <-- Adicionado using

    public class MachineService
    {
        private readonly IMachineRepository _machineRepository;

        public MachineService(IMachineRepository machineRepository)
        {
            _machineRepository = machineRepository;
        }

        public async Task<IEnumerable<MachineDto>> GetAllMachinesAsync(string statusFilter)
        {
            IEnumerable<Machine> machines;
            if (!string.IsNullOrEmpty(statusFilter) && Enum.TryParse<MachineStatus>(statusFilter, true, out var status))
            {
                machines = await _machineRepository.GetByStatusAsync(status);
            }
            else
            {
                machines = await _machineRepository.GetAllAsync();
            }

            return machines.Select(m => new MachineDto
            {
                Id = m.Id,
                Name = m.Name,
                Location = m.Location,
                Status = m.Status.ToString()
            });
        }

        public async Task<MachineDto> GetMachineByIdAsync(Guid id)
        {
            var machine = await _machineRepository.GetByIdAsync(id);
            if (machine == null) return null;

            return new MachineDto
            {
                Id = machine.Id,
                Name = machine.Name,
                Location = machine.Location,
                Status = machine.Status.ToString()
            };
        }

        public async Task<MachineDto> CreateMachineAsync(CreateMachineDto createDto)
        {
            var machine = new Machine
            {
                Id = Guid.NewGuid(),
                Name = createDto.Name,
                Location = createDto.Location,
                Status = createDto.Status
            };

            await _machineRepository.AddAsync(machine);

            return new MachineDto { Id = machine.Id, Name = machine.Name, Location = machine.Location, Status = machine.Status.ToString() };
        }

        public async Task<bool> UpdateMachineTelemetryAsync(Guid id, UpdateTelemetryDto updateDto)
        {
            var machine = await _machineRepository.GetByIdAsync(id);
            if (machine == null) return false;

            machine.Location = updateDto.Location;
            machine.Status = updateDto.Status;

            await _machineRepository.UpdateAsync(machine);
            return true;
        }
    }
}
