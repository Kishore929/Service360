using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class ScreenContent
    {
        public long Id { get; set; }
        public long ScreenId { get; set; }
        public long SequenceInScreen { get; set; }
        public long FieldId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

        public virtual Screen Screen { get; set; } = null!;
    }
}
