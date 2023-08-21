using microondas_digital_infra.EntitiesConfiguration;
using Microsoft.EntityFrameworkCore;

namespace microondas_digital_infra.Contexts
{
    public class SQLiteContext : DbContext
    {
        public string DbPath { get; }

        public SQLiteContext(DbContextOptions<SQLiteContext> options) : base(options)
        {
            DbPath = "sqlite.db";
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseSqlite($"Data Source={DbPath}");

        public DbSet<DbUsuario> Usuario { get; set; }
        public DbSet<DbMicroondas> Microondas { get; set; }
        public DbSet<DbProgramaAquecimento> ProgramaAquecimento { get; set; }
    }
}
