using microondas_digital_domain.Validations;

namespace microondas_digital_domain.Entities
{
    public class Microondas
    {
        public int Minutos { get; private set; }
        public int Segundos { get; private set; }
        public int Potencia { get; private set; }
        public DateTime? HoraInicio { get; private set; }
        public DateTime? HoraPausa { get; private set; }
        public string ProgramaAquecimentoSelecionadoId { get; set; } = null;
        public List<ProgramaAquecimento> ProgramasAquecimento { get; set; }
        public char Caractere { get; set; } = '.';

        public Microondas(int minutos, int segundos, int potencia = 10, DateTime? horaInicio = null, DateTime? horaPausa = null)
        {
            ValidaMicroondas(minutos, segundos, potencia, horaInicio, horaPausa);
        }

        private void ValidaMicroondas(int minutos, int segundos, int potencia = 10, DateTime? horaInicio = null, DateTime? horaPausa = null)
        {
            MicroondasDomainException.When(minutos < 0 || minutos > 59, "Minutos deve ser entre 0 e 59");
            MicroondasDomainException.When(segundos < 0 || minutos > 59, "Segundos deve ser entre 0 e 59");
            MicroondasDomainException.When(potencia < 1 || potencia > 10, "Potência deve ser entre 1 e 10");

            Minutos = minutos;
            Segundos = segundos;
            Potencia = potencia;
            HoraInicio = horaInicio;
            HoraPausa = horaPausa;
        }

        public void Iniciar(int minutos, int segundos, int potencia)
        {
            if (HoraInicio != null && HoraPausa == null)
            {
                Mais30Secs();
                return;
            }
            else if (HoraInicio != null && HoraPausa != null)
            {
                HoraPausa = null;
                return;
            }

            int totalSegundos = (minutos * 60) + segundos;

            if (totalSegundos == 0)
                totalSegundos = 30; // Inicio rápido

            MicroondasDomainException.When(totalSegundos > 160, "Tempo máximo de aquecimento para início manual: 2 min");
            MicroondasDomainException.When(potencia < 1 || potencia > 10, "Potência deve ser entre 1 e 10");
            MicroondasDomainException.When(totalSegundos < 0, "Tempo de aquecimento deve ser maior que 0");

            Minutos = totalSegundos / 60;
            Segundos = totalSegundos % 60;
            Potencia = potencia;
            HoraInicio = DateTime.Now;
            HoraPausa = null;
            Caractere = '.';
        }

        public void Iniciar(string programaAquecimentoId)
        {
            if (HoraInicio != null && HoraPausa == null)
            {
                Mais30Secs();
                return;
            }
            else if (HoraInicio != null && HoraPausa != null)
            {
                HoraPausa = null;
                return;
            }

            ProgramaAquecimento programaAquecimento = ProgramasAquecimento?.Where(x => x.Id == programaAquecimentoId).FirstOrDefault();

            if (programaAquecimento != null)
            {
                Minutos = programaAquecimento.Minutos;
                Segundos = programaAquecimento.Segundos;
                Potencia = programaAquecimento.Potencia;
                HoraInicio = DateTime.Now;
                HoraPausa = null;
                Caractere = programaAquecimento.Caractere ?? '.';
                ProgramaAquecimentoSelecionadoId = programaAquecimentoId;
            }
            else
                MicroondasDomainException.When(programaAquecimento == null, "Programa de aquecimento não encontrado");
        }

        public void Parar()
        {
            if (HoraInicio != null && HoraPausa == null)
                Pausar();
            else if (HoraInicio != null && HoraPausa != null)
                Cancelar();
        }

        public void Pausar()
        {
            HoraPausa = DateTime.Now;
        }

        public void Cancelar()
        {
            Minutos = 0;
            Segundos = 0;
            Potencia = 10;
            HoraInicio = null;
            HoraPausa = null;
            ProgramaAquecimentoSelecionadoId = null;
        }

        public void Mais30Secs()
        {
            int totalSegundos = (Minutos * 60) + Segundos;
            totalSegundos += 30;

            Minutos = totalSegundos / 60;
            Segundos = totalSegundos % 60;
        }

        public void Tick()
        {
            if (HoraInicio != null && HoraPausa == null)
            {
                int totalSegundos = (Minutos * 60) + Segundos;

                if (totalSegundos > 0)
                {
                    totalSegundos -= 1;
                    Minutos = totalSegundos / 60;
                    Segundos = totalSegundos % 60;
                }
                else
                {
                    HoraInicio = null;
                    ProgramaAquecimentoSelecionadoId = null;
                }
            }
        }
    }
}
