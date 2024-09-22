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
                ticketType.Created=ticketTypeModel.Created;
                ticketType.Updated=ticketTypeModel.Updated;
                ticketType.IsActive=ticketTypeModel.IsActive;
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
    }
}
