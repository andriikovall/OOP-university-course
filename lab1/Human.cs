using System;
using AccountNameSpace;
using System.Collections.Generic;
using Utils;

namespace Human {
    // basic user with no rights
    class User {
        //public
        public readonly long id;
        public readonly string firstName;
        public readonly string lastName;
        public static long nextId;
        //private
        protected string login;
        protected string password;


        public User CreateUser() {
            string firstName = ConsoleInput.GetInputOnText("Enter first name");
            string lastName = ConsoleInput.GetInputOnText("Enter last name");
            string login = ConsoleInput.GetInputOnText("Enter login");
            string password = "";
            do {
                Console.WriteLine("Enter password");
                password = ConsoleInput.GetHiddenConsoleInput();
                Console.WriteLine("Enter password again");
                string passwordToCheck = ConsoleInput.GetHiddenConsoleInput();
                if (passwordToCheck != password) {
                    Console.WriteLine("Error: passwords differ");
                    continue;
                }
                break;
            } while(true);
            return new User(firstName, lastName, login, password);
        }
        static User() {
            nextId = 1;
        }
        
        public User(string firstName, string lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }
        protected User(string firstName, string lastName, string login, string password) {
            this.id = nextId++;
            this.firstName = firstName;
            this.lastName = lastName;
            this.password = password;
        }
        private User(long id, string firstName, string lastName,string login, string password) {
            if (id < nextId) {
                Console.WriteLine($"Unable to create user with id {id}");
                Console.WriteLine($"Assigning id value {nextId}");
                id = nextId;
            }

            this.id = id;
            long newNextId = id + 1;
            nextId = newNextId;

            this.firstName = firstName;
            this.lastName = lastName;
            this.login = login;
            this.password = password;
        }
        public string fullName {
            get { return $"{this.firstName} {this.lastName}";}
        }
        public virtual void ShowInfo() {
            Console.WriteLine($"{this.id} - '{this.fullName}'");
        }
    }

    class BankClient: User {
        private List<Account> accounts; 
        //@todo add acc
        private string secretQuestion;
        private string secretAnswer;

        public override void ShowInfo() {
            base.ShowInfo();
            foreach (var acc in accounts)
            {   
                Console.Write($"{acc.id}");
                acc.ShowAmount();
            }
        }

        private BankClient(string firstName,
                           string lastName,
                           string login,
                           string password,
                           string secretQuestion,
                           string secretAnswer) : base(firstName, lastName, login, password) {}

        public BankClient CreateBankClient() {
            BankClient clinet = (BankClient)base.CreateUser();
            this.secretQuestion = ConsoleInput.GetInputOnText("Enter secret question");
            this.secretAnswer   = ConsoleInput.GetInputOnText("Enter secret answer");
            return new BankClient(secretQuestion, secretAnswer, clinet.firstName, clinet.lastName, clinet.login, clinet.password);
        }
    }
}