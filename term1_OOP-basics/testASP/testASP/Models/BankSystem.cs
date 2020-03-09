using System;
using System.Collections.Generic;

using Human;
using BankEvent;
using CustomUserCollection;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using System.Net;
using System.IO;
using System.Text;

using System.Xml.Serialization;

namespace Bank
{
    static class BankSystem
    {
        public const string SecretPassword = "Bank228";

        public static Action<BankEventArg> AddAccountEvent;
        public static Func<string> GetEmployeeRigths;
        public static Func<string> GetClientRigths;
        public static string AcountsFilePath { get; set; }


        public static int UsersСount => users.Count;
        public static UserCollection Users => users;
        public static Account[] Accounts
        {
            get
            {
                var accountsArray = new Account[BankSystem.accounts.Count];
                BankSystem.accounts.Values.CopyTo(accountsArray, 0);
                return accountsArray;
            }
        }

        private static Dictionary<int, Account> accounts;
        private static UserCollection users;
        public static readonly IEnumerable<string> Currencies = new List<string>
        {
            "UAH", "USD", "EUR", "RUB"
        };

        public static Account GetAccountById(long accId)
        {
            try
            {
                Account foundAcc = accounts[(int)accId];
                return foundAcc;
            }
            catch
            {
                return null;
            }

        }

        public static void AddUser(User user)
        {
            users.Insert(user);
        }
        
        // CLEAN CODE - camalCase function arguments naming
        public static bool RemoveUser(User user)
        {
            try
            {
                users.Remove((int)user.id);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public static bool RemoveUser(int userId)
        {
            try
            {
                // throwing error is better than returning error codes, but here its more clear to undestand
                users.Remove(userId);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public static void AddAccounts(Account[] accArr)
        {
            // less lines in loops and conditional statements
            foreach (var acc in accArr)
            {
                AddAccount(acc);
            }
        }


        public static void AddAccount(Account acc)
        {
            accounts[(int)acc.id] = acc;
        }

        public static void AddAccount(BankEventArg bankArg)
        {
            AddAccount(bankArg.account);
            Console.WriteLine("Reacted on activating account.\nAdding it into system...\nSuccesfully added");
        }

        public static void RemoveAccount(int accId)
        {
            BankSystem.accounts.Remove(accId);
        }
        

        static BankSystem()
        {
            users = new UserCollection();
            accounts = new Dictionary<int, Account>();
            AddAccountEvent = AddAccount;
            AcountsFilePath = "E:\\Study\\oop\\OOP_labs\\testASP\\accounts.xml";
            GetEmployeeRigths = () =>
            {
                return "\nAddAccountId()\n" +
                "TakeCredit(moneyValue) - the money is assigned to the first account with the same or more money amount\n" +
                "ShowInfo() - show employee info\n" +
                "systemUsersCount - get users count in system. Permission reqired\n";
            };

            GetClientRigths = delegate ()
            {
                return "\nAddAccountId()\n" +
                "TakeCredit(moneyValue) - the money is assigned to the first account with the same or more money amount\n" +
                "ShowInfo() - show user info\n";
            };
        }

        public static void LoadAccounts()
        {
            LoadAccounts(AcountsFilePath);
        }

        public static void SaveAccounts()
        {
            SaveAccounts(AcountsFilePath);
        }

        public static void LoadAccounts(string filePath)
        {
            XmlSerializer formatter = new XmlSerializer(typeof(Account[]));

            using (FileStream fs = new FileStream(filePath, FileMode.OpenOrCreate))
            {
                try
                {
                    var accountsDeserialized = (Account[])formatter.Deserialize(fs);
                    foreach (var acc in accountsDeserialized)
                    {
                        AddAccount(acc);
                    }
                }
                catch (Exception exp)
                {
                    Console.WriteLine("Deserialization error: missing file or another error");
                }
            }
        }

        public static void SaveAccounts(string filePath)
        {
            XmlSerializer formatter = new XmlSerializer(typeof(Account[]));
            Account[] accArray = Accounts;

            using (FileStream fs = new FileStream(filePath, FileMode.OpenOrCreate))
            {
                try
                {
                    formatter.Serialize(fs, accArray);
                    Console.WriteLine("Serialization done");
                }
                catch (Exception exp)
                {
                    Console.WriteLine("Serialization Error");
                    System.Diagnostics.Debug.WriteLine(exp.Message);
                }
            }
        }
    }

    [Serializable]
    public class Account : IDisposable
    {
        public readonly long id;


        private string currency;

        public string Currency
        {
            get => this.currency;
            set
            {
                float koef = 1;
                if (!IsFirstTimeInited)
                {
                    koef = GetCurrencyConvetingCoeficient(this.currency, value);
                    IsFirstTimeInited = false;
                }
                this.currency = value;
                this.MoneyAmount = (long)(this.MoneyAmount * koef);
            }
        }
        public long MoneyAmount
        {
            get { return _moneyAmount; }
            set
            {
                {
                    if (value < 0)
                    {
                        throw new ArgumentException("Invalid money amount value. More than 0 required");
                    }
                    _moneyAmount = value;
                }
            }
        }

        public void IncreaseAmount(long value) => this._moneyAmount += value;

        private static long _nextId = 0;
        private long _moneyAmount;
        private bool _disposed = false;
        private bool IsFirstTimeInited = true;
        
        private const string DefaultCurrency = "uah";

        private event AccountHandler AccountActivatingEvent;
        private static HttpClient httpClient = new HttpClient();

        public Account() : this(0, DefaultCurrency) { }

        public Account(long moneyAmount, string currency)
        {
            this.id = _nextId++;
            if (_moneyAmount < 0)
            {
                this._moneyAmount = 0;
            }
            else
            {
                this._moneyAmount = moneyAmount;
            }
            this.currency = currency;

            this.AccountActivatingEvent += new AccountHandler(BankSystem.AddAccountEvent);
            // or 
            this.AccountActivatingEvent += (BankEventArg arg) =>
            {
                BankSystem.AddAccount(arg.account);
                Console.WriteLine("Reacted on activating account.\nAdding it into system...\nSuccesfully added");
            };

        }

        public void Activate(string bankPassword)
        {
            Console.WriteLine($"Activating new acconut with id - {this.id}");
            if (bankPassword == BankSystem.SecretPassword)
            {
                if (AccountActivatingEvent != null)
                {
                    AccountActivatingEvent(new BankEventArg(this));
                    Console.WriteLine("Account succesfully activated");
                } 
                else 
                {
                    throw new Exception("Couldnt activate account. Inner system error");
                }
            }
            else
            {
                throw new ArgumentException("ERROR: bank password is wrong, aborting account activating");
            }
        }

        public bool DecreaseAmount(long value)
        {
            if (value > _moneyAmount)
            {
                return false;
            }
            _moneyAmount -= value;
            return true;
        }

        public void ShowAmount()
        {
            Console.WriteLine($"id - {id}  money - {_moneyAmount} {currency}");
        }

        void IDisposable.Dispose()
        {
            Console.WriteLine($"Dispose method without flag {this.id}");

            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private float GetCurrencyConvetingCoeficient(string curr1, string curr2)
        {
            string convetingCurrencies = $"{curr1.ToUpper()}_{curr2.ToUpper()}";
            string url = $"https://free.currconv.com/api/v7/convert?q={convetingCurrencies}&compact=ultra&apiKey=572da0a46fffdaa1bce6";
            HttpWebRequest request =
            (HttpWebRequest)WebRequest.Create(url);

            request.Method = "GET";
            request.Accept = "application/json";

            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            StreamReader reader = new StreamReader(response.GetResponseStream());
            StringBuilder output = new StringBuilder();
            output.Append(reader.ReadToEnd());
            response.Close();
            var result = JObject.Parse(output.ToString());
            var koef = result.Value<float>(convetingCurrencies);
            System.Diagnostics.Debug.WriteLine(koef);
            System.Diagnostics.Debug.WriteLine("here");
            return koef;
        }

        private void Dispose(bool disposing)
        {
            if (this._disposed)
                return;

            if (disposing)
            {
                removeAllEventSubscriptions();
            }
            // free unmapped recourses
            // @todo ask

            this._disposed = true;
        }

        private void removeAllEventSubscriptions()
        {
            foreach (Delegate func in AccountActivatingEvent.GetInvocationList())
            {
                AccountActivatingEvent -= (AccountHandler)func;
            }
        }

        ~Account()
        {
            Dispose(false);
        }
    }
}