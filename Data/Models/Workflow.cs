using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Workflow
    {
        public Workflow()
        {
            Tickets = new HashSet<Ticket>();
            Transitions = new HashSet<Transition>();
            WorkflowBatchMappings = new HashSet<WorkflowBatchMapping>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool? IsDraft { get; set; }

        public virtual ICollection<Ticket> Tickets { get; set; }
        public virtual ICollection<Transition> Transitions { get; set; }
        public virtual ICollection<WorkflowBatchMapping> WorkflowBatchMappings { get; set; }
    }
}
