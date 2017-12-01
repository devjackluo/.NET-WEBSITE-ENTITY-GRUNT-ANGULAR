namespace Beardslee.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class testmoneycolumn : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.GiftCardCarts", "Amount", c => c.Decimal(nullable: false, storeType: "money"));
            AlterColumn("dbo.GiftCardCarts", "ShippingCost", c => c.Decimal(nullable: false, storeType: "money"));
            AlterColumn("dbo.GiftCardCarts", "OrderTotal", c => c.Decimal(nullable: false, storeType: "money"));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.GiftCardCarts", "OrderTotal", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.GiftCardCarts", "ShippingCost", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.GiftCardCarts", "Amount", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
    }
}
