using microondas_digital_domain.Entities;

namespace microondas_digital_infra.Repositories.MicroondasRepository
{
    public interface IMicroondasRepository
    {
        Task<Microondas> FindByUserId(string userId);
        Task<bool> Update(Microondas microondas, string userId);
        Task<List<ProgramaAquecimento>> GetProgramasAquecimentoByUserId(string userId);
        Task<bool> CreateProgramaAquecimento(ProgramaAquecimento programaAquecimento, string userId);
        Task<ProgramaAquecimento> GetProgramaAquecimentoById(string programaAquecimentoId); 
    }
}
