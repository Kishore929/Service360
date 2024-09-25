using Data.Models;
using Infra.Base;
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
        public List<ProjectRole> GetProjectRoles();
        public WorkSchedule GetWorkSchedule();
        public bool AddTicketType(TicketType ticketType);
        public TicketType GetTicketType(string ticketTypename);
        public bool UpdateTicketType(TicketType ticketType);
        public TicketType GetTicketType(long ticketTypeId);
        public bool DeleteTicketType(TicketType ticketType);
    }
    
}
