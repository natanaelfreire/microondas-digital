using Microsoft.Extensions.Primitives;
using System.IdentityModel.Tokens.Jwt;

namespace microondas_digital_application.Services.AuthenticationService
{
    public class AuthService : IAuthService
    {
        public string GetUserId(StringValues headers)
        {
            var stream = headers.ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(stream);

            var jwt = jsonToken as JwtSecurityToken;

            return jwt?.Claims.First(c => c.Type == "userId").Value ?? "";
        }
    }
}
