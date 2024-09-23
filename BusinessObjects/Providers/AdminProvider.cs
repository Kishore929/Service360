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

        public ClientResponse<List<Status>> GetStatuses()
        {
            var clientResponse = new ClientResponse<List<Status>>();
            try
            {
                var statuses = _adminRepository.GetStatuses();
                if (statuses != null && statuses.Count>0)
                {
                    clientResponse.Result = AdminMapper.GetStatuses(statuses);
                    if (clientResponse.Result != null)
                    {
                        clientResponse = UpdateClientResponse(clientResponse, EResponseStatus.Success);
                        clientResponse.Message = "Statuses fetched succesfully";
                    }
                    else
                    {
                        clientResponse = UpdateClientResponse(clientResponse, EResponseStatus.Failed);
                        clientResponse.Message = "Fetching Statuses failed, Please check logs";
                    }
                    return clientResponse;

                }
                else
                {
                    clientResponse = UpdateClientResponse(clientResponse, EResponseStatus.Failed);
                    clientResponse.Message = "Fetching Statuses from DB failed, Please check db queries";
                }
                return clientResponse;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public ClientResponse<List<Resolution>> GetResolutions()
        {
            var clientResponse = new ClientResponse<List<Resolution>>();
            try
            {
                var resolutions = _adminRepository.GetResolutions();
                if (resolutions != null && resolutions.Count > 0)
                {
                    clientResponse.Result = AdminMapper.GetResolutions(resolutions);
                    if (clientResponse.Result != null)
                    {
                        clientResponse = UpdateClientResponse(clientResponse, EResponseStatus.Success);
                        clientResponse.Message = "Resolutions fetched succesfully";
                    }
                    else
                    {
                        clientResponse = UpdateClientResponse(clientResponse, EResponseStatus.Failed);
                        clientResponse.Message = "Fetching Resolutions failed, Please check logs";
                    }
                    return clientResponse;

                }
                else
                {
                    clientResponse = UpdateClientResponse(clientResponse, EResponseStatus.Failed);
                    clientResponse.Message = "Fetching Resolutions from DB failed, Please check db queries";
                }
                return clientResponse;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public ClientResponse<List<Priority>> GetPriorities()
        {
            var clientResponse = new ClientResponse<List<Priority>>();
            try
            {
                var priorities = _adminRepository.GetPriorities();
                if (priorities != null && priorities.Count > 0)
                {
                    clientResponse.Result = AdminMapper.GetPriorities(priorities);
                    if (clientResponse.Result != null)
                    {
                        clientResponse = UpdateClientResponse(clientResponse, EResponseStatus.Success);
                        clientResponse.Message = "Priorities fetched succesfully";
                    }
                    else
                    {
                        clientResponse = UpdateClientResponse(clientResponse, EResponseStatus.Failed);
                        clientResponse.Message = "Fetching Priorities failed, Please check logs";
                    }
                    return clientResponse;

                }
                else
                {
                    clientResponse = UpdateClientResponse(clientResponse, EResponseStatus.Failed);
                    clientResponse.Message = "Fetching Priorities from DB failed, Please check db queries";
                }
                return clientResponse;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public ClientResponse<List<ProjectRole>> GetProjectRoles()
        {
            var clientResponse = new ClientResponse<List<ProjectRole>>();
            try
            {
                var projectRoles = _adminRepository.GeProjectRoles();
                if (projectRoles != null && projectRoles.Count > 0)
                {
                    clientResponse.Result = AdminMapper.GetProjectRoles(projectRoles);
                    if (clientResponse.Result != null)
                    {
                        clientResponse = UpdateClientResponse(clientResponse, EResponseStatus.Success);
                        clientResponse.Message = "ProjectRoles fetched succesfully";
                    }
                    else
                    {
                        clientResponse = UpdateClientResponse(clientResponse, EResponseStatus.Failed);
                        clientResponse.Message = "Fetching ProjectRoles failed, Please check logs";
                    }
                    return clientResponse;

                }
                else
                {
                    clientResponse = UpdateClientResponse(clientResponse, EResponseStatus.Failed);
                    clientResponse.Message = "Fetching ProjectRoles from DB failed, Please check db queries";
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
