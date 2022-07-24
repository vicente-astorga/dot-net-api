using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Route.Models
{
    public class Envio
    {
        public int Id { get; set; }
        public int PrecioEnvio { get; set; }
        public DateTime FechaEnvio { get; set; }
        public string DireccionEnvio { get; set; }
        public string RegionEnvio { get; set; }
    }
}
