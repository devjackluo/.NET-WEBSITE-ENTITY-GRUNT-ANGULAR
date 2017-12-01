namespace Beardslee.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddBeardsleeWebistesandGiftCardCartsTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GiftCardCarts",
                c => new
                    {
                        GiftCardCartId = c.Int(nullable: false, identity: true),
                        WebsiteId = c.Int(nullable: false),
                        UniqueIdentifier = c.String(nullable: false, maxLength: 50),
                        Status = c.Int(nullable: false),
                        History = c.String(),
                        Amount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        ShippingCost = c.Decimal(nullable: false, precision: 18, scale: 2),
                        ShippingType = c.Int(nullable: false),
                        ShippingValidation = c.Boolean(nullable: false),
                        ShippingFirstName = c.String(maxLength: 100),
                        ShippingLastName = c.String(maxLength: 100),
                        ShippingAddress1 = c.String(maxLength: 250),
                        ShippingAddress2 = c.String(maxLength: 250),
                        ShippingCity = c.String(maxLength: 100),
                        ShippingState = c.String(maxLength: 10),
                        ShippingPostalCode = c.String(maxLength: 20),
                        ShippingPhone = c.String(maxLength: 20),
                        ShippingEmail = c.String(maxLength: 250),
                        BillingFirstName = c.String(maxLength: 100),
                        BillingLastName = c.String(maxLength: 100),
                        BillingAddress1 = c.String(maxLength: 250),
                        BillingAddress2 = c.String(maxLength: 250),
                        BillingCity = c.String(maxLength: 100),
                        BillingState = c.String(maxLength: 10),
                        BillingPostalCode = c.String(maxLength: 20),
                        BillingPhone = c.String(maxLength: 20),
                        BillingEmail = c.String(maxLength: 250),
                        AuthorizationCode = c.String(maxLength: 100),
                        TransactionID = c.String(maxLength: 100),
                        CreatedOn = c.DateTime(nullable: false),
                        PurchasedOn = c.DateTime(nullable: false),
                        Message = c.String(),
                        SpecialInstructions = c.String(),
                        OrderTotal = c.Decimal(nullable: false, precision: 18, scale: 2),
                        CreditCardType = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.GiftCardCartId)
                .ForeignKey("dbo.Websites", t => t.WebsiteId, cascadeDelete: true)
                .Index(t => t.WebsiteId);
            
            CreateTable(
                "dbo.Websites",
                c => new
                    {
                        WebsiteId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 100),
                        URL = c.String(nullable: false, maxLength: 300),
                    })
                .PrimaryKey(t => t.WebsiteId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.GiftCardCarts", "WebsiteId", "dbo.Websites");
            DropIndex("dbo.GiftCardCarts", new[] { "WebsiteId" });
            DropTable("dbo.Websites");
            DropTable("dbo.GiftCardCarts");
        }
    }
}
