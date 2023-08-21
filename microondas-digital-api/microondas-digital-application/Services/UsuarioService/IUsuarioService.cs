using microondas_digital_application.DTOs;
using microondas_digital_domain.Entities;

namespace microondas_digital_application.Services.UsuarioService
{
    public interface IUsuarioService
    {
        Task<Usuario> Create(CriarUsuarioDTO dto);
        Task<Usuario> GetUsuarioById(string id);
        Task<UsuarioDTO> Login(LoginDTO dto);
    }
}
