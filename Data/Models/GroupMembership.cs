using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class GroupMembership
    {
        public long Id { get; set; }
        public long GroupId { get; set; }
        public long UserId { get; set; }
        public DateTime Created { get; set; }

        public virtual Group Group { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
