using System;

// lab
using Human;
using Bank;
//


namespace lab1
{
    class Program
    {
        static void initAccounts() {
            // hardcode ((
            Account.CreateAccount(625, "uah"); // id 1
            Account.CreateAccount(5454, "uah"); //   2 
            Account.CreateAccount(6425, "usd"); //   .
            Account.CreateAccount(62445, "uah");//   . 
            Account.CreateAccount(62544, "usd");
            new Account();
            new Account();
        }
        static void Main(string[] args)
        {
            // initAccounts();
            //head od hierarchy
            Account acc1 = Account.CreateAccount(625, "uah"); // id 1
            Account acc2 = Account.CreateAccount(5454, "uah"); //   2 
            Account acc3 = Account.CreateAccount(6425, "usd"); //   .
            Account acc4 = Account.CreateAccount(62445, "uah");//   . 
            Account acc5 = Account.CreateAccount(62544, "usd");
            Account acc6 = new Account();//@todo override with string number
            Account acc7 = new Account();

           User basicUser = new User(1, "Andrii", "Koval", "login", "password");
            BankSystem.AddUser(basicUser);

           basicUser.ShowInfo();

           //bank client is able to have bank accounts
            BankClient client = BankClient.CreateBankClient();

            // a piece of hardcode (((
            client.AddAccountId(acc1.id);
            client.AddAccountId(acc3.id);
            client.AddAccountId(acc5.id);

            client.ShowInfo();


        }
    }
}
