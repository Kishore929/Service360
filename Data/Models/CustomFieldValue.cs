using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class CustomFieldValue
    {
        public long Id { get; set; }
        public long TicketId { get; set; }
        public long CustomFieldId { get; set; }
        public long CustomFieldOptionId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

        public virtual CustomField CustomField { get; set; } = null!;
        public virtual CustomFieldOption CustomFieldOption { get; set; } = null!;
        public virtual Ticket Ticket { get; set; } = null!;
    }
}
