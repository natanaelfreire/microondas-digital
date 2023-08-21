using microondas_digital_application.DTOs;
using microondas_digital_domain.Entities;
using microondas_digital_infra.Repositories.MicroondasRepository;

namespace microondas_digital_application.Services.MicroondasService
{
    public class MicroondasService : IMicroondasService
    {
        private readonly IMicroondasRepository _microondasRepository;

        private readonly List<ProgramaAquecimento> PROGRAMAS_AQUECIMENTO_DEFAULT = new List<ProgramaAquecimento>
        {
            new ProgramaAquecimento("Pipoca", "Pipoca de microondas", 3, 0, 7, "Observar o barulho do estouro do milho, caso houver um intervalo de mais de 10 segundos entre um estouro e outro, interrompa o aquecimento", '.'),
            new ProgramaAquecimento("Leite", "Leite", 5, 0, 5, "Cuidado com aquecimento de líquidos, choque térmico aliado ao movimento do recipiente pode causar fervura imediata causando risco de queimaduras", '.'),
            new ProgramaAquecimento("Carnes", "Carnes em pedaços ou fatias", 14, 0, 4, "Interrompa o processo na metade e vire o conteúdo com a parte de baixo para cima para descongelamento uniforme", '.'),
            new ProgramaAquecimento("Frango", "Frango congelado", 8, 0, 7, "Interrompa o processo na metade e vire o conteúdo com a parte de baixo para cima para descongelamento uniforme", '.'),
            new ProgramaAquecimento("Feijão", "Feijão congelado", 8, 0, 9, "Deixe o recipiente destampado e em casos de plástico, cuidado ao retirar o recipiente pois o mesmo pode perder resistência em altas temperaturas", '.')
        };

        public MicroondasService(IMicroondasRepository microondasRepository)
        {
            _microondasRepository = microondasRepository;
        }

        public async Task<bool> CreateProgramaAquecimento(CriarProgramaAquecimentoDTO dto)
        {
            var listaProgramas = await _microondasRepository.GetProgramasAquecimentoByUserId(dto.UserId);

            if (listaProgramas != null && listaProgramas.Count > 5)
                throw new Exception("Limite máximo de programas de aquecimento atingido");

            if (listaProgramas != null && listaProgramas.Where(x => x.Caractere == dto.Caractere).Any())
                throw new Exception("Caractere já está sendo utilizado em outro programa de aquecimento");

            var programa = new ProgramaAquecimento(dto.Nome, dto.Alimento, dto.Minutos, dto.Segundos, dto.Potencia, dto.Instrucoes, dto.Caractere);
            var result = await _microondasRepository.CreateProgramaAquecimento(programa, dto.UserId);

            return result;
        }

        public async Task<Microondas> FindByUserId(string userId)
        {
            var microondas = await _microondasRepository.FindByUserId(userId);
            microondas.ProgramasAquecimento = await GetProgramasAquecimentoByUserId(userId);

            return microondas;
        }

        public async Task<List<ProgramaAquecimento>> GetProgramasAquecimentoByUserId(string userId)
        {
            var listaProgramas = await _microondasRepository.GetProgramasAquecimentoByUserId(userId);

            return PROGRAMAS_AQUECIMENTO_DEFAULT.Concat(listaProgramas).ToList();
        }

        public async Task<Microondas> Iniciar(IniciarMicroondasDTO dto)
        {
            var microondas = await _microondasRepository.FindByUserId(dto.UserId);
            microondas.ProgramasAquecimento = await GetProgramasAquecimentoByUserId(dto.UserId);

            if (dto.ProgramaAquecimentoId != null)
                microondas.Iniciar(dto.ProgramaAquecimentoId);
            else
                microondas.Iniciar(dto.Minutos, dto.Segundos, dto.Potencia);

            await _microondasRepository.Update(microondas, dto.UserId);

            return microondas;
        }

        public async Task<Microondas> Parar(string userId)
        {
            var microondas = await _microondasRepository.FindByUserId(userId);
            microondas.ProgramasAquecimento = await GetProgramasAquecimentoByUserId(userId);
            microondas.Parar();
            await _microondasRepository.Update(microondas, userId);

            return microondas;
        }

        public async Task<Microondas> Tick(string userId)
        {
            var microondas = await _microondasRepository.FindByUserId(userId);
            microondas.ProgramasAquecimento = await GetProgramasAquecimentoByUserId(userId);
            microondas.Tick();
            await _microondasRepository.Update(microondas, userId);

            return microondas;
        }
    }
}
