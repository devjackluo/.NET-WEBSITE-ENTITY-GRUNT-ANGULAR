using Beardslee.DomainClasses;
using JohnHowie.DAL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Beardslee.DAL.Services
{
    public class WebsiteService : BaseTableService<BeardsleeContext, Website>
    {
        public WebsiteService(BeardsleeContext context) : base(context)
        {

        }
    }
}
