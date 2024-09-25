using Infra.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class TicketType:EntityBase
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? AvatarUrl { get; set; }
    }
}
