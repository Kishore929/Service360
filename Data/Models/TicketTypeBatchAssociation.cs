using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class TicketTypeBatchAssociation
    {
        public long Id { get; set; }
        public long ProjectId { get; set; }
        public long TicketTypeBatchId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

        public virtual Project Project { get; set; } = null!;
        public virtual TicketTypeBatch TicketTypeBatch { get; set; } = null!;
    }
}
