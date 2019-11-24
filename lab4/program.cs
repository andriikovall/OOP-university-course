using System;
using System.IO;
using System.Xml.Serialization;
using System.Collections.Generic;
using System.Runtime.Serialization.Formatters.Binary;

using Human;
using Bank;

// CLEAN CODE - used rules

/* Variable name length corresponds to its scope
- Each func has its own level of abstraction
- Meaningfull variable names
- Meaningfull func names
- Long variable and method names are better than short ones
- Less lines in for/while/if blocks
- More separation into funcs 
    - Bob Martin said excactly like that 
        "The first rule of functions is that they should be small. 
        The second rule of functions is that they should be smaller than that. 
        This is not an assertion that I can justify. 
        I can’t provide any references to research that shows that very small functions are better."
- Just make code cleaner
    "Leave the campground cleaner than we found it..."
- Good code doesn't need any comments 
    (but i dont care, i need them in this lab work)
*/

namespace lab1
{
    class Program
    {
        static void Main(string[] args)
        {
            GCDemo();
            weakReferenceDemo();
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
            GCDemoBegin();
            GCDemoFinish();
        }

        private static void GCDemoFinish()
        {
            GC.Collect();
            GC.WaitForPendingFinalizers();
            LogTotalMemory("Exiting stackframe and force GC.Collect again");
        }

        private static void GCDemoBegin()
        {
            Console.WriteLine("Garbage collection demo ---");

            LogTotalMemory("Memory used before allocating");

            int sampleBigNumber = 100;
            Console.WriteLine($"Allocating {sampleBigNumber} accounts");

            var garbageList = makeListOfGarbage(sampleBigNumber);
            var generation = GC.GetGeneration(garbageList[0]);

            LogTotalMemory("Memory used after allocating");

            garbageList.ForEach((acc) => (acc as IDisposable).Dispose());

            GC.Collect(generation);
            LogTotalMemory("Memory after GC.Collect disposed");

            //this makes .net to call d-ctor of finalizer as its oficially called
            garbageList.ForEach((acc) => GC.ReRegisterForFinalize(acc));
        }

        private static List<Account> makeListOfGarbage(int count)
        {
            var garbageList = new List<Account>();
            var rand = new Random();
            for (int i = 0; i < count; i++)
            {
                var acc = new Account(rand.Next(), "uah");
                garbageList.Add(acc);
            }
            return garbageList;
        }

        private static void LogTotalMemory(string stringAfterMemoryLogged, bool waitForFullCollectionBeforeLog = true)
        {
            // CLEAN CODE - do not repeat yourself
            stringAfterMemoryLogged = checkStringAndTrim(stringAfterMemoryLogged);
            var memoryUsed = GC.GetTotalMemory(waitForFullCollectionBeforeLog);
            string output = $"{memoryUsed}";

            if (stringAfterMemoryLogged.Length != 0)
                output += $" - {stringAfterMemoryLogged}";

            Console.WriteLine(output);
        }


        private static string checkStringAndTrim(string s)
        {
            return (s ?? "").Trim();
        }

        private static void mainDemo()
        {
            var acc1 = new Account(100, "uah"); // id 1
            var acc2 = new Account(5454, "uah"); //   2 
            var acc3 = new Account(200, "usd"); //   .
            var acc4 = new Account(1, "usd");


            try
            {
                acc1.Activate("Bank228");
                acc2.Activate("Bank228");
                acc3.Activate("Bank228");
                acc4.Activate("WorngPass");
            } catch 
            {
            }




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
            BankSystem.AddUser(client); 
            BankSystem.AddUser(client2);
            BankSystem.AddUser(basicUser);
        }

        public static void weakReferenceDemo()
        {
            var weakAccountRef = new WeakReference(new Account(123123, "uah"));
            if (weakAccountRef.IsAlive)
            {
                Console.WriteLine("Account ref is instansiated");
            }

            GC.Collect(GC.MaxGeneration, GCCollectionMode.Forced);
            GC.WaitForPendingFinalizers();

            if (weakAccountRef.IsAlive)
            {
                Console.WriteLine("Account is still alive after GC.collect");
            }
            else
            {
                Console.WriteLine($"Account is dead and the value of weak account reference is {weakAccountRef}");
            }
        }
    }
}
