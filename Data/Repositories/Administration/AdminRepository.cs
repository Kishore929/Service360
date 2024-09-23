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
        public List<Status> GetStatuses()
        {
            try
            {
                var statuses = _resolve360Context.Statuses;
                return statuses.ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public List<Resolution> GetResolutions()
        {
            try
            {
                var resolutions = _resolve360Context.Resolutions.Where(x => x.IsActive == true);
                return resolutions.ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public List<Priority> GetPriorities()
        {
            try
            {
                var priorities = _resolve360Context.Priorities.Where(x => x.IsActive == true);
                return priorities.ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public List<ProjectRole> GeProjectRoles()
        {
            try
            {
                var projectRoles = _resolve360Context.ProjectRoles.Where(x => x.IsActive == true);
                return projectRoles.ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }




    }
}
