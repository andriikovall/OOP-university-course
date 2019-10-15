using System;

// lab
using Human;
using Bank;
//


namespace lab1
{
    class Program
    {
        static void Main(string[] args)
        {
            // hardcode (i just didnt want to think about db or any files with data =) )
            // Account acc1 = Account.CreateAccount(100, "uah"); // id 1
            // Account acc2 = Account.CreateAccount(5454, "uah"); //   2 
            // Account acc3 = Account.CreateAccount(200, "usd"); //   .
            // Account acc4 = Account.CreateAccount(123, "uah");  //   . 
            // Account acc5 = Account.CreateAccount(1, "usd");
            // Account acc6 = new Account(); // this acc is not added to bank system initially
            // Account acc7 = new Account();

            // //  so we add explisitly
            // BankSystem.AddAccounts(new Account[] { acc6, acc7 });

            // // head od hierarchy
            // // basic user with no power
            // User basicUser = new User(1, "Andrii", "Koval", "login", "password");

            // //bank client is able to have bank accounts
            // Console.WriteLine("---------------------Creatinh Bank Client");
            // BankClient client = BankClient.CreateBankClient();
            // Console.WriteLine("---------------------Creatinh Bank Client");

            // // a piece of hardcode (((
            // client.AddAccountId(acc1.id);
            // client.AddAccountId(acc3.id);
            // client.AddAccountId(acc5.id);
            // client.ShowInfo();

            // Console.WriteLine("---------------------Creatinh Bank Exmployee");
            // BankEmployee employee = BankEmployee.CreateBankEmployee();
            // Console.WriteLine("---------------------Creating Bank Exmployee");

            // BankSystem.AddUser(employee);
            // BankSystem.AddUser(client);
            // BankSystem.AddUser(basicUser);


            // Console.WriteLine("\n------------------------------------All users in system");
            // foreach (var user in BankSystem.Users.Values)
            // {
            //     user.ShowInfo();
            // }
            // Console.WriteLine("------------------------------------All users in system\n");

            // acc1.IncreaseAmount(100);
            // acc3.IncreaseAmount(100);
            // acc5.DecreaseAmount(50000);
            // client.ShowInfo("CLIENT OVERRIDEN METHOD", "CLIENT OVERRIDEN METHOD");


            // Console.WriteLine(employee.systemUsersCount);

            Person h = new Person("dsfs", "dsfsdf", "dfsf", "dfsdf");
        }
    }
}
