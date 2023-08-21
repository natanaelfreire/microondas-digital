using microondas_digital_domain.Entities;

namespace microondas_digital_infra.Repositories.UsuarioRepository
{
    public interface IUsuarioRepository
    {
        Task<Usuario> GetUsuarioById(string id);
        Task<Usuario> GetUsuarioByName(string id);
        Task<Usuario> Create(Usuario usuario);
    }
}
