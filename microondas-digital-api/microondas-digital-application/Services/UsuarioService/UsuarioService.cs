using microondas_digital_application.DTOs;
using microondas_digital_domain.Entities;
using microondas_digital_infra.Repositories.UsuarioRepository;

namespace microondas_digital_application.Services.UsuarioService
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<Usuario> Create(CriarUsuarioDTO dto)
        {
            var usuario = new Usuario(dto.Nome, dto.Senha);

            return await _usuarioRepository.Create(usuario);
        }

        public async Task<Usuario> GetUsuarioById(string id)
        {
            return await _usuarioRepository.GetUsuarioById(id);
        }

        public async Task<UsuarioDTO> Login(LoginDTO dto)
        {
            var usuario = await _usuarioRepository.GetUsuarioByName(dto.Nome);

            if (usuario == null)
                throw new Exception("Usuário não encontrado.");

            var senhaValida = usuario.ValidaSenha(dto.Senha);

            if (senhaValida == false) 
                throw new Exception("Senha incorreta");

            var token = TokenService.GenerateToken(usuario);

            return new UsuarioDTO
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Token = token
            };
        }
    }
}
