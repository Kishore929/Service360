using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class ScreenBatch
    {
        public long Id { get; set; }
        public long ScreenId { get; set; }
        public string? Description { get; set; }
        public string? Operation { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

        public virtual Screen Screen { get; set; } = null!;
    }
}
