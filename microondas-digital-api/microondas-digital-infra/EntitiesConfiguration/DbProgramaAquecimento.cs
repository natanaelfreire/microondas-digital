using System.ComponentModel.DataAnnotations.Schema;

namespace microondas_digital_infra.EntitiesConfiguration
{
    [Table("programa_aquecimento")]
    public class DbProgramaAquecimento
    {
        [Column("id")]
        public string Id { get; set; }

        [Column("nome")]
        public string Nome { get; set; }

        [Column("alimento")]
        public string Alimento { get; set; }

        [Column("minutos")]
        public int Minutos { get; set; }

        [Column("segundos")]
        public int Segundos { get; set; }

        [Column("potencia")]
        public int Potencia { get; set; }

        [Column("instrucoes")]
        public string Instrucoes { get; set; }

        [Column("caractere")]
        public char? Caractere { get; set; }

        public DbUsuario Usuario { get; set; }

        [Column("id_usuario")]
        public string UsuarioId { get; set; }
    }
}
