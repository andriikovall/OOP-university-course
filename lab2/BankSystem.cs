using System;
using System.Collections.Generic;

using Human;

namespace Bank
{
    static class BankSystem
    {
        public const string SecretPassword = "Bank228";

        private static Dictionary<int, Account> accounts; // composition
        private static Dictionary<int, User>    users; // composition

        public static Dictionary<int, User> Users
        {
            get
            {
                return users;
            }
        }

        public static int UsersСount => users.Count;

        public static Account GetAccountById(long accId)
        {
            try
            {
                Account foundAcc = accounts[(int)accId];
                return foundAcc;
            }
            catch (Exception)
            {
                return null;
            }

        }

        public static void AddUser(User user)
        {
            users[(int)user.id] = user;
        }

        public static bool RemoveUser(User user) {
            try {
                users.Remove((int)user.id);
                return true;
            } catch( Exception ) {
                return false;
            }
        }
        
        public static bool RemoveUser(int userId) {
            try {
                users.Remove(userId);
                return true;
            } catch( Exception ) {
                return false;
            }
        }

        public static void AddAccount(Account acc)
        {
            accounts[(int)acc.id] = acc;
        }

        public static void AddAccounts(Account[] accArr)
        {
            foreach (var acc in accArr)
            {
                AddAccount(acc);
            }
        }

        static BankSystem()
        {
            users = new Dictionary<int, User>();
            accounts = new Dictionary<int, Account>();
        }

    }

    class Account
    {
        public readonly long id;
        public readonly string currency;

        public const string DEFAULT_CURRENCY = "uah";

        private static long nextId = 0;

        private long moneyAmount;

        public void IncreaseAmount(long value) => this.moneyAmount += value;

        public Account() : this(0, DEFAULT_CURRENCY) { }

        private Account(long moneyAmount, string currency)
        {
            this.id = nextId++;
            if (moneyAmount < 0)
            {
                this.moneyAmount = 0;
            }
            else
            {
                this.moneyAmount = moneyAmount;
            }
            this.currency = currency;
        }

        public bool DecreaseAmount(long value)
        {
            if (value > moneyAmount)
            {
                Console.WriteLine("Unable to procces transaction");
                Console.WriteLine($"Not enough credits -> {moneyAmount} {currency}");
                return false;
            }
            moneyAmount -= value;
            return true;
        }

        public long MoneyAmount
        {
            get { return moneyAmount; }
            set
            {
                if (value < 0)
                {
                    Console.WriteLine("Error: invalid money amount value");
                    return;
                }
                moneyAmount = value;
            }
        }

        public static Account CreateAccount(long moneyAmount, string currency)
        {
            Account acc = new Account(moneyAmount, currency);
            BankSystem.AddAccount(acc);
            return acc;
        }

        public void ShowAmount()
        {
            Console.WriteLine($"id - {id}  money - {moneyAmount} {currency}");
        }
    }
}