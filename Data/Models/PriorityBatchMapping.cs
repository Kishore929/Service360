using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class PriorityBatchMapping
    {
        public long Id { get; set; }
        public long PriorityId { get; set; }
        public long PriorityBatchId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

        public virtual Priority Priority { get; set; } = null!;
        public virtual PriorityBatch PriorityBatch { get; set; } = null!;
    }
}
