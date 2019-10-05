using System;
using System.Collections.Generic;

using Data;
using Human;

namespace Bank
{
    static class BankSystem
    {
        private const  string SecretBankPassword = "Bank228";
        // private static long authorizedUserId;
        private static List<Account> accounts;
        private static List<User> users;
        
        public static int UsersСount => users.Count;

        public static Account GetAccountById(long accId)
        {
            Account foundAcc = accounts[(int)accId]; 
            return foundAcc;
        }

        public static void AddUser(User user) {
            users.Add(user);
        }

        public static void AddAccount(Account acc) {
            accounts.Add(acc);
        }

        static BankSystem() {
            accounts = new List<Account>();
            users =    new List<User>();
            // foreach (var acc in Data.BankData.accounts)
            // {
            //     AddAccount(acc);
            // }
        }

    }

    class Account
    {
        public readonly long id;
        public readonly string currency;
        public readonly long nextId = 0;
        public void IncreaseAmount(long value) => this.moneyAmount += value;


        public void DecreaseAmount(long value)
        {
            if (value > moneyAmount)
            {
                Console.WriteLine("Unable to procces transaction");
                Console.WriteLine($"Not enough credits -> {moneyAmount} {currency}");
                return;
            }
            moneyAmount -= value;
        }

        public long moneyAmount; 

        public Account(long moneyAmount, string currency)
        {
            this.id = nextId++;
            this.moneyAmount = moneyAmount;
            this.currency = currency;
            BankSystem.AddAccount(this);
        }

        public void ShowAmount()
        {
            Console.WriteLine($"{id} {moneyAmount} {currency}");
        }
    }
}