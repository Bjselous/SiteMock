using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SiteMock.Contracts;
using SiteMock.Models.Identity;

namespace SiteMock.Controllers
{
    public class GiftCardController : Controller
    {
        [HttpGet]
        public IActionResult StepOne(string location)
        {
            var prices = new Dictionary<string, Dictionary<int, double>>();
            prices.Add("BIOMAT", new Dictionary<int, double>());
            prices["BIOMAT"][45] = 45;
            prices["BIOMAT"][60] = 60;

            prices.Add("FLOAT", new Dictionary<int, double>());
            prices["FLOAT"][60] = 65;
            prices["FLOAT"][90] = 95;

            prices.Add("MHBOT", new Dictionary<int, double>());
            prices["MHBOT"][60] = 70;
            prices["MHBOT"][90] = 90;

            prices.Add("IRSAUNA", new Dictionary<int, double>());
            prices["IRSAUNA"][30] = 45;
            prices["IRSAUNA"][45] = 55;


            ViewData["availableCategories"] = new List<string>() { "BIOMAT", "FLOAT", "MHBOT", "IRSAUNA" };
            ViewData["prices"] = prices;
            ViewData["user"] = new MinervexUser(){UserRoles = new []{WebIdentityConstants.UserRole_strathpineMember}};

            return View("StepOne");
        }
    }
}