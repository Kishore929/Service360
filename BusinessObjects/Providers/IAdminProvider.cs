using Entities;
using Infra.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects.Providers
{
    public interface IAdminProvider
    {
        public ClientResponse<List<TicketType>> GetTicketTypes();
        public ClientResponse<List<Status>> GetStatuses();
        public ClientResponse<List<Resolution>> GetResolutions();
        public ClientResponse<List<Priority>> GetPriorities();
        public ClientResponse<List<ProjectRole>> GetProjectRoles();
    }
}
