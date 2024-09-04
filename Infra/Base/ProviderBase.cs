using Infra.Enums;
using Infra.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Base
{
    public abstract class ProviderBase : IProviderBase
    {
        protected ClientResponse<T> UpdateClientResponse<T>(ClientResponse<T> clientResponse, EResponseStatus eResponseStatus)
        {
            clientResponse.IsSuccess = eResponseStatus;
            clientResponse.Message = eResponseStatus == EResponseStatus.Failed ? "Failed!" : "Success!";
            return clientResponse;
        }
    }
}
