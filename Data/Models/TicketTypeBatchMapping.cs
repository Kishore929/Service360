using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class TicketTypeBatchMapping
    {
        public long Id { get; set; }
        public long TicketTypeId { get; set; }
        public long TicketTypeBatchId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

        public virtual TicketType TicketType { get; set; } = null!;
        public virtual TicketTypeBatch TicketTypeBatch { get; set; } = null!;
    }
}
