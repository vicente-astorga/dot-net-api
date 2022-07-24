using Microsoft.EntityFrameworkCore;
using Route.Models;

namespace Route.Contexts
//namespace Route.Models

{
    public class AppDBContext: DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options):base(options)
        {

        }
        public DbSet<Vendedor> Vendedor { get; set; }
        public DbSet<Producto> Producto { get; set; }
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Envio> Envio { get; set; }
        public DbSet<Carrito> Carrito { get; set; }
        public DbSet<Items> Items { get; set; }
        public DbSet<Orden> Orden { get; set; }
    }
}
