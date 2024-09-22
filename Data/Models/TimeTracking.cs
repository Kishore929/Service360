using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class TimeTracking
    {
        public long Id { get; set; }
        public long TicketId { get; set; }
        public long? EstimatedTime { get; set; }
        public long? RemainingTime { get; set; }
        public long? LoggedTime { get; set; }
        public string? LogDescription { get; set; }
        public long? TimeLoggedBy { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

        public virtual Ticket Ticket { get; set; } = null!;
        public virtual User? TimeLoggedByNavigation { get; set; }
    }
}
