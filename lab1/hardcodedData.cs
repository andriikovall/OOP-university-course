using System;
using System.Collections.Generic;

using Human;
using Bank;

namespace Data {
    static class BankData {
        public static List<User> users;
        public static List<Account> accounts;

        static BankData() {
            accounts  = new List<Account>();
            users = new List<User>();
            //@todo fix

        }

    }
}