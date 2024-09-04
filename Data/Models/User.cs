using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class User
    {
        public long Id { get; set; }
        public string UserName { get; set; } 
        public string PasswordHash { get; set; }
        public string Email { get; set; }
    }
}
