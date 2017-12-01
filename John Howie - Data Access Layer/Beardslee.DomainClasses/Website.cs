using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Beardslee.DomainClasses
{
    [Table("Websites")]
    public class Website
    {
        [Key]
        public int WebsiteId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(300)]
        public string URL { get; set; }

        public virtual ICollection<GiftCardCart> GiftCardCarts { get; set; }
    }
}
