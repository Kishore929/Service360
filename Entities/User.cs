using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class User
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string? LastName { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; } 
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public string? UserProfilePictureUrl { get; set; }
        public bool? IsLicensed { get; set; }
        public string? ActiveToken { get; set; }
        public bool IsPersonalAccessTokenCreated { get; set; }
        public long? DirectoryId { get; set; }

        public virtual Directory? Directory { get; set; }
    }
}
