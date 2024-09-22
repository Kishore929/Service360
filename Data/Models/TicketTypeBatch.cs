using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class TicketTypeBatch
    {
        public TicketTypeBatch()
        {
            TicketTypeBatchAssociations = new HashSet<TicketTypeBatchAssociation>();
            TicketTypeBatchMappings = new HashSet<TicketTypeBatchMapping>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool IsAssociatedtoAnyProject { get; set; }

        public virtual ICollection<TicketTypeBatchAssociation> TicketTypeBatchAssociations { get; set; }
        public virtual ICollection<TicketTypeBatchMapping> TicketTypeBatchMappings { get; set; }
    }
}
