using Data.DatabaseContext;
using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories.Administration
{
    public class AdminRepository:IAdminRepository
    {
        readonly Resolve360Context _resolve360Context;
        public AdminRepository(Resolve360Context resolve360Context)
        {
            _resolve360Context = resolve360Context;
        }
        public List<TicketType> GetTicketTypes()
        {
            try
            {
                var ticketTypes = _resolve360Context.TicketTypes.Where(x => x.IsActive == true);
                return ticketTypes.ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }




    }
}
