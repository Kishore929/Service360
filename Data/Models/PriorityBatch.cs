using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class PriorityBatch
    {
        public PriorityBatch()
        {
            PriorityBatchAssociations = new HashSet<PriorityBatchAssociation>();
            PriorityBatchMappings = new HashSet<PriorityBatchMapping>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string Type { get; set; } = null!;
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool IsAssociatedToAnyProject { get; set; }

        public virtual ICollection<PriorityBatchAssociation> PriorityBatchAssociations { get; set; }
        public virtual ICollection<PriorityBatchMapping> PriorityBatchMappings { get; set; }
    }
}
