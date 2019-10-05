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
           User basicUser = new User(1, "Andrii", "Koval", "login", "password");
           basicUser.ShowInfo();
            BankClient client = BankClient.CreateBankClient(); 
            client.ShowInfo();
            Account acc = new Account(654654, "uah");
            client.ShowInfo();
            client.AddAccountId(acc.id);
            client.ShowInfo();
            User clientUser = (User)client;
            clientUser.ShowInfo();

        }
    }
}
