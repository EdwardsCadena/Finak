using NSwag.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logs.Core.DTOs
{
    public class EventLogDTOs
    {
        public DateTime Fecha { get; set; }

        public string Descripcion { get; set; } = null!;

        
        public string Tipo { get; set; }
    }
}
