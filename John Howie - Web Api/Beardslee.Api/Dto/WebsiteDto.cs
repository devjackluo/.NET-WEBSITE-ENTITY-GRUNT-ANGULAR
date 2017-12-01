using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Beardslee.Api.Dto
{
    public class WebsiteDto
    {

        public int WebsiteId { get; set; }

        public string Name { get; set; }

        public string URL { get; set; }

        public List<GiftCardCartDto> GiftCardCarts { get; set; } = new List<GiftCardCartDto>();

    }
}