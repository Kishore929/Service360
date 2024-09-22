using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class PostFunctionType
    {
        public PostFunctionType()
        {
            Postfunctions = new HashSet<Postfunction>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string? Parameters { get; set; }
        public DateTime Created { get; set; }

        public virtual ICollection<Postfunction> Postfunctions { get; set; }
    }
}
