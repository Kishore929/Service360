using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class WorkflowBatchMapping
    {
        public long Id { get; set; }
        public long WorkflowId { get; set; }
        public long WorkflowBatchId { get; set; }
        public long TicketTypeId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

        public virtual TicketType TicketType { get; set; } = null!;
        public virtual Workflow Workflow { get; set; } = null!;
        public virtual WorkflowBatch WorkflowBatch { get; set; } = null!;
    }
}
