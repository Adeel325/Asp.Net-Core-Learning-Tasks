using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace WebAPI.Models
{
    public class ApplicationUser: IdentityUser
    {

        public string FullName { get; set; }
        public string Address { get; set; }
        public string LinkedIn { get; set; }
        public string FacebookId { get; set; }
    }
}
