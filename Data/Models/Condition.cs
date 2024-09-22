using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Condition
    {
        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public long ConditionTypeId { get; set; }
        public long TransitionId { get; set; }
        public string Parameters { get; set; } = null!;
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool? IsActive { get; set; }

        public virtual ConditionType ConditionType { get; set; } = null!;
        public virtual Transition Transition { get; set; } = null!;
    }
}
