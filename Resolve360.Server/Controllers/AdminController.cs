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
    }
}
