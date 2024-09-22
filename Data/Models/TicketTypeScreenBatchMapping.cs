using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class TicketTypeScreenBatchMapping
    {
        public long Id { get; set; }
        public long ScreenBatchId { get; set; }
        public long TicketTypeId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

        public virtual Screen ScreenBatch { get; set; } = null!;
        public virtual TicketType TicketType { get; set; } = null!;
    }
}
