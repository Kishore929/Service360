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
    }
}
