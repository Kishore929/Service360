using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class CustomFieldOption
    {
        public CustomFieldOption()
        {
            CustomFieldValues = new HashSet<CustomFieldValue>();
        }

        public long Id { get; set; }
        public long ContextId { get; set; }
        public long CustomFieldId { get; set; }
        public long ParentValueId { get; set; }
        public long? ChildValueId { get; set; }
        public long? Xmlorjsonid { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool? IsEnabled { get; set; }

        public virtual ContextValue? ChildValue { get; set; }
        public virtual Context Context { get; set; } = null!;
        public virtual CustomField CustomField { get; set; } = null!;
        public virtual ContextValue ParentValue { get; set; } = null!;
        public virtual ICollection<CustomFieldValue> CustomFieldValues { get; set; }
    }
}
