using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Route.Models
{
    public class Orden
    {
        public int Id { get; set; }
        public DateTime FechaCreacion { get; set; }
        public string Estado { get; set; }
        public int PrecioTotal { get; set; }
        public int IdCarrito { get; set; }
        public int IdEnvio { get; set; }
    }
}
