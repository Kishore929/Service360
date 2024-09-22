using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class WorkSchedule
    {
        public long Id { get; set; }
        public long WorkingHoursPerDay { get; set; }
        public short NoOfWorkingDaysPerWeek { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
    }
}
