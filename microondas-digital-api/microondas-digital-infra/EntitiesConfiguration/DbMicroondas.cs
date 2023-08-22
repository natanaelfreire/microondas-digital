using System.ComponentModel.DataAnnotations.Schema;

namespace microondas_digital_infra.EntitiesConfiguration
{
    [Table("microondas")]
    public class DbMicroondas
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("minutos")]
        public int Minutos { get; set; }

        [Column("segundos")]
        public int Segundos { get; set; }

        [Column("potencia")]
        public int Potencia { get; set; }

        [Column("hora_inicio")]
        public DateTime? HoraInicio { get; set; }

        [Column("hora_pausa")]
        public DateTime? HoraPausa { get; set; }

        public DbUsuario Usuario { get; set; }

        [Column("id_usuario")]
        public string UsuarioId { get; set; }

        [Column("id_programa_aquecimento_selecionado")]
        public string ProgramaAquecimentoSelecionadoId { get; set; }
    }
}
