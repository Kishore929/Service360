using Data.DatabaseContext;
using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories.Administration
{
    public class AdminRepository : IAdminRepository
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

        public List<ProjectRole> GetProjectRoles()
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
        public WorkSchedule GetWorkSchedule()
        {
            try
            {
                var workSchedule = _resolve360Context.WorkSchedules.FirstOrDefault();
                return workSchedule;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public bool AddTicketType(TicketType ticketType)
        {
            try
            {
                var addedTicketType = _resolve360Context.Add(ticketType);
                int count = _resolve360Context.SaveChanges();
                if (count > 0)
                {
                    return true;
                }
                return false;
                
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public TicketType GetTicketType(string ticketTypename)
        {
            try
            {
                var ticketType = _resolve360Context.TicketTypes.Where(x => x.Name.ToLower() == ticketTypename.ToLower()).FirstOrDefault();
                return ticketType;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public bool UpdateTicketType(TicketType ticketType)
        {
            try
            {
                var existingTicketType = GetTicketType(ticketType.Id);
                if (existingTicketType == null)
                {
                    return false; // Return false if TicketType doesn't exist
                }
                // Preserve the Created field from the existing ticket
                ticketType.Created = existingTicketType.Created;
                // Attach the existing entity and update only the modified fields
                _resolve360Context.Entry(existingTicketType).CurrentValues.SetValues(ticketType);
                int count = _resolve360Context.SaveChanges();
                if(count > 0)
                {
                    return true;
                }
                return false;

            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public TicketType GetTicketType(long ticketTypeId)
        {
            try
            {
                var ticketType = _resolve360Context.TicketTypes.Where(x => x.Id == ticketTypeId).FirstOrDefault();
                return ticketType;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public bool DeleteTicketType(TicketType ticketType)
        {
            try
            {
                var deletedTicketType = _resolve360Context.Remove(ticketType);
                int count = _resolve360Context.SaveChanges();
                if (count > 0)
                {
                    return true;
                }
                return false;
                
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }




    }
}
