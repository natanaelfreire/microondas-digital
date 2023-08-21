namespace microondas_digital_application.DTOs
{
    public class IniciarMicroondasDTO
    {
        public string UserId { get; set; } = string.Empty;
        public int Potencia { get; set; }
        public int Minutos { get; set; }
        public int Segundos { get; set; }
        public string? ProgramaAquecimentoId { get; set; }
    }
}
