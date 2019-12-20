using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

using Bank;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace testASP.Controllers
{
    public class AccountsController : Controller
    {
        static HttpClient client = new HttpClient();

        public ActionResult Index()
        {
            ViewBag.Accounts = BankSystem.Accounts;
            ViewBag.currencies = BankSystem.Currencies;
            return View();
        }

        public ActionResult NewAccount()
        {
            ViewBag.currencies = new SelectList(BankSystem.Currencies);
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

        public ActionResult ChangeCurrency(int id, string Currency)
        {
            try
            {
                var acc = BankSystem.GetAccountById(id);
                acc.Currency = Currency;
            }
            catch
            {
                return Redirect("/");
            }
            return Redirect("/Accounts");
        }
    }
}