namespace microondas_digital_application.DTOs
{
    public class CriarProgramaAquecimentoDTO
    {
        public string Nome { get; set; } = string.Empty;
        public string Alimento { get; set; } = string.Empty;
        public int Minutos { get; set; }
        public int Segundos { get; set; }
        public int Potencia { get; set; }
        public string Instrucoes { get; set; } = string.Empty;
        public char? Caractere { get; set; }
        public string UserId { get; set; } = string.Empty;
    }
}
