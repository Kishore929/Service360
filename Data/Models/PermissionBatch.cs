using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class PermissionBatch
    {
        public PermissionBatch()
        {
            PermissionBatchMappings = new HashSet<PermissionBatchMapping>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string Type { get; set; } = null!;
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool IsAssociatedtoAnyProject { get; set; }

        public virtual ICollection<PermissionBatchMapping> PermissionBatchMappings { get; set; }
    }
}
