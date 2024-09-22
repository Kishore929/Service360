using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Ticket
    {
        public Ticket()
        {
            Comments = new HashSet<Comment>();
            CustomFieldValues = new HashSet<CustomFieldValue>();
            TimeTrackings = new HashSet<TimeTracking>();
            TransitionHistories = new HashSet<TransitionHistory>();
        }

        public long Id { get; set; }
        public string Summary { get; set; } = null!;
        public string? Description { get; set; }
        public long? AssigneeId { get; set; }
        public long ReporterId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool IsArchived { get; set; }
        public long ProjectId { get; set; }
        public long? TicketNumberForTheProject { get; set; }
        public long? PriorityId { get; set; }
        public long? ResolutionId { get; set; }
        public long CurrentStatusId { get; set; }
        public long WorkflowId { get; set; }
        public DateTime? ResolutionDate { get; set; }

        public virtual User? Assignee { get; set; }
        public virtual Status CurrentStatus { get; set; } = null!;
        public virtual Priority? Priority { get; set; }
        public virtual Project Project { get; set; } = null!;
        public virtual User Reporter { get; set; } = null!;
        public virtual Resolution? Resolution { get; set; }
        public virtual Workflow Workflow { get; set; } = null!;
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<CustomFieldValue> CustomFieldValues { get; set; }
        public virtual ICollection<TimeTracking> TimeTrackings { get; set; }
        public virtual ICollection<TransitionHistory> TransitionHistories { get; set; }
    }
}
