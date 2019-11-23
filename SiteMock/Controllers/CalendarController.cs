using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SiteMock.Controllers
{
    public class CalendarController : Controller
    {
        public IActionResult Day(string centerId, string selectedCategory, string date, int sessionLength)
        {
            ViewData["centerId"] = centerId;
            ViewData["dateToDisplay"] = date;
            ViewData["availableSessions"] = new List<int>() { 60, 90 };
            ViewData["selectedSession"] = sessionLength;
            ViewData["category"] = selectedCategory;

            return View("Day");
        }
    }
}