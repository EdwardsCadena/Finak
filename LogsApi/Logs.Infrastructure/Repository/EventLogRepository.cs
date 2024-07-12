using Logs.Core.Entities;
using Logs.Core.Interfaces;
using Logs.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logs.Infrastructure.Repository
{
    public class EventLogRepository : IEventLogRepository
    {
        private readonly EventLogsDbContext _context;
        DateTime currentDate = DateTime.Now;
        public EventLogRepository(EventLogsDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<EventLog>> GetEventLogs()
        {
            var eventlog = await _context.EventLogs.ToListAsync();
            return eventlog;
        }
        public async Task<EventLog> GetEventLog(int id)
        {
            var eventlog = await _context.EventLogs.FirstOrDefaultAsync(x => x.Id == id);
            return eventlog;
        }
        public async Task InsertEventLog(EventLog eventlog, string tipo)
        {
            eventlog.Tipo = tipo;
            _context.EventLogs.Add(eventlog);
            await _context.SaveChangesAsync();
        }
        public async Task<bool> UpdateEventLog(EventLog eventlog)
        {
            var result = await GetEventLog(eventlog.Id);
            result.Fecha = eventlog.Fecha;
            result.Descripcion = eventlog.Descripcion;

            int rows = await _context.SaveChangesAsync();
            return rows > 0;
        }
        public async Task<bool> DeleteEventLog(int id)
        {
            var delete = await GetEventLog(id);
            _context.Remove(delete);
            int row = await _context.SaveChangesAsync();
            return row > 0;
        }
    }
}
