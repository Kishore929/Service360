using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class TicketType
    {
        public TicketType()
        {
            TicketTypeBatchMappings = new HashSet<TicketTypeBatchMapping>();
            TicketTypeScreenBatchMappings = new HashSet<TicketTypeScreenBatchMapping>();
            WorkflowBatchMappings = new HashSet<WorkflowBatchMapping>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string? AvatarUrl { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<TicketTypeBatchMapping> TicketTypeBatchMappings { get; set; }
        public virtual ICollection<TicketTypeScreenBatchMapping> TicketTypeScreenBatchMappings { get; set; }
        public virtual ICollection<WorkflowBatchMapping> WorkflowBatchMappings { get; set; }
    }
}
