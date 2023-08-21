using microondas_digital_application.DTOs;
using microondas_digital_application.Services.AuthenticationService;
using microondas_digital_application.Services.MicroondasService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace microondas_digital_api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class MicroondasController : ControllerBase
    {
        private readonly IMicroondasService _microondasService;
        private readonly IAuthService _authService;

        public MicroondasController(IMicroondasService microondasService, IAuthService authService)
        {
            _microondasService = microondasService;
            _authService = authService;
        }

        [HttpPost("Iniciar")]
        public async Task<IActionResult> IniciarMicroondas(IniciarMicroondasDTO dto)
        {
            try
            {
                dto.UserId = _authService.GetUserId(Request.Headers[HeaderNames.Authorization]);
                var response = await _microondasService.Iniciar(dto);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Parar")]
        public async Task<IActionResult> PararMicroondas()
        {
            try
            {
                var userId = _authService.GetUserId(Request.Headers[HeaderNames.Authorization]);
                var response = await _microondasService.Parar(userId);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Tick")]
        public async Task<IActionResult> TickMicroondas()
        {
            try
            {
                var userId = _authService.GetUserId(Request.Headers[HeaderNames.Authorization]);
                var response = await _microondasService.Tick(userId);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Usuario")]
        public async Task<IActionResult> GetByUserId()
        {
            try
            {
                var userId = _authService.GetUserId(Request.Headers[HeaderNames.Authorization]);
                var response = await _microondasService.FindByUserId(userId);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("ProgramasAquecimento")]
        public async Task<IActionResult> GetListProgramasAquecimento()
        {
            try
            {
                var userId = _authService.GetUserId(Request.Headers[HeaderNames.Authorization]);
                var response = await _microondasService.GetProgramasAquecimentoByUserId(userId);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("ProgramasAquecimento")]
        public async Task<IActionResult> CriarProgramaAquecimento(CriarProgramaAquecimentoDTO dto)
        {
            try
            {
                var userId = _authService.GetUserId(Request.Headers[HeaderNames.Authorization]);
                dto.UserId = userId;
                var response = await _microondasService.CreateProgramaAquecimento(dto);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
