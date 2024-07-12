using AutoMapper;
using Logs.Core.DTOs;
using Logs.Core.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Logs.Infrastructure.Mapping
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            CreateMap<EventLog, EventLogDTOs>();
            CreateMap<EventLogDTOs, EventLog>();
            
        }
    }
}
