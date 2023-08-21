namespace microondas_digital_domain.Validations
{
    public class MicroondasDomainException : Exception
    {
        public MicroondasDomainException(string error) : base(error) { }

        public static void When(bool hasError, string error)
        {
            if (hasError)
            {
                throw new MicroondasDomainException(error);
            }
        }
    }
}
