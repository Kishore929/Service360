using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class ProjectRole
    {
        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool? IsActive { get; set; }
    }
}
