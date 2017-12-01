using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Beardslee.DomainClasses
{
    [Table("GiftCardCarts")]
    public class GiftCardCart
    {

        //I was already done.

        [Key]
        public int GiftCardCartId { get; set; }

        public int WebsiteId { get; set; }

        [Required]
        [MaxLength(50)]
        public string UniqueIdentifier { get; set; }
        [Required]
        public int Status { get; set; }

        public string History { get; set; }
        [Required]
        [Column(TypeName = "Money")]
        public decimal Amount { get; set; }
        [Column(TypeName = "Money")]
        public decimal ShippingCost { get; set; }

        public int ShippingType { get; set; }
        public bool ShippingValidation { get; set; }

        [MaxLength(100)]
        public string ShippingFirstName { get; set; }
        [MaxLength(100)]
        public string ShippingLastName { get; set; }
        [MaxLength(250)]
        public string ShippingAddress1 { get; set; }
        [MaxLength(250)]
        public string ShippingAddress2 { get; set; }
        [MaxLength(100)]
        public string ShippingCity { get; set; }
        [MaxLength(10)]
        public string ShippingState { get; set; }
        [MaxLength(20)]
        public string ShippingPostalCode { get; set; }
        [MaxLength(20)]
        public string ShippingPhone { get; set; }
        [MaxLength(250)]
        public string ShippingEmail { get; set; }


        [MaxLength(100)]
        public string BillingFirstName { get; set; }
        [MaxLength(100)]
        public string BillingLastName { get; set; }
        [MaxLength(250)]
        public string BillingAddress1 { get; set; }
        [MaxLength(250)]
        public string BillingAddress2 { get; set; }
        [MaxLength(100)]
        public string BillingCity { get; set; }
        [MaxLength(10)]
        public string BillingState { get; set; }
        [MaxLength(20)]
        public string BillingPostalCode { get; set; }
        [MaxLength(20)]
        public string BillingPhone { get; set; }
        [MaxLength(250)]
        public string BillingEmail { get; set; }

        [MaxLength(100)]
        public string AuthorizationCode { get; set; }
        [MaxLength(100)]
        public string TransactionID { get; set; }
        public DateTime CreatedOn { get; set; }

        public DateTime PurchasedOn { get; set; }
        public string Message { get; set; }

        public string SpecialInstructions { get; set; }
        [Column(TypeName = "Money")]
        public decimal OrderTotal { get; set; }
        [MaxLength(50)]
        public string CreditCardType { get; set; }



        [ForeignKey("WebsiteId")]
        public virtual Website Website { get; set; }
    }
}
