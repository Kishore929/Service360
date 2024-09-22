using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Context
    {
        public Context()
        {
            ContextValues = new HashSet<ContextValue>();
            CustomFieldOptions = new HashSet<CustomFieldOption>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string Type { get; set; } = null!;
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool IsActive { get; set; }

        public virtual ICollection<ContextValue> ContextValues { get; set; }
        public virtual ICollection<CustomFieldOption> CustomFieldOptions { get; set; }
    }
}
