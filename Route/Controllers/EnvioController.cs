using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Route.Contexts;
using Route.Models;

namespace Route.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnvioController : ControllerBase
    {
        private readonly AppDBContext context;

        public EnvioController(AppDBContext context)
        {
            this.context = context;
        }

        // GET: api/Envio
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Envio>>> GetEnvio()
        {
            return await context.Envio.ToListAsync();
        }

        // GET: api/Envio/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Envio>> GetEnvio(int id)
        {
            var envio = await context.Envio.FindAsync(id);

            if (envio == null)
            {
                return NotFound();
            }

            return envio;
        }

        // PUT: api/Envio/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEnvio(int id, Envio envio)
        {
            if (id != envio.Id)
            {
                return BadRequest();
            }

            context.Entry(envio).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EnvioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Envio
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Envio>> PostEnvio(Envio envio)
        {
            context.Envio.Add(envio);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEnvio), new { id = envio.Id }, envio);
        }

        // DELETE: api/Envio/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEnvio(int id)
        {
            var envio = await context.Envio.FindAsync(id);
            if (envio == null)
            {
                return NotFound();
            }

            context.Envio.Remove(envio);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool EnvioExists(int id)
        {
            return context.Envio.Any(e => e.Id == id);
        }
    }
}
