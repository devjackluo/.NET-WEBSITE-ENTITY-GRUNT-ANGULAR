using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Beardslee.DAL.Services;
using Beardslee.DAL;
using System.Data.Entity;
using System.Threading.Tasks;
using Beardslee.DomainClasses;
using Beardslee.Api.Dto;
using System.Text.RegularExpressions;

namespace Beardslee.Api.Controllers
{
    [RoutePrefix("GiftCard")]
    public class GiftCartController : ApiController
    {
        public HttpResponseException ResponseException(HttpStatusCode httpStatusCode, string message)
        {
            return new HttpResponseException(Request.CreateErrorResponse(httpStatusCode, message));
        }





        // I was already done.











        //################################################## Not needed but I wanted to use it to test.


            /*
        //Add an new website

        [Route("website")]
        [HttpPost]
        public async Task<IHttpActionResult> Website([FromBody] WebsiteDto websiteDto)
        {

            //check exceptions
            if (String.IsNullOrEmpty(websiteDto.URL))
            {
                throw ResponseException(HttpStatusCode.NotAcceptable, "Missing First Name");
            }

            if (String.IsNullOrEmpty(websiteDto.Name))
            {
                throw ResponseException(HttpStatusCode.NotAcceptable, "Missing Last Name");
            }


            var websiteService = new WebsiteService(new BeardsleeContext());
            var website = await websiteService.AddAsync(new Websites
            {
                Name = websiteDto.Name,
                URL = websiteDto.URL
            });

            websiteDto.WebsiteId = website.WebsiteId;

            return Ok(websiteDto);

        }
        */


        //##################################################



        //return an cart by unique iden
        [Route("{uniqueIdentifier}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetByCartUniqueIdentifier(string uniqueIdentifier)
        {
            var giftcardService = new GiftCardCartService(new BeardsleeContext());
            var giftCardCart = await giftcardService.Query().FirstOrDefaultAsync(g => g.UniqueIdentifier == uniqueIdentifier);
          
            if (giftCardCart == null)
            {
                throw ResponseException(HttpStatusCode.NotFound, "Cart Not Found");
            }

            
            var giftCardCartDto = new GiftCardCartDto
            {
                GiftCardCartId = giftCardCart.GiftCardCartId,
                UniqueIdentifier = giftCardCart.UniqueIdentifier,
                Status = giftCardCart.Status,
                History = giftCardCart.History,
                Amount = giftCardCart.Amount,
                ShippingCost = giftCardCart.ShippingCost,
                ShippingType = giftCardCart.ShippingType,
                ShippingValidation = giftCardCart.ShippingValidation,
                ShippingFirstName = giftCardCart.ShippingFirstName,
                ShippingLastName = giftCardCart.ShippingLastName,
                ShippingAddress1 = giftCardCart.ShippingAddress1,
                ShippingAddress2 = giftCardCart.ShippingAddress2,
                ShippingCity = giftCardCart.ShippingCity,
                ShippingState = giftCardCart.ShippingState,
                ShippingPostalCode = giftCardCart.ShippingPostalCode,
                ShippingPhone = giftCardCart.ShippingPhone,
                ShippingEmail = giftCardCart.ShippingEmail,
                BillingFirstName = giftCardCart.BillingFirstName,
                BillingLastName = giftCardCart.BillingLastName,
                BillingAddress1 = giftCardCart.BillingAddress1,
                BillingAddress2 = giftCardCart.BillingAddress2,
                BillingCity = giftCardCart.BillingCity,
                BillingState = giftCardCart.BillingState,
                BillingPostalCode = giftCardCart.BillingPostalCode,
                BillingPhone = giftCardCart.BillingPhone,
                BillingEmail = giftCardCart.BillingEmail,
                AuthorizationCode = giftCardCart.AuthorizationCode,
                TransactionID = giftCardCart.TransactionID,
                CreatedOn = giftCardCart.CreatedOn,
                PurchasedOn = giftCardCart.PurchasedOn,
                Message = giftCardCart.Message,
                SpecialInstructions = giftCardCart.SpecialInstructions,
                OrderTotal = giftCardCart.OrderTotal,
                CreditCardType = giftCardCart.CreditCardType

            };
            

            //return giftCardCartDto;

            return Ok(giftCardCartDto);

        }


    

        //creates an giftcardDTO when they enter an amount and and populates it with random info for now...
        [Route("create/{websiteId}")]
        [HttpPost]
        public async Task<IHttpActionResult> createGiftCardCart(int websiteId, [FromBody] GiftCardCartDto giftDto)
        {
            var websiteService = new WebsiteService(new BeardsleeContext());
            var website = await websiteService.Query().Where(w => w.WebsiteId == websiteId).FirstOrDefaultAsync();

            if (website == null)
            {
                return NotFound();
            }


            var giftService = new GiftCardCartService(new BeardsleeContext());

            Regex moneyRegEx = new Regex(@"^\d{1,3}(\.\d{1,2})?$");

            //check exceptions
            if (giftDto.Amount <= 0 || giftDto.Amount < 25 || giftDto.Amount > 500 || !moneyRegEx.Match(giftDto.Amount.ToString()).Success)
            {
                throw ResponseException(HttpStatusCode.NotAcceptable, "Invalid Value");
            }


            var giftCart = await giftService.AddAsync(new GiftCardCart
            {
                //UniqueIdentifier = "UniqueIden",
                UniqueIdentifier = Guid.NewGuid().ToString(),
                WebsiteId = websiteId,
                Status = 0,
                History = null,
                Amount = Math.Round(giftDto.Amount, 2),
                ShippingCost = 0,
                ShippingType = 0,
                ShippingValidation = true,
                ShippingFirstName = null,
                ShippingLastName = null,
                ShippingAddress1 = null,
                ShippingAddress2 = null,
                ShippingCity = null,
                ShippingState = null,
                ShippingPostalCode = null,
                ShippingPhone = null,
                ShippingEmail = null,
                BillingFirstName = null,
                BillingLastName = null,
                BillingAddress1 = null,
                BillingAddress2 = null,
                BillingCity = null,
                BillingState = null,
                BillingPostalCode = null,
                BillingPhone = null,
                BillingEmail = null,
                AuthorizationCode = null,
                TransactionID = null,
                CreatedOn = DateTime.Now,
                PurchasedOn = DateTime.Now,
                Message = null,
                SpecialInstructions = null,
                OrderTotal = 0,
                CreditCardType = null
            });

            giftDto.GiftCardCartId = giftCart.GiftCardCartId;
            giftDto.UniqueIdentifier = giftCart.UniqueIdentifier;

            return Ok(giftDto);

        }



        // do updates in the checkout section
        [Route("checkout")]
        [HttpPut]
        public async Task<IHttpActionResult> CheckoutPageUpdate([FromBody] GiftCardCartDto giftDto)
        {

            var giftService = new GiftCardCartService(new BeardsleeContext());
            var giftCardCart = await giftService.Query().Where(g => g.UniqueIdentifier == giftDto.UniqueIdentifier).FirstOrDefaultAsync();

            if (giftCardCart == null)
            {
                //throw ResponseException(HttpStatusCode.NotFound, "Person Not Found");
                return NotFound();
            }

            Regex emailRegEx = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
            if (!emailRegEx.Match(giftDto.BillingEmail).Success)
            {
                throw ResponseException(HttpStatusCode.NotAcceptable, "Invalid Email.");
            }


            if (giftDto.ShippingCost >= 0)
            {
                giftCardCart.ShippingCost = Math.Round(giftDto.ShippingCost, 2);
            }

            if (giftDto.ShippingType >= 0)
            {
                giftCardCart.ShippingType = giftDto.ShippingType;
            }




            if (!String.IsNullOrEmpty(giftDto.ShippingFirstName))
            {
                giftCardCart.ShippingFirstName = giftDto.ShippingFirstName;
            }


            if (!String.IsNullOrEmpty(giftDto.ShippingLastName))
            {
                giftCardCart.ShippingLastName = giftDto.ShippingLastName;
            }

            if (!String.IsNullOrEmpty(giftDto.ShippingAddress1))
            {
                giftCardCart.ShippingAddress1 = giftDto.ShippingAddress1;
            }

            if (!String.IsNullOrEmpty(giftDto.ShippingAddress2))
            {
                giftCardCart.ShippingAddress1 = giftDto.ShippingAddress2;
            }

            if (!String.IsNullOrEmpty(giftDto.ShippingCity))
            {
                giftCardCart.ShippingCity = giftDto.ShippingCity;
            }

            if (!String.IsNullOrEmpty(giftDto.ShippingState))
            {
                giftCardCart.ShippingState = giftDto.ShippingState;
            }


            if (!String.IsNullOrEmpty(giftDto.ShippingPostalCode))
            {
                giftCardCart.ShippingPostalCode = giftDto.ShippingPostalCode;
            }


            if (!String.IsNullOrEmpty(giftDto.ShippingPhone))
            {
                giftCardCart.ShippingPhone = giftDto.ShippingPhone;
            }


            if (!String.IsNullOrEmpty(giftDto.ShippingEmail))
            {
                giftCardCart.ShippingEmail = giftDto.ShippingEmail;
            }








            if (!String.IsNullOrEmpty(giftDto.BillingFirstName))
            {
                giftCardCart.BillingFirstName = giftDto.BillingFirstName;
            }


            if (!String.IsNullOrEmpty(giftDto.BillingLastName))
            {
                giftCardCart.BillingLastName = giftDto.BillingLastName;
            }

            if (!String.IsNullOrEmpty(giftDto.BillingAddress1))
            {
                giftCardCart.BillingAddress1 = giftDto.BillingAddress1;
            }

            if (!String.IsNullOrEmpty(giftDto.BillingAddress2))
            {
                giftCardCart.BillingAddress1 = giftDto.BillingAddress2;
            }

            if (!String.IsNullOrEmpty(giftDto.BillingCity))
            {
                giftCardCart.BillingCity = giftDto.BillingCity;
            }

            if (!String.IsNullOrEmpty(giftDto.BillingState))
            {
                giftCardCart.BillingState = giftDto.BillingState;
            }


            if (!String.IsNullOrEmpty(giftDto.BillingPostalCode))
            {
                giftCardCart.BillingPostalCode = giftDto.BillingPostalCode;
            }


            if (!String.IsNullOrEmpty(giftDto.BillingPhone))
            {
                giftCardCart.BillingPhone = giftDto.BillingPhone;
            }



            
            if (!String.IsNullOrEmpty(giftDto.BillingEmail))
            {
                giftCardCart.BillingEmail = giftDto.BillingEmail;
            }






            if (!String.IsNullOrEmpty(giftDto.Message))
            {
                giftCardCart.Message = giftDto.Message;
            }


            if (!String.IsNullOrEmpty(giftDto.SpecialInstructions))
            {
                giftCardCart.SpecialInstructions = giftDto.SpecialInstructions;
            }





            if (giftDto.OrderTotal >= 0)
            {
                giftCardCart.OrderTotal = Math.Round(giftDto.OrderTotal, 2);
            }




            await giftService.UpdateAsync(giftCardCart, giftCardCart.GiftCardCartId);

            return Ok();

        }







        // do some updates in the preview section.

        [Route("preview")]
        [HttpPut]
        public async Task<IHttpActionResult> PreviewPageUpdate([FromBody] GiftCardCartDto giftDto)
        {

            var giftService = new GiftCardCartService(new BeardsleeContext());
            var giftCardCart = await giftService.Query().Where(g => g.UniqueIdentifier == giftDto.UniqueIdentifier).FirstOrDefaultAsync();

            if (giftCardCart == null)
            {
                //throw ResponseException(HttpStatusCode.NotFound, "Person Not Found");
                return NotFound();
            }


            Random random = new Random();
            int randomNumber = random.Next(0, 100);

            if(randomNumber % 10 == 0)
            {
                throw ResponseException(HttpStatusCode.BadRequest, "Failed Payment");
            }

         
            giftCardCart.PurchasedOn = DateTime.Now;

            giftCardCart.Status = 1;

            if (giftDto.CreditCardType != null)
            {
                giftCardCart.CreditCardType = giftDto.CreditCardType;
            }


            //giftCardCart.UniqueIdentifier = null;


            await giftService.UpdateAsync(giftCardCart, giftCardCart.GiftCardCartId);

            return Ok();

        }



    }
}
