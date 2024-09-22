using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Directory
    {
        public Directory()
        {
            Groups = new HashSet<Group>();
            Users = new HashSet<User>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<Group> Groups { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
