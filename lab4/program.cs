using System;

using System.IO;
using System.Xml.Serialization;
using System.Runtime.Serialization.Formatters.Binary;

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
            GCDemo();
            mainDemo();
        }

        public static void SerializationDemoXML()
        {
            // Account[] accArray = new Account[BankSystem.Accounts.Count];
            // BankSystem.Accounts.Values.CopyTo(accArray, 0);

            Account[] accArray = new Account[] {
                new Account(45, "uah"),
                new Account(5646546, "usd"),
                new Account(1, "euro")
            };

            XmlSerializer formatter = new XmlSerializer(typeof(Account[]));

            using (FileStream fs = new FileStream("accounts.xml", FileMode.OpenOrCreate))
            {
                try
                {
                    formatter.Serialize(fs, accArray);
                    Console.WriteLine("Serialization done");
                }
                catch (Exception exp)
                {
                    Console.WriteLine("Serialization Error");
                    Console.WriteLine(exp.Message);
                }
            }

            using (FileStream fs = new FileStream("accounts.xml", FileMode.OpenOrCreate))
            {
                try
                {
                    var accountsDeserialized = (Account[])formatter.Deserialize(fs);
                    Console.WriteLine("Deserialization done");
                    foreach (var acc in accountsDeserialized)
                    {
                        acc.ShowAmount();
                    }
                }
                catch (Exception exp)
                {
                    Console.WriteLine("Deserialization error");
                    Console.WriteLine(exp.Message);
                }
            }
        }

        public static void SerializationDemoBIN()
        {
            // DataContractJsonSerializer jsonSerializer = new DataContractJsonSerializer(typeof(Account[]));

            Account[] accArray = new Account[] {
                new Account(45, "uah"),
                new Account(5646546, "usd"),
                new Account(1, "euro")
            };

            // Account[] accArray = new Account[BankSystem.Accounts.Count];
            // BankSystem.Accounts.Values.CopyTo(accArray, 0);

            BinaryFormatter formatter = new BinaryFormatter();

            using (FileStream fs = new FileStream("accounts.dat", FileMode.OpenOrCreate))
            {
                try
                {
                    formatter.Serialize(fs, accArray);
                    Console.WriteLine("Serialization done");
                }
                catch (Exception exp)
                {
                    Console.WriteLine("Serialization Error");
                    Console.WriteLine(exp.Message);
                }
            }

            using (FileStream fs = new FileStream("accounts.dat", FileMode.OpenOrCreate))
            {
                try
                {
                    var accountsDeserialized = (Account[])formatter.Deserialize(fs);
                    Console.WriteLine("Deserialization done");
                    foreach (var acc in accountsDeserialized)
                    {
                        acc.ShowAmount();
                    }
                }
                catch (Exception exp)
                {
                    Console.WriteLine("Deserialization error");
                    Console.WriteLine(exp.Message);
                }
            }
        }


        private static void GCDemo()
        {
            Console.WriteLine("Garbage collector demo");

            Console.WriteLine($"Memory used before allocating {GC.GetTotalMemory(false)}");

            int sampleBigNumber = 500;

            Console.WriteLine($"Allocating {sampleBigNumber} accounts");

            makeGarbage();

            Console.WriteLine($"Memory used after allocating {GC.GetTotalMemory(false)}");

            GC.Collect();

            Console.WriteLine($"Memory used after collection {GC.GetTotalMemory(false)}");

            
        }

        private static void makeGarbage(int count = 500) {
            var rand = new Random();
            for (int i = 0; i < count; i++) {
                var acc = new Account(rand.Next(), "uah");
            }
        }

        private static void mainDemo()
        {
            var acc1 = new Account(100, "uah"); // id 1
            var acc2 = new Account(5454, "uah"); //   2 
            var acc3 = new Account(200, "usd"); //   .
            var acc4 = new Account(1, "usd");

            acc1.Activate("Bank228");
            acc2.Activate("Bank228");
            acc3.Activate("Bank228");
            acc4.Activate("WorngPass");




            Console.WriteLine("---------------------Creating Bank Client");
            BankClient client = BankClient.CreateBankClient();
            BankClient client2 = BankClient.CreateBankClient();
            Console.WriteLine("---------------------Creating Bank Client");


            client.AddAccountId(acc1.id);
            client.AddAccountId(acc3.id);
            client.ShowInfo();

            Console.WriteLine("---------------------Creating Bank Exmployee");
            var employee = BankEmployee.CreateBankEmployee();
            Console.WriteLine("---------------------Creating Bank Exmployee");

            User basicUser = new User("Andrii", "Koval", "login", "password");

            BankSystem.AddUser(employee);
            BankSystem.AddUser(client); //1
            BankSystem.AddUser(client2);//2
            BankSystem.AddUser(basicUser);
        }
    }
}
