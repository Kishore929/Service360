using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Status
    {
        public Status()
        {
            Tickets = new HashSet<Ticket>();
            TransitionFromStatuses = new HashSet<Transition>();
            TransitionHistoryFromStatuses = new HashSet<TransitionHistory>();
            TransitionHistoryToStatuses = new HashSet<TransitionHistory>();
            TransitionToStatuses = new HashSet<Transition>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public string StatusCategory { get; set; } = null!;

        public virtual ICollection<Ticket> Tickets { get; set; }
        public virtual ICollection<Transition> TransitionFromStatuses { get; set; }
        public virtual ICollection<TransitionHistory> TransitionHistoryFromStatuses { get; set; }
        public virtual ICollection<TransitionHistory> TransitionHistoryToStatuses { get; set; }
        public virtual ICollection<Transition> TransitionToStatuses { get; set; }
    }
}
