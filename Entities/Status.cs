using Infra.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Status
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string StatusCategory { get; set; } = StatusCategoryHelper.toDo;
    }
}
