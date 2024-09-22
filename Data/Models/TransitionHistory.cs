using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class TransitionHistory
    {
        public long Id { get; set; }
        public long TicketId { get; set; }
        public long FromStatusId { get; set; }
        public long ToStatusId { get; set; }
        public long TransitionedBy { get; set; }
        public DateTime TransitionDate { get; set; }

        public virtual Status FromStatus { get; set; } = null!;
        public virtual Ticket Ticket { get; set; } = null!;
        public virtual Status ToStatus { get; set; } = null!;
        public virtual User TransitionedByNavigation { get; set; } = null!;
    }
}
