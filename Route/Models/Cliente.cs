using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Route.Models
{
    public class Cliente
    {
        public int Id { get; set; }
        public string NombreCliente { get; set; }
        public string ApellidoCliente { get; set; }
        public string EmailCliente { get; set; }
        public int TelefonoCliente { get; set; }
    }
}
