using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Screen
    {
        public Screen()
        {
            ScreenBatches = new HashSet<ScreenBatch>();
            ScreenContents = new HashSet<ScreenContent>();
            TicketTypeScreenBatchMappings = new HashSet<TicketTypeScreenBatchMapping>();
            Transitions = new HashSet<Transition>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool IsAssociatedToAnyBatch { get; set; }

        public virtual ICollection<ScreenBatch> ScreenBatches { get; set; }
        public virtual ICollection<ScreenContent> ScreenContents { get; set; }
        public virtual ICollection<TicketTypeScreenBatchMapping> TicketTypeScreenBatchMappings { get; set; }
        public virtual ICollection<Transition> Transitions { get; set; }
    }
}
