using BusinessObjects.Mappers;
using Data.Repositories.Authentication;
using Entities;
using Infra.Base;
using Infra.Enums;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects.Providers
{
    public class AuthProvider : ProviderBase, IAuthProvider
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration; 

        
        public AuthProvider(IAuthRepository authRepository, IConfiguration configuration)
        {
            _authRepository = authRepository;
            _configuration = configuration;
        }
        public ClientResponse<User> RegisterUser(User user)
        {
            var clientResponse = new ClientResponse<User>();

            try
            {
                var searchUser = _authRepository.SearchUser(user.EmailAddress);
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
                                    clientResponse.Message = "Registration Successfull, Please proceed to login";
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
                    clientResponse.Message = $"user exist with {user.EmailAddress} email address ...try again with different email address!!!!";
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
                var searchUser = _authRepository.SearchUser(user.EmailAddress,user.UserName);
                if(searchUser != null)
                {
                    var userDetails = _authRepository.SearchUser(user.EmailAddress, user.UserName, user.Password);
                    if(userDetails!=null)
                    {

                        clientResponse.Result = AuthMapper.RegisterUser(userDetails);
                        clientResponse.Result.ActiveToken = GenerateToken(user);
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
        private string GenerateToken(User user)
        {
            // Read JWT settings from configuration
            
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings["SecretKey"];
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];

            // Create key and credentials for signing the token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Define claims
            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            new Claim(JwtRegisteredClaimNames.Email, user.EmailAddress),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            // Create JWT token object
            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            // Generate the token string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
