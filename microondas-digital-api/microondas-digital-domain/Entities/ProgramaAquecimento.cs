using microondas_digital_domain.Validations;

namespace microondas_digital_domain.Entities
{
    public class ProgramaAquecimento
    {
        public string Id { get; private set; } = string.Empty;
        public string Nome { get; private set; } = string.Empty;
        public string Alimento { get; private set; } = string.Empty;
        public int Minutos { get; private set; }
        public int Segundos { get; private set; }
        public int Potencia { get; private set; }
        public string Instrucoes { get; private set; } = string.Empty;
        public char? Caractere { get; private set; }

        public ProgramaAquecimento(string id, string nome, string alimento, int minutos, int segundos, int potencia, string instrucoes, char? caractere)
        {
            Id = id;
            Nome = nome;
            Alimento = alimento;
            Minutos = minutos;
            Segundos = segundos;
            Potencia = potencia;
            Instrucoes = instrucoes;
            Caractere = caractere;
        }

        public ProgramaAquecimento(string nome, string alimento, int minutos, int segundos, int potencia, string instrucoes, char? caractere)
        {
            Id = Guid.NewGuid().ToString();
            ValidaProgramaAquecimento(nome, alimento, minutos, segundos, potencia, instrucoes, caractere);
        }

        private void ValidaProgramaAquecimento(string nome, string alimento, int minutos, int segundos, int potencia, string instrucoes, char? caractere)
        {
            MicroondasDomainException.When(string.IsNullOrWhiteSpace(nome), "Preencha o campo nome");
            MicroondasDomainException.When(string.IsNullOrWhiteSpace(alimento), "Preencha o campo alimento");
            MicroondasDomainException.When(caractere == null, "Preencha o campo caractere");
            MicroondasDomainException.When(minutos == 0 && segundos == 0, "Preencha algum tempo de aquecimento");
            MicroondasDomainException.When(minutos < 0 || minutos > 59, "Minutos deve ser entre 0 e 59");
            MicroondasDomainException.When(segundos < 0 || minutos > 59, "Segundos deve ser entre 0 e 59");
            MicroondasDomainException.When(potencia < 1 || potencia > 10, "Potência deve ser entre 1 e 10");

            Nome = nome;
            Alimento = alimento;
            Minutos = minutos;
            Segundos = segundos;
            Potencia = potencia;
            Instrucoes = instrucoes;
            Caractere = caractere;
        }
    }
}
