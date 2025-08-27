namespace HeavyMachineMonitoring.Application.DTOs
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using HeavyMachineMonitoring.Domain.Entities; // <-- Adicionado using

    public class CreateMachineDto
    {
        [Required(ErrorMessage = "O nome da máquina é obrigatório")]
        [StringLength(100, ErrorMessage = "O nome não pode exceder 100 caracteres")]
        public string Name { get; set; }

        [Required(ErrorMessage = "A localização é obrigatória")]
        public string Location { get; set; }

        [Required(ErrorMessage = "O status é obrigatório")]
        [EnumDataType(typeof(MachineStatus), ErrorMessage = "Status inválido")]
        public MachineStatus Status { get; set; }
    }

    public class UpdateTelemetryDto
    {
        [Required(ErrorMessage = "A localização é obrigatória")]
        public string Location { get; set; }

        [Required(ErrorMessage = "O status é obrigatório")]
        [EnumDataType(typeof(MachineStatus), ErrorMessage = "Status inválido")]
        public MachineStatus Status { get; set; }
    }

    public class MachineDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string Status { get; set; }
    }
}
