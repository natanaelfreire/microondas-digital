using microondas_digital_domain.Entities;
using microondas_digital_infra.Contexts;
using microondas_digital_infra.EntitiesConfiguration;
using Microsoft.EntityFrameworkCore;

namespace microondas_digital_infra.Repositories.MicroondasRepository
{
    public class SQLiteMicroondasRepository : IMicroondasRepository
    {
        private readonly SQLiteContext _context;

        public SQLiteMicroondasRepository(SQLiteContext context)
        {
            _context = context;
        }

        private async Task<DbMicroondas> CreateDefault(string userId)
        {
            var dbMicroondas = new DbMicroondas
            {
                Minutos = 0,
                Segundos = 0,
                Potencia = 10,
                UsuarioId = userId,
                HoraInicio = null,
                HoraPausa = null,
                ProgramaAquecimentoSelecionadoId = null
            };

            _context.Microondas.Add(dbMicroondas);
            await _context.SaveChangesAsync();

            return dbMicroondas;
        }

        public async Task<bool> CreateProgramaAquecimento(ProgramaAquecimento programaAquecimento, string userId)
        {
            var dbPrograma = new DbProgramaAquecimento
            {
                Id = programaAquecimento.Id,
                Nome = programaAquecimento.Nome,
                Alimento = programaAquecimento.Alimento,
                Caractere = programaAquecimento.Caractere,
                Instrucoes = programaAquecimento.Instrucoes,
                Minutos = programaAquecimento.Minutos,
                Potencia = programaAquecimento.Potencia,
                Segundos = programaAquecimento.Segundos,
                UsuarioId = userId
            };

            _context.ProgramaAquecimento.Add(dbPrograma);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Microondas> FindByUserId(string userId)
        {
            var dbMicroondas = await _context.Microondas
                                        .Where(x => x.UsuarioId == userId)
                                        .FirstOrDefaultAsync();

            if (dbMicroondas == null)
                dbMicroondas = await CreateDefault(userId);

            return new Microondas(dbMicroondas.Minutos, dbMicroondas.Segundos, dbMicroondas.Potencia, dbMicroondas.HoraInicio, dbMicroondas.HoraPausa, dbMicroondas.ProgramaAquecimentoSelecionadoId);
        }

        public async Task<ProgramaAquecimento> GetProgramaAquecimentoById(string programaAquecimentoId)
        {
            return await _context.ProgramaAquecimento
                            .Where(x => x.Id == programaAquecimentoId)
                            .Select(x => new ProgramaAquecimento(x.Id, x.Nome, x.Alimento, x.Minutos, x.Segundos, x.Potencia, x.Instrucoes, x.Caractere))
                            .FirstOrDefaultAsync();
        }

        public async Task<List<ProgramaAquecimento>> GetProgramasAquecimentoByUserId(string userId)
        {
            var DbProgramas = await _context.ProgramaAquecimento
                                        .Where(x => x.UsuarioId == userId)
                                        .ToListAsync();

            return DbProgramas.Select(x => new ProgramaAquecimento(x.Id, x.Nome, x.Alimento, x.Minutos, x.Segundos, x.Potencia, x.Instrucoes, x.Caractere)).ToList();
        }

        public async Task<bool> Update(Microondas microondas, string userId)
        {
            var dbMicroondas = await _context.Microondas.Where(x => x.UsuarioId == userId).FirstOrDefaultAsync();

            if (dbMicroondas == null)
                dbMicroondas = await CreateDefault(userId);

            dbMicroondas.Minutos = microondas.Minutos;
            dbMicroondas.Segundos = microondas.Segundos;
            dbMicroondas.Potencia = microondas.Potencia;
            dbMicroondas.HoraInicio = microondas.HoraInicio;
            dbMicroondas.HoraPausa = microondas.HoraPausa;
            dbMicroondas.ProgramaAquecimentoSelecionadoId = microondas.ProgramaAquecimentoSelecionadoId;

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
