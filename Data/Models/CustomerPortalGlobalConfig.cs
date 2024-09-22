using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class CustomerPortalGlobalConfig
    {
        public long Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public string? PortalLogoUrl { get; set; }
        public string? PortalCoverLogoUrl { get; set; }
        public string? Announcement { get; set; }
        public string? HeaderHtml { get; set; }
        public string? FooterHtml { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
    }
}
