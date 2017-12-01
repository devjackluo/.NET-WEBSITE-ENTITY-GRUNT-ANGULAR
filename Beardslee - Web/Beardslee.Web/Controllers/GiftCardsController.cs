using Beardslee.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace Beardslee.Web.Controllers
{
    public class GiftCardsController : Controller
    {


        // GET: /GiftCards/
        public ActionResult Index()
        {

            return View();
        }

        /*
        public ActionResult Checkout()
        {

            return View("Checkout");

        }


        public ActionResult Preview()
        {
           
             return View("Preview");

        }

        public ActionResult Receipt()
        {

            return View("Receipt");

        }
        */
    }
}