using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class ConditionType
    {
        public ConditionType()
        {
            Conditions = new HashSet<Condition>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string? Parameters { get; set; }
        public DateTime Created { get; set; }

        public virtual ICollection<Condition> Conditions { get; set; }
    }
}
