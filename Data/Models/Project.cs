using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Project
    {
        public Project()
        {
            PriorityBatchAssociations = new HashSet<PriorityBatchAssociation>();
            TicketTypeBatchAssociations = new HashSet<TicketTypeBatchAssociation>();
            TicketTypeScreenBatchProjectMappings = new HashSet<TicketTypeScreenBatchProjectMapping>();
            Tickets = new HashSet<Ticket>();
            WorkflowBatchAssociations = new HashSet<WorkflowBatchAssociation>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public long ProjectLead { get; set; }
        public string ProjectKey { get; set; } = null!;
        public long? DefaultAssignee { get; set; }
        public string? ProjectLogoUrl { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool IsArchived { get; set; }
        public long? PreviousIssueId { get; set; }

        public virtual User? DefaultAssigneeNavigation { get; set; }
        public virtual User ProjectLeadNavigation { get; set; } = null!;
        public virtual ICollection<PriorityBatchAssociation> PriorityBatchAssociations { get; set; }
        public virtual ICollection<TicketTypeBatchAssociation> TicketTypeBatchAssociations { get; set; }
        public virtual ICollection<TicketTypeScreenBatchProjectMapping> TicketTypeScreenBatchProjectMappings { get; set; }
        public virtual ICollection<Ticket> Tickets { get; set; }
        public virtual ICollection<WorkflowBatchAssociation> WorkflowBatchAssociations { get; set; }
    }
}
