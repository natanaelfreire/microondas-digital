using microondas_digital_domain.Validations;
using System.Security.Cryptography;
using System.Text;

namespace microondas_digital_domain.Entities
{
    public class Usuario
    {
        public string Id { get; private set; }
        public string Nome { get; private set; }
        public string Senha { get; private set; }

        public Usuario(string id, string nome, string senha) 
        {
            Id = id;
            Nome = nome;
            Senha = senha;
        }

        public Usuario(string nome, string senha)
        {
            Id = Guid.NewGuid().ToString();
            ValidaUsuario(nome, senha);
        }

        private void ValidaUsuario(string nome, string senha)
        {
            MicroondasDomainException.When(string.IsNullOrWhiteSpace(nome), "Preencha o campo nome");
            MicroondasDomainException.When(string.IsNullOrWhiteSpace(senha), "Preencha o campo senha");

            Nome = nome;
            Senha = ComputeSHA256(senha);
        }

        private static string ComputeSHA256(string s)
        {
            string hash = String.Empty;

            // Initialize a SHA256 hash object
            using (SHA256 sha256 = SHA256.Create())
            {
                // Compute the hash of the given string
                byte[] hashValue = sha256.ComputeHash(Encoding.UTF8.GetBytes(s));

                // Convert the byte array to string format
                foreach (byte b in hashValue)
                {
                    hash += $"{b:X2}";
                }
            }

            return hash;
        }

        public bool ValidaSenha(string senha)
        {
            var hash = ComputeSHA256(senha);

            return hash == Senha;
        }
    }
}
