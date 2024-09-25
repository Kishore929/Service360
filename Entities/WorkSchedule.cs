using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class WorkSchedule
    {
        public long Id { get; set; }
        public long WorkingHoursPerDay { get; set; }
        public short NoOfWorkingDaysPerWeek { get; set; }
    }
}
