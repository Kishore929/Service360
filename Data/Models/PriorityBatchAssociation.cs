using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class PriorityBatchAssociation
    {
        public long Id { get; set; }
        public long PriorityBatchId { get; set; }
        public long ProjectId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

        public virtual PriorityBatch PriorityBatch { get; set; } = null!;
        public virtual Project Project { get; set; } = null!;
    }
}
