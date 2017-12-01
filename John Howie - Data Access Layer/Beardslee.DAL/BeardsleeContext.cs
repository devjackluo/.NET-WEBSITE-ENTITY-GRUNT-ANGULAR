using Beardslee.DomainClasses;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Beardslee.DAL
{
    public class BeardsleeContext : DbContext
    {
        public BeardsleeContext() :base("BeardsleeContext")
        {

        }

        public DbSet<Website> Websites { get; set; }


        public DbSet<GiftCardCart> GiftCardCarts { get; set; }

    }
}
