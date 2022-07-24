using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Route.Models
{
    public class Carrito
    {
        public int Id { get; set; }
        public int PrecioSubtotal { get; set; }
        public int IdCliente { get; set; }
    }
}
