using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories.Administration
{
    public interface IAdminRepository
    {
        public List<TicketType> GetTicketTypes();
        public List<Status> GetStatuses();
        public List<Resolution> GetResolutions();
        public List<Priority> GetPriorities();
        public List<ProjectRole> GeProjectRoles();
    }
    
}
