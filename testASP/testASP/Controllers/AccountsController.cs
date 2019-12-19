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
            var task = setCurrencyRateAndSetCurrency(id, Currency);
            var res = task.Result;
            return Redirect("/Accounts");
        }

        private static async Task<float> GetShangeRate(string curr1, string curr2)
        {
            //TODO put this into model or hardcode
            string convetingCurrencies = $"{curr1.ToUpper()}_{curr2.ToUpper()}";
            string url = $"https://free.currconv.com/api/v7/convert?q={convetingCurrencies}&compact=ultra&apiKey=572da0a46fffdaa1bce6";
            System.Diagnostics.Debug.WriteLine(url);
            var response = await client.GetAsync(url);
            System.Diagnostics.Debug.WriteLine(response.StatusCode);
            response.EnsureSuccessStatusCode();
            if (response != null)
            {
                string jsonString = await response.Content.ReadAsStringAsync();
                System.Diagnostics.Debug.WriteLine(jsonString);
                var result = JObject.Parse(jsonString);
                return result.Value<float>(convetingCurrencies);
            }
            return 1;
        }

        private async Task<int> setCurrencyRateAndSetCurrency(int accId, string curr2)
        {
            var acc = BankSystem.GetAccountById(accId);
            float koef = await GetShangeRate(acc.Currency, curr2);
            acc.Currency = curr2;
            acc.MoneyAmount = acc.MoneyAmount * (long)koef;
            return 1;
        }

    }
}