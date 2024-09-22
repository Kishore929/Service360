using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class WorkflowBatchAssociation
    {
        public long Id { get; set; }
        public long WorkflowBatchId { get; set; }
        public long ProjectId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

        public virtual Project Project { get; set; } = null!;
        public virtual WorkflowBatch WorkflowBatch { get; set; } = null!;
    }
}
