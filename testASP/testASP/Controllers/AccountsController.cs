using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Bank;

namespace testASP.Controllers
{
    public class AccountsController : Controller
    {
        // GET: Account
        public ActionResult Index()
        {
            ViewBag.Accounts = BankSystem.Accounts;
            return View();
        }

        public ActionResult NewAccount()
        {
            IEnumerable<string> currencies = new List<string>
            {
                "uah", "usd", "euro", "rub", "alien-tugriks!"
            };
            ViewBag.currencies = new SelectList(currencies);
            return View();
        }

        [HttpPost]
        public ActionResult NewAccount(Account acc)
        {
            BankSystem.AddAccount(acc);
            return Redirect("/Accounts/Index");
        }


        public ActionResult Delete(int id)
        {
            BankSystem.RemoveAccount(id);
            return Redirect("/Accounts/");
        }

        [HttpPost]
        public ActionResult DecreaseAmount(int id, int MoneyAmount)
        {
            try
            {
                var acc = BankSystem.GetAccountById(id);
                acc.DecreaseAmount(MoneyAmount);
            } catch
            {
                return Redirect("/");
            }
            return Redirect("/Accounts");
        }

        public ActionResult IncreaseAmount(int id, int MoneyAmount)
        {
            try
            {
                var acc = BankSystem.GetAccountById(id);
                acc.IncreaseAmount(MoneyAmount);
            }
            catch
            {
                return Redirect("/");
            }
            return Redirect("/Accounts");
        }
    }
}