using System;
using System.Collections.Generic;

namespace Logs.Core.Entities;

public partial class EventLog
{
    public int Id { get; set; }

    public DateTime Fecha { get; set; }

    public string Descripcion { get; set; } = null!;

    public string Tipo { get; set; } = null!;
}
