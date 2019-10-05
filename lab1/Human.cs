using System;
using System.Collections.Generic;
using Utils;
using Bank;

namespace Human {
    // basic user with no rights
    class User {

        public readonly long id;
        public readonly string firstName;
        public readonly string lastName;

        public string login {get;}
        public string password {get;}
        protected static long nextId;

        private User() {}

        public static User CreateUser() {
            string firstName = ConsoleInput.GetInputOnText("Enter first name");
            string lastName = ConsoleInput.GetInputOnText("Enter last name");
            string login = ConsoleInput.GetInputOnText("Enter login");
            string password = "";
            do {
                password = ConsoleInput.GetHiddenConsoleInput("Enter password");
                string passwordToCheck = ConsoleInput.GetHiddenConsoleInput("Enter password again");
                if (passwordToCheck != password) {
                    Console.WriteLine("Error: passwords differ");
                    continue;
                }
                break;
            } while(true);
            return new User(firstName, lastName, login, password);
        }
        static User() {
            nextId = 0;
        }
        
        protected User(string firstName, string lastName, string login, string password) {
            this.id = nextId++;
            this.firstName = firstName;
            this.lastName = lastName;
            this.password = password;
        }
        public User(long id, string firstName, string lastName,string login, string password) {
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
        public string FullName {
            get { return $"{this.firstName} {this.lastName}";}
        }
        public virtual void ShowInfo() {
            Console.WriteLine($"{this.id} - '{this.FullName}'");
        }
    }

    class BankClient: User {
        private List<long> accountsIds; //agregation
        //@todo add acc
        private string secretQuestion;
        private string secretAnswer;

        public new void ShowInfo() { //to let noone read client info
            base.ShowInfo();
            foreach (var accId in accountsIds)
            {   
                Bank.BankSystem.GetAccountById(accId).ShowAmount();
            }
        }

        private BankClient(string firstName,
                           string lastName,
                           string login,
                           string password,
                           string secretQuestion,
                           string secretAnswer) : base(firstName, lastName, login, password) {
                               this.secretAnswer   = secretAnswer;
                               this.secretQuestion = secretQuestion;
                               this.accountsIds = new List<long>();
                           }


        public static BankClient CreateBankClient() {
            User user = CreateUser();
            string secretQuestion = ConsoleInput.GetInputOnText("Enter secret question");
            string secretAnswer   = ConsoleInput.GetInputOnText("Enter secret answer");
            return new BankClient(user.firstName, user.lastName, user.login, user.password, secretQuestion, secretAnswer);
        }

        public void AddAccountId(long accId) {
            this.accountsIds.Add(accId);
        }
    }
    class BankEmployee: User {
        
        private string Position {get;}

        public override void ShowInfo() {
            base.ShowInfo();
            Console.WriteLine($"Position {this.Position}");
        }

        private BankEmployee(string firstName,
                             string lastName,
                             string login,
                             string password,
                             string Position) : base(firstName, lastName, login, password) {
            this.Position = Position;
        }

        public BankEmployee createBankEmployee() {
            BankEmployee employee = (BankEmployee)CreateUser(); 
            string Position = ConsoleInput.GetInputOnText("Enter your Position in bank");
            return new BankEmployee(employee.firstName, employee.lastName, employee.login, employee.password, Position);
        }
    }
}