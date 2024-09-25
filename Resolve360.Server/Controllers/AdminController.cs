using BusinessObjects.Providers;
using Entities;
using Infra.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Resolve360.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminProvider _adminProvider;

        public AdminController(IAdminProvider adminprovider)
        {
            _adminProvider = adminprovider;
        }

        [HttpGet("GetTicketTypes")]
        public ClientResponse<List<TicketType>> GetTicketTypes()
        {
            var ticketTypes = _adminProvider.GetTicketTypes();
            return ticketTypes;

        }

        [HttpGet("GetStatuses")]
        public ClientResponse<List<Status>> GetStatuses()
        {
            var statuses = _adminProvider.GetStatuses();
            return statuses;

        }

        [HttpGet("GetResolutions")]
        public ClientResponse<List<Resolution>> GetResolutions()
        {
            var resolutions = _adminProvider.GetResolutions();
            return resolutions;

        }

        [HttpGet("GetPriorities")]
        public ClientResponse<List<Priority>> GetPriorities()
        {
            var priorities = _adminProvider.GetPriorities();
            return priorities;

        }
        [HttpGet("GetProjectRoles")]
        public ClientResponse<List<ProjectRole>> GetProjectRoles()
        {
            var projectRoles = _adminProvider.GetProjectRoles();
            return projectRoles;

        }

        [HttpGet("GetWorkSchedule")]
        public ClientResponse<WorkSchedule> GetWorkSchedule()
        {
            var workSchedule = _adminProvider.GetWorkSchedule();
            return workSchedule;

        }
        [HttpPost("AddTicketType")]
        public ClientResponse<List<TicketType>> AddTicketType([FromBody] TicketType ticketType)
        {
            var newTicketType = _adminProvider.AddTicketType(ticketType);
            return newTicketType;

        }
        [HttpPut("UpdateTicketType")]
        public ClientResponse<List<TicketType>> UpdateTicketType([FromBody] TicketType ticketType)
        {
            var newTicketType = _adminProvider.UpdateTicketType(ticketType);
            return newTicketType;

        }
        [HttpDelete("DeleteTicketType")]
        public ClientResponse<List<TicketType>> DeleteTicketType(long ticketTypeId)
        {
            var newTicketType = _adminProvider.DeleteTicketType(ticketTypeId);
            return newTicketType;

        }

    }
}
