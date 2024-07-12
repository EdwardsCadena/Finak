using AutoMapper;
using Logs.Core.DTOs;
using Logs.Core.Entities;
using Logs.Core.Interfaces;
using Logs.Infrastructure.Repository;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using Proyecto.API.Response;
using System.Security.Claims;
using Swashbuckle.AspNetCore.Annotations;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Logs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventLogController : ControllerBase
    {
        private readonly IEventLogRepository _EventLogRepository;
        private readonly IMapper _mapper;
        public EventLogController(IEventLogRepository eventlogRepository, IMapper mapper)
        {
            _EventLogRepository = eventlogRepository;
            _mapper = mapper;
        }
        // GET: api/<EventLogController>
        [HttpGet]
        public async Task<IActionResult> GetEventLogs()
        {
            var eventlogs = await _EventLogRepository.GetEventLogs();
            var eventlogsdto = _mapper.Map<IEnumerable<EventLogDTOs>>(eventlogs);
            return Ok(eventlogsdto);
        }

        // GET api/<EventLogController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventLog(int id)
        {
            var eventlog = await _EventLogRepository.GetEventLog(id);
            var eventlogs = _mapper.Map<EventLogDTOs>(eventlog);
            return Ok(eventlogs);
        }

        // POST api/<EventLogController>
        [HttpPost("api-event")]
        [Swashbuckle.AspNetCore.Annotations.SwaggerOperation(
        Summary = "Registrar un nuevo EventLog desde la API",
        Description = "Registra un nuevo evento desde la API con fecha y descripción."
    )]
        [Swashbuckle.AspNetCore.Annotations.SwaggerResponse(200, "OK", typeof(EventLogDTOs))]
        public async Task<IActionResult> PostEventLog(EventLogDTOs eventLogDto)
        {
            var newEventLog = _mapper.Map<EventLog>(eventLogDto);
            newEventLog.Fecha = DateTime.Now;
            var tipo = "api";
            await _EventLogRepository.InsertEventLog(newEventLog, tipo);

            return Ok(newEventLog);
        }

        [HttpPost("manual-event")]
        public async Task<IActionResult> PostManualEventLog([FromBody] EventLogDTOs eventLogDto)
        {
            var newEventLog = _mapper.Map<EventLog>(eventLogDto);
            newEventLog.Fecha = DateTime.Now;
            var tipo = "manual";
            await _EventLogRepository.InsertEventLog(newEventLog,tipo );

            return Ok(newEventLog);
        }

        // PUT api/<EventLogController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEventLog(int id, EventLogDTOs artidto)
        {
            var artiup = _mapper.Map<EventLog>(artidto);
            artiup.Id = id;
            var Update = await _EventLogRepository.UpdateEventLog(artiup);
            var updatedto = new ApiResponse<bool>(Update);
            return Ok(updatedto);
        }

        // DELETE api/<EventLogController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEventLog(int id)
        {
            var result = await _EventLogRepository.DeleteEventLog(id);
            var delete = new ApiResponse<bool>(result);
            return Ok(delete);
        }
    }
}
