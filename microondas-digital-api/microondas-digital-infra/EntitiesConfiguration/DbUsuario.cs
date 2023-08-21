using System.ComponentModel.DataAnnotations.Schema;

namespace microondas_digital_infra.EntitiesConfiguration
{
    [Table("usuario")]
    public class DbUsuario
    {
        [Column("id")]
        public string Id { get; set; }

        [Column("nome")]
        public string Nome { get; set; }

        [Column("senha")]
        public string Senha { get; set; }
    }
}
