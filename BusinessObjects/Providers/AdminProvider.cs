using BusinessObjects.Mappers;
using Data.Repositories.Administration;
using Data.Repositories.Authentication;
using Entities;
using Infra.Base;
using Infra.Enums;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects.Providers
{
    public class AdminProvider : ProviderBase, IAdminProvider
    {
        private readonly IAdminRepository _adminRepository;


        public AdminProvider(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }
        public ClientResponse<List<TicketType>> GetTicketTypes()
        {
            var clientResponse = new ClientResponse<List<TicketType>>();
            try
            {
                var ticketTypes = _adminRepository.GetTicketTypes();
                if (ticketTypes != null)
                {
                    clientResponse.Result = AdminMapper.GetTicketTypes(ticketTypes);
                    if (clientResponse.Result != null)
                    {
                        clientResponse = UpdateClientResponse(clientResponse, EResponseStatus.Success);
                        clientResponse.Message = "Ticket Types fetched succesfully";
                    }
                    else
                    {
                        clientResponse = UpdateClientResponse(clientResponse, EResponseStatus.Failed);
                        clientResponse.Message = "Fetching Ticket Types failed, Please check logs";
                    }
                    return clientResponse;

                }
                else
                {
                    clientResponse = UpdateClientResponse(clientResponse, EResponseStatus.Failed);
                    clientResponse.Message = "Fetching Ticket Types from DB failed, Please check db queries";
                }
                return clientResponse;

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
