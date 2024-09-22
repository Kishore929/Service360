using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class TicketTypeScreenBatchProjectMapping
    {
        public long Id { get; set; }
        public long TicketTypeScreenBatchId { get; set; }
        public long ProjectId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

        public virtual Project Project { get; set; } = null!;
        public virtual TicketTypeScreenBatch TicketTypeScreenBatch { get; set; } = null!;
    }
}
