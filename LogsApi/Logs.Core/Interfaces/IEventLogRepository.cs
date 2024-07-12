using Logs.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logs.Core.Interfaces
{
    public interface IEventLogRepository
    {
        Task<IEnumerable<EventLog>> GetEventLogs();
        Task<EventLog> GetEventLog(int id);
        Task InsertEventLog(EventLog article, string tipo);
        Task<bool> UpdateEventLog(EventLog article);
        Task<bool> DeleteEventLog(int id);
    }
}
