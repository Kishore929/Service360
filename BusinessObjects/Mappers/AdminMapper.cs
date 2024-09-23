using Entities;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models = Data.Models;

namespace BusinessObjects.Mappers
{
    public class AdminMapper
    {
        public static TicketType GetTicketType(Models.TicketType ticketTypeModel)
        {
            if (ticketTypeModel!=null)
            {
                var ticketType = new TicketType();
                ticketType.Id = ticketTypeModel.Id;
                ticketType.Name = ticketTypeModel.Name;
                ticketType.AvatarUrl = ticketTypeModel.AvatarUrl;
                ticketType.Description = ticketTypeModel.Description;
                return ticketType;
            }
            return null;
        }
        public static List<TicketType> GetTicketTypes(List<Models.TicketType> ticketTypeModels)
        {
            if(ticketTypeModels!=null && ticketTypeModels.Count>0)
            {
                List<TicketType> ticketTypes = new List<TicketType>();
                foreach (var ticketTypeModel in ticketTypeModels)
                {
                    ticketTypes.Add(GetTicketType(ticketTypeModel));
                }
                return ticketTypes;
            }
            return null;
            
        }
        public static Status GetStatus(Models.Status statusModel)
        {
            if (statusModel != null)
            {
                var status = new Status();
                status.Id = statusModel.Id;
                status.Name = statusModel.Name;
                status.StatusCategory = statusModel.StatusCategory;
                return status;
            }
            return null;
        }
        public static List<Status> GetStatuses(List<Models.Status> statusModels)
        {
            if (statusModels != null && statusModels.Count > 0)
            {
                List<Status> statuses = new List<Status>();
                foreach (var statusModel in statusModels)
                {
                    statuses.Add(GetStatus(statusModel));
                }
                return statuses;
            }
            return null;

        }
        public static Resolution GetResolution(Models.Resolution resolutionModel)
        {
            if (resolutionModel != null)
            {
                var resolution = new Resolution();
                resolution.Id = resolutionModel.Id;
                resolution.Name = resolutionModel.Name;
                resolution.Description = resolutionModel.Description;
                return resolution;
            }
            return null;
        }
        public static List<Resolution> GetResolutions(List<Models.Resolution> resolutionModels)
        {
            if (resolutionModels != null && resolutionModels.Count > 0)
            {
                List<Resolution> resolutions = new List<Resolution>();
                foreach (var resolutionModel in resolutionModels)
                {
                    resolutions.Add(GetResolution(resolutionModel));
                }
                return resolutions;
            }
            return null;

        }
        public static Priority GetPriority(Models.Priority priorityModel)
        {
            if (priorityModel != null)
            {
                var priority = new Priority();
                priority.Id = priorityModel.Id;
                priority.Name = priorityModel.Name;
                priority.Description = priorityModel.Description;
                priority.AvatarUrl = priorityModel.AvatarUrl;
                priority.PriorityColorHtmlcode = priorityModel.PriorityColorHtmlcode;
                priority.SequenceNumber = priorityModel.SequenceNumber;
                return priority;
            }
            return null;
        }
        public static List<Priority> GetPriorities(List<Models.Priority> priorityModels)
        {
            if (priorityModels != null && priorityModels.Count > 0)
            {
                List<Priority> priorities = new List<Priority>();
                foreach (var priorityModel in priorityModels)
                {
                    priorities.Add(GetPriority(priorityModel));
                }
                return priorities;
            }
            return null;

        }
        public static ProjectRole GetProjectRole(Models.ProjectRole priorityModel)
        {
            if (priorityModel != null)
            {
                var projectRole = new ProjectRole();
                projectRole.Id = priorityModel.Id;
                projectRole.Name = priorityModel.Name;
                projectRole.Description = priorityModel.Description;
                return projectRole;
            }
            return null;
        }
        public static List<ProjectRole> GetProjectRoles(List<Models.ProjectRole> projectRoleModels)
        {
            if (projectRoleModels != null && projectRoleModels.Count > 0)
            {
                List<ProjectRole> projectRoles = new List<ProjectRole>();
                foreach (var projectRoleModel in projectRoleModels)
                {
                    projectRoles.Add(GetProjectRole(projectRoleModel));
                }
                return projectRoles;
            }
            return null;

        }
    }
}
