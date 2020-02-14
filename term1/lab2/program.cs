using System;

// lab
using Human;
using Bank;
using CustomException;
//


namespace lab1
{
    class Program
    {
        static void Main(string[] args)
        {
            var acc1 = new Account(100, "uah"); // id 1
            var acc2 = new Account(5454, "uah"); //   2 
            var acc3 = new Account(200, "usd"); //   .
            var acc4 = new Account(1, "usd");

            acc1.Activate("Bank228");
            acc2.Activate("Bank228");
            acc3.Activate("Bank228");

            acc4.Activate("WorngPass");

            // head od hierarchy
            // basic user with no power
            User basicUser = new User("Andrii", "Koval", "login", "password");

            //bank client is able to have bank accounts
            Console.WriteLine("---------------------Creating Bank Client");
            BankClient client = BankClient.CreateBankClient();
            Console.WriteLine("---------------------Creating Bank Client");

            // a piece of hardcode (((
            client.AddAccountId(acc1.id);
            client.AddAccountId(acc3.id);
            client.ShowInfo();

            Console.WriteLine("---------------------Creating Bank Exmployee");
            var employee = BankEmployee.CreateBankEmployee();
            Console.WriteLine("---------------------Creating Bank Exmployee");

            BankSystem.AddUser(employee);
            BankSystem.AddUser(client);
            BankSystem.AddUser(basicUser);

            employee.ShowPossibleSystemActions();
            client.ShowPossibleSystemActions();


            Console.WriteLine("\n------------------------------------All users in system");
            foreach (var user in BankSystem.Users.Values)
            {
                user.ShowInfo();
            }
            Console.WriteLine("------------------------------------All users in system\n");

            acc1.IncreaseAmount(100);
            acc3.IncreaseAmount(100);
            acc4.DecreaseAmount(550000);
            client.ShowInfo("CLIENT OVERRIDEN METHOD", "CLIENT OVERRIDEN METHOD");
            try
            {
                Console.WriteLine(employee.SystemUsersCount);
            }
            catch (EmployeeAccessException exp)
            {
                Console.WriteLine("Error");
                Console.WriteLine(exp.args.Message);
            }

            try
            {
                employee.TakeCredit(45);
            }
            catch (EmployeeAccessException exp)
            {
                Console.WriteLine(exp.Message);
            }

            try
            {
                employee.ExchangeMoney(45, 5, 545);
            }
            catch (EmployeeAccessException exp)
            {
                Console.WriteLine(exp.Message);
            }
        }
    }
}
