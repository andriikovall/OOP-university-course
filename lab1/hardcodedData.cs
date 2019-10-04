using System;
using System.Collections.Generic;

using Human;
using Bank;

namespace Data {
    static class BankData {
        public static List<User> users;
        public static List<Account> accounts;

        static BankData() {
            accounts  = new List<Account>() {
                new Account(1515, "uah"), 
                new Account(15154, "usd"), 
                new Account(0, "rub"),
                new Account(15154, "pridumannaya valuta")  
            };  
            // users = new List<User>() {
            //     new User("user1", "lastName1", "login", "pass"), 
            //     new User("user2", "lastName2", "login", "pass"), 
            //     new User("user3", "lastName3", "login", "pass"), 
            //     new User("user4", "lastName4", "login", "pass"), 
            //     new User("user5", "lastName5", "login", "pass"), 
            // };
            //@todo fix

        }

    }
}