using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Validator
    {
        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public long ValidatorTypeId { get; set; }
        public long TransitionId { get; set; }
        public string Parameters { get; set; } = null!;
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool? IsActive { get; set; }

        public virtual Transition Transition { get; set; } = null!;
        public virtual ValidatorType ValidatorType { get; set; } = null!;
    }
}
