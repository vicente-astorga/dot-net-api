using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Route.Models
{
    public class Items
    {
        public int Id { get; set; }
        public int CantidadItem { get; set; }
        public int PrecioItem { get; set; }
        public int PrecioTotalItem { get; set; }
        public int IdProducto { get; set; }
        public int IdCarrito { get; set; }
    }
}
