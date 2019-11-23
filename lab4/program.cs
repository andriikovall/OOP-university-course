using System;

using System.Collections.Generic;

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
            // mainDemo();
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
            GCDemoBegin();
            GCDemoFinish();
            LogTotalMemory("After all garbage stack frames"); // somethig strange -_-
        }

        private static void GCDemoFinish() {
            GC.Collect();
            GC.WaitForPendingFinalizers();
            LogTotalMemory("Exiting stackframe and force GC.Collect again");
        }

        private static void GCDemoBegin() {
            Console.WriteLine("Garbage collection demo ---");

            LogTotalMemory("Memory used before allocating");

            int sampleBigNumber = 1000;
            Console.WriteLine($"Allocating {sampleBigNumber} accounts");

            var garbageList = makeListOfGarbage(sampleBigNumber);
    
            LogTotalMemory("Memory used after allocating");

            garbageList.ForEach((acc) => acc.Dispose());

            GC.Collect();
            LogTotalMemory("Memory after GC.Collect disposed");

            garbageList.ForEach((acc) => GC.ReRegisterForFinalize(acc));
            garbageList = null;

            GC.Collect();
            
            // almoust nothing changes because of "smart" GC
            LogTotalMemory("Memory used after GC.collect in the same stack frame");
        }

        private static List<Account> makeListOfGarbage(int count) {
            var garbageList = new List<Account>();
            var rand = new Random();
            for (int i = 0; i < count; i++) {
                var acc = new Account(rand.Next(), "uah");
                garbageList.Add(acc);
            }
            return garbageList;
        }

        private static void LogTotalMemory(string s) {
            s = s.Trim() ?? "";
            if (s.Length == 0)
                Console.WriteLine($"{GC.GetTotalMemory(false)}");    
            Console.WriteLine($"{GC.GetTotalMemory(false)} - {s}");
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
