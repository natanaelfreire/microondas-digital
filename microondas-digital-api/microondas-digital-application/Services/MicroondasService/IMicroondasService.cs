using microondas_digital_application.DTOs;
using microondas_digital_domain.Entities;

namespace microondas_digital_application.Services.MicroondasService
{
    public interface IMicroondasService
    {
        Task<Microondas> Iniciar(IniciarMicroondasDTO dto);
        Task<Microondas> Parar(string userId);
        Task<Microondas> Tick(string userId);
        Task<Microondas> FindByUserId(string userId);
        Task<List<ProgramaAquecimento>> GetProgramasAquecimentoByUserId(string userId);
        Task<bool> CreateProgramaAquecimento(CriarProgramaAquecimentoDTO dto);
    }
}
