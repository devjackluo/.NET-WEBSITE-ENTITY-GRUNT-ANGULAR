using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Beardslee.Web.Controllers
{
    public class MailingListController : Controller
    {
        // GET: MailingList
        public ActionResult Index()
        {
            return View();
        }
    }
}