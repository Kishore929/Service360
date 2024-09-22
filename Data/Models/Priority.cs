using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Priority
    {
        public Priority()
        {
            PriorityBatchMappings = new HashSet<PriorityBatchMapping>();
            Tickets = new HashSet<Ticket>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string? AvatarUrl { get; set; }
        public string? PriorityColorHtmlcode { get; set; }
        public long SequenceNumber { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<PriorityBatchMapping> PriorityBatchMappings { get; set; }
        public virtual ICollection<Ticket> Tickets { get; set; }
    }
}
