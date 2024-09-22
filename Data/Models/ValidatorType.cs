using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class ValidatorType
    {
        public ValidatorType()
        {
            Validators = new HashSet<Validator>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string? Parameters { get; set; }
        public DateTime Created { get; set; }

        public virtual ICollection<Validator> Validators { get; set; }
    }
}
