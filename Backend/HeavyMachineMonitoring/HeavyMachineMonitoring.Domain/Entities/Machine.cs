namespace HeavyMachineMonitoring.Domain.Entities
{
    using System.ComponentModel.DataAnnotations;

    public enum MachineStatus
    {
        Operating,
        Maintenance,
        Stopped
    }

    public class Machine
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public MachineStatus Status { get; set; }
    }
}