using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Base
{
    public class EntityBase
    {
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool? IsActive { get; set; }
    }
}
