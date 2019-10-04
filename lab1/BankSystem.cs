using System;
using System.Collections.Generic;

using Data;
using Human;

namespace Bank
{
    static class BankSystem
    {
        private const  string secretBankPassword = "Bank228";
        // public static string SecretBankPassword => secretBankPassword;
        private static long authorizedUserId;
        private static Dictionary<long, Account> accounts;
        private static List<User> users;
        
        public static int UsersСount => users.Count;

        public static Account GetAccountById(long accId)
        {
            Account foundAcc = accounts[accId];
            return foundAcc;
        }

        static BankSystem() {
            foreach (var acc in Data.BankData.accounts)
            {
                accounts[acc.id] = acc;
            }
        }

    }

    class Account
    {
        public readonly long id;
        public readonly string currency;
        public readonly long nextId = 1;
        public void IncreaseAmount(long value) => this.moneyAmount += value;

        private long moneyAmount;

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

        public Account(long moneyAmount, string currency)
        {
            this.id = nextId++;
            this.moneyAmount = moneyAmount;
            this.currency = currency;
        }

        public void ShowAmount()
        {
            Console.WriteLine($"{id} {moneyAmount} {currency}");
        }
    }
}