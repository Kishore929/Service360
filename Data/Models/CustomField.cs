using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class CustomField
    {
        public CustomField()
        {
            CustomFieldOptions = new HashSet<CustomFieldOption>();
            CustomFieldValues = new HashSet<CustomFieldValue>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string Type { get; set; } = null!;
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool IsArchived { get; set; }

        public virtual ICollection<CustomFieldOption> CustomFieldOptions { get; set; }
        public virtual ICollection<CustomFieldValue> CustomFieldValues { get; set; }
    }
}
