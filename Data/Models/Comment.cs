using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Comment
    {
        public long Id { get; set; }
        public long TicketId { get; set; }
        public string CommentBody { get; set; } = null!;
        public long CommentedBy { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

        public virtual User CommentedByNavigation { get; set; } = null!;
        public virtual Ticket Ticket { get; set; } = null!;
    }
}
