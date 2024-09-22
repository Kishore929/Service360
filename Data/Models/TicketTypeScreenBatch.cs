using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class TicketTypeScreenBatch
    {
        public TicketTypeScreenBatch()
        {
            TicketTypeScreenBatchProjectMappings = new HashSet<TicketTypeScreenBatchProjectMapping>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string Type { get; set; } = null!;
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool IsAssociatedToAnyProject { get; set; }

        public virtual ICollection<TicketTypeScreenBatchProjectMapping> TicketTypeScreenBatchProjectMappings { get; set; }
    }
}
