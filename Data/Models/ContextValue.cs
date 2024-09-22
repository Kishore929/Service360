using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class ContextValue
    {
        public ContextValue()
        {
            CustomFieldOptionChildValues = new HashSet<CustomFieldOption>();
            CustomFieldOptionParentValues = new HashSet<CustomFieldOption>();
        }

        public long Id { get; set; }
        public long ContextId { get; set; }
        public string ParentValue { get; set; } = null!;
        public string? ChildValue { get; set; }
        public string? Xmlorjson { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool IsActive { get; set; }

        public virtual Context Context { get; set; } = null!;
        public virtual ICollection<CustomFieldOption> CustomFieldOptionChildValues { get; set; }
        public virtual ICollection<CustomFieldOption> CustomFieldOptionParentValues { get; set; }
    }
}
