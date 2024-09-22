using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class PermissionBatchMapping
    {
        public long Id { get; set; }
        public long PermissionId { get; set; }
        public long PermissionBatchId { get; set; }
        public long PermissionToId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

        public virtual Permission Permission { get; set; } = null!;
        public virtual PermissionBatch PermissionBatch { get; set; } = null!;
        public virtual PermissionTo PermissionTo { get; set; } = null!;
    }
}
