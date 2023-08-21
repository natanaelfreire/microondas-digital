using Microsoft.Extensions.Primitives;

namespace microondas_digital_application.Services.AuthenticationService
{
    public interface IAuthService
    {
        string GetUserId(StringValues headers);
    }
}
