using microondas_digital_domain.Entities;
using microondas_digital_infra.Contexts;
using microondas_digital_infra.EntitiesConfiguration;
using Microsoft.EntityFrameworkCore;

namespace microondas_digital_infra.Repositories.UsuarioRepository
{
    public class SQLiteUsuarioRepository : IUsuarioRepository
    {
        private readonly SQLiteContext _context;

        public SQLiteUsuarioRepository(SQLiteContext context)
        {
            _context = context;
        }

        public async Task<Usuario> Create(Usuario usuario)
        {
            var dbUsuario = new DbUsuario
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Senha = usuario.Senha
            };

            _context.Usuario.Add(dbUsuario);
            await _context.SaveChangesAsync();

            return new Usuario(dbUsuario.Id, dbUsuario.Nome, null);
        }

        public async Task<Usuario> GetUsuarioById(string id)
        {
            return await _context.Usuario
                            .Where(x => x.Id == id)
                            .Select(x => new Usuario(x.Id, x.Nome, null))
                            .FirstOrDefaultAsync();
        }

        public async Task<Usuario> GetUsuarioByName(string nome)
        {
            return await _context.Usuario
                            .Where(x => x.Nome == nome)
                            .Select(x => new Usuario(x.Id, x.Nome, x.Senha))
                            .FirstOrDefaultAsync();
        }
    }
}
