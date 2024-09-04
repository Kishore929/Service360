using BusinessObjects.Mappers;
using Data.Repositories.Authentication;
using Entities;
using Infra.Base;
using Infra.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects.Providers
{
    public class AuthProvider : ProviderBase, IAuthProvider
    {
        readonly IAuthRepository _authRepository;
        public AuthProvider(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }
        public ClientResponse<User> RegisterUser(User user)
        {
            var clientResponse = new ClientResponse<User>();

            try
            {
                var searchUser = _authRepository.SearchUser(user.Email);
                if (searchUser == null)
                {
                    if (user.Id == 0)
                    {
                        var inUserModel = AuthMapper.RegisterUserModel(user);
                        if (inUserModel != null)
                        {
                            var outUserModel = _authRepository.RegisterUser(inUserModel);
                            if (outUserModel != null)
                            {
                                clientResponse.Result = AuthMapper.RegisterUser(outUserModel);
                                if (clientResponse.Result != null)
                                {
                                    //Success 
                                    clientResponse = UpdateClientResponse(clientResponse, EResponseStatus.Success);
                                    clientResponse.Message = "Resgistration Successfull, Please proceed to login";
                                }
                                else
                                {
                                    clientResponse.Message = "Registering failed...try again!!!!";
                                }

                            }
                        }
                    }
                    else
                    {
                        clientResponse.Message = "invalid user details...try again!!!!";
                        //return null;
                    }
                    

                       
                }
                else
                {
                    clientResponse.Message = $"user exist with {user.Email} email address ...try again with different email address!!!!";
                }
                return clientResponse;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public ClientResponse<User> LoginUser(User user)
        {
            var clientResponse = new ClientResponse<User>();
            try
            {
                var searchUser = _authRepository.SearchUser(user.Email,user.UserName);
                if(searchUser != null)
                {
                    var userDetails = _authRepository.SearchUser(user.Email, user.UserName, user.PasswordHash);
                    if(userDetails!=null)
                    {
                        clientResponse.Result = AuthMapper.RegisterUser(userDetails);
                        if (clientResponse.Result != null)
                        {
                            //Success 
                            clientResponse = UpdateClientResponse(clientResponse, EResponseStatus.Success);
                            clientResponse.Message = "Login Successfull";
                        }
                        
                    }
                    else
                    {
                        clientResponse.Message = "Incorrect username/password";
                    }
                }
                else
                {
                    clientResponse.Message = "User doesn't exist , please resgister first!!! ";
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
