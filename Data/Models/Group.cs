using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Group
    {
        public Group()
        {
            GroupMemberships = new HashSet<GroupMembership>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public long DirectoryId { get; set; }
        public bool? IsActive { get; set; }
        public bool IsLicenseProvider { get; set; }
        public bool IsAdminProvider { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

        public virtual Directory Directory { get; set; } = null!;
        public virtual ICollection<GroupMembership> GroupMemberships { get; set; }
    }
}
