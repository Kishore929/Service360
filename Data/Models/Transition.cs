using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Transition
    {
        public Transition()
        {
            Conditions = new HashSet<Condition>();
            Postfunctions = new HashSet<Postfunction>();
            Validators = new HashSet<Validator>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public long FromStatusId { get; set; }
        public long ToStatusId { get; set; }
        public long? TransitionScreenId { get; set; }
        public long FromStatusBoxId { get; set; }
        public long ToStatusBoxId { get; set; }
        public long WorkflowId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

        public virtual Status FromStatus { get; set; } = null!;
        public virtual Status ToStatus { get; set; } = null!;
        public virtual Screen? TransitionScreen { get; set; }
        public virtual Workflow Workflow { get; set; } = null!;
        public virtual ICollection<Condition> Conditions { get; set; }
        public virtual ICollection<Postfunction> Postfunctions { get; set; }
        public virtual ICollection<Validator> Validators { get; set; }
    }
}
