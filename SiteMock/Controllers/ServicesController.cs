using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SiteMock.Controllers
{
    public class ServicesController : Controller
    {
        public IActionResult Float()
        {
            return View();
        }
    }
}