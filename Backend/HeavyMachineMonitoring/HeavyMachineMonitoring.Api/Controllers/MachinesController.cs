namespace HeavyMachineMonitoring.Api.Controllers
{
    using System;
    using System.Threading.Tasks;
    using HeavyMachineMonitoring.Application.DTOs;
    using HeavyMachineMonitoring.Application.Services;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("api/[controller]")]
    public class MachinesController : ControllerBase
    {
        private readonly MachineService _machineService;

        public MachinesController(MachineService machineService)
        {
            _machineService = machineService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMachines([FromQuery] string status)
        {
            var machines = await _machineService.GetAllMachinesAsync(status);
            return Ok(machines);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMachine(Guid id)
        {
            var machine = await _machineService.GetMachineByIdAsync(id);
            if (machine == null)
            {
                return NotFound();
            }
            return Ok(machine);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMachine([FromBody] CreateMachineDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newMachine = await _machineService.CreateMachineAsync(createDto);
            return CreatedAtAction(nameof(GetMachine), new { id = newMachine.Id }, newMachine);
        }

        [HttpPatch("{id}/telemetry")]
        public async Task<IActionResult> UpdateTelemetry(Guid id, [FromBody] UpdateTelemetryDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _machineService.UpdateMachineTelemetryAsync(id, updateDto);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
