using System;
using System.Collections.Generic;

using Utils;
using Bank;
using BankUserIntefrace;
using BankEvent;
using CustomException;


namespace Human
{

    public abstract class Person
    {

        public abstract string FirstName { get; }
        public abstract string LastName { get; }

        public abstract void ShowInfo();
    }

    public class User : Person, IComparable, IDisposable
    {
        public readonly long id;

        public string login { get; }
        public string password { get; }

        protected string firstName;
        protected string lastName;

        protected static long nextId;

        protected bool disposed = false;

        protected static readonly List<string> DefaultQuestions = new List<string>() {
            "Enter first name",
            "Enter last name",
            "Enter login",
            "Enter password"
        };

        public override string FirstName
        {
            get
            {
                return String_IO.strFirstCharToUpper(firstName);
            }
        }

        public override string LastName
        {
            get
            {
                return String_IO.strFirstCharToUpper(lastName);
            }
        }

        public int CompareTo(object obj)
        {
            User user = obj as User;
            if (user != null) 
            {
                return this.id.CompareTo(user.id);
            }
            else
            {
                throw new InvalidCastException("Impossible to compare two users. Probably type error");
            }
        }

        static User()
        {
            nextId = 0;
        }

        public User(string firstName, string lastName, string login, string password)
        {
            this.id = nextId++;
            this.firstName = firstName;
            this.lastName = lastName;
            this.login = login;
            this.password = password;
        }

        public string FullName
        {
            get { return $"{this.FirstName} {this.LastName}"; }
        }

        public bool FullNameContainsCaseIgnored(string substring) {
            substring = substring.ToLower().Trim();
            return this.FirstName.ToLower().Contains(substring) ||
                    this.LastName.ToLower().Contains(substring) ||
                    this.FullName.ToLower().Contains(substring);
        }

        public override void ShowInfo()
        {
            Console.WriteLine($"User info {this.id} - '{this.FullName}'");
        }

        protected static List<string> AnswerQuestions(List<string> questions)
        {
            var answers = new List<string>();
            // CLEAN CODE
            // q and ans are apropriate besause the scope is pretty small
            foreach (var q in questions)
            {
                string lowerCaseQuestion = q.ToLower();
                string ans;
                if (lowerCaseQuestion.Contains("password"))
                {
                    ans = String_IO.GetHiddenConsoleInput(q);
                }
                else
                {
                    ans = String_IO.GetInputOnText(q);
                }
                answers.Add(ans);
            }
            return answers;
        }

        public virtual void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }


        protected virtual void Dispose(bool disposing)
        {
            if (this.disposed)
                return;

            if (disposing)
            {
                // free managed recourses
            }
            // free unmapped recourses
            // @todo ask

            this.disposed = true;
        }

        ~User()
        {
            Console.WriteLine($"d-ctor of user with id {this.id}");
            Dispose(false);
        }
    }

    [Serializable]
    class BankClient : User, IMoney, ISystem
    {
        private List<long> accountsIds; 
        private string secretQuestion;
        private string secretAnswer;

        private event SystemUserInfoRequestHandler InfoReqEvent;

        public override void ShowInfo()
        {
            Console.WriteLine("Client info-------");
            base.ShowInfo();
            foreach (var accId in accountsIds)
            {
                Bank.BankSystem.GetAccountById(accId).ShowAmount();
            }
            Console.WriteLine("Client info-------");
        }

        public void ShowInfo(string beginStr, string finishStr)
        {
            Console.WriteLine(beginStr);
            base.ShowInfo();
            foreach (var accId in accountsIds)
            {
                Bank.BankSystem.GetAccountById(accId).ShowAmount();
            }
            Console.WriteLine(finishStr);
        }

        private BankClient(string firstName,
                           string lastName,
                           string login,
                           string password,
                           string secretQuestion,
                           string secretAnswer) : base(firstName, lastName, login, password)
        {
            this.secretAnswer = secretAnswer;
            this.secretQuestion = secretQuestion;
            this.accountsIds = new List<long>();
            this.InfoReqEvent = new SystemUserInfoRequestHandler(BankSystem.GetEmployeeRigths);
        }


        public static BankClient CreateBankClient()
        {
            var basicAnswers = User.AnswerQuestions(User.DefaultQuestions);
            string secretQuestion = String_IO.GetInputOnText("Enter secret question");
            string secretAnswer = String_IO.GetHiddenConsoleInput("Enter secret answer");
            return new BankClient(basicAnswers[0], basicAnswers[1], basicAnswers[2], basicAnswers[3], secretQuestion, secretAnswer);
        }

        public void AddAccountId(long accId)
        {
            this.accountsIds.Add(accId);
        }

        public int TakeCredit(int moneyValue)
        {
            if (moneyValue <= 0) return 0;

            int accountIdWithCredit = -1;

            foreach (var accId in this.accountsIds)
            {
                var acc = BankSystem.GetAccountById(accId);
                if (acc.MoneyAmount > moneyValue)
                {
                    acc.IncreaseAmount(moneyValue);
                    accountIdWithCredit = (int)acc.id;
                    break;
                }
            }

            return accountIdWithCredit;
        }

        public bool ExchangeMoney(int accountSrcId, int accountDstId, int MoneyAmount)
        {
            // it's rigth to throw exceptions but it's more clear and easy to deal with without throw and with bool
            var accSrc = BankSystem.GetAccountById(accountSrcId);
            var accDst = BankSystem.GetAccountById(accountDstId);

            if (!this.accountsIds.Contains(accountSrcId))
                return false;

            if (accSrc == null || accDst == null)
                return false;

            if (accSrc.DecreaseAmount(MoneyAmount))
            {
                accDst.IncreaseAmount(MoneyAmount);
            }
            else
            {
                return false;
            }
            return true;
        }

        public bool LeaveSystem()
        {
            return BankSystem.RemoveUser((int)this.id);
        }

        public void ShowPossibleSystemActions()
        {
            if (InfoReqEvent != null)
            {
                string actions = InfoReqEvent();
                Console.WriteLine(actions);
            }
            else
            {
                Console.WriteLine("No answer from system");
            }
        }

        void IMoney.ShowIntefaceActions()
        {
            Console.WriteLine("Take credit\nExchange money\nBank employee is not allowed to do such actions");
        }

        void ISystem.ShowIntefaceActions()
        {
            Console.WriteLine("LeaveSystem\nShowPossibleSystemActions - get possible actions to interact with system");
        }

        protected override void Dispose(bool disposing) {
            if (this.disposed)
                return;

            if (disposing)
            {
                // free managed recourses
                removeAllEventSubscriptions();
            }
            // free unmapped recourses
            // @todo ask

            this.disposed = true;
        }

        private void removeAllEventSubscriptions()
        {
            foreach (Delegate func in InfoReqEvent.GetInvocationList())
            {
                InfoReqEvent -= (SystemUserInfoRequestHandler)func;
            }
        }

        ~BankClient() {
            // log only for demo
            Console.WriteLine($"d-ctor BankClient {this.id}");
            Dispose(false);
        }
    }
    [Serializable]
    class BankEmployee : User, IMoney, ISystem, IDisposable
    {
        public string Position { get; }

        public int SystemUsersCount
        {
            get
            {
                if (this.HasRights)
                {
                    return BankSystem.UsersСount;
                }
                else
                {
                    throw new EmployeeAccessException(new EmployeeAccessExceptionArgs(this, "Current employee has no rights"));
                }
            }
        }

        private Boolean HasRights;

        private event SystemUserInfoRequestHandler InfoReqEvent;


        public override void ShowInfo()
        {
            Console.WriteLine("Employee info-----");
            base.ShowInfo();
            Console.WriteLine($"Position {this.Position}");
            Console.WriteLine("Employee info-----");
        }

        public void ShowInfo(string beginStr, string finishStr)
        {
            Console.WriteLine(beginStr);
            base.ShowInfo();
            Console.WriteLine($"Position {this.Position}");
            Console.WriteLine(finishStr);
        }
        

        // CLEAN CODE
        // in bool its said that functions with more than 2-3 args are depricated
        // but i think its rights to do such a thing in constuctors
        private BankEmployee(string firstName,
                             string lastName,
                             string login,
                             string password,
                             string Position,
                             Boolean HasRights) : base(firstName, lastName, login, password)
        {
            this.Position = Position;
            this.HasRights = HasRights;
            this.InfoReqEvent = new SystemUserInfoRequestHandler(BankSystem.GetEmployeeRigths);
        }

        public static BankEmployee CreateBankEmployee()
        {
            var basicAnswers = User.AnswerQuestions(User.DefaultQuestions);
            string position = String_IO.GetInputOnText("Enter your Position in bank");
            string bankPassword = String_IO.GetHiddenConsoleInput("Enter SUPER SECRET BANK PASSWORD");

            Boolean HasRights = (bankPassword == BankSystem.SecretPassword);

            if (HasRights)
                Console.WriteLine("Corerct password, access given");
            else
                Console.WriteLine("Wrong password, access denied");

            return new BankEmployee(basicAnswers[0], basicAnswers[1], basicAnswers[2], basicAnswers[3], position, HasRights);
        }


        public int TakeCredit(int moneyValue)
        {
            throw new EmployeeAccessException(new EmployeeAccessExceptionArgs(this, "Employee has no rights to take credit"));
        }

        public bool ExchangeMoney(int accountSrcId, int accountDstId, int MoneyAmount)
        {
            if (!this.HasRights)
                throw new EmployeeAccessException(new EmployeeAccessExceptionArgs(this, "Current employee has no rights"));

            var accSrc = BankSystem.GetAccountById(accountSrcId);
            var accDst = BankSystem.GetAccountById(accountDstId);

            if (accSrc == null || accDst == null)
            {
                return false;
            }
            if (accSrc.DecreaseAmount(MoneyAmount))
            {
                accDst.IncreaseAmount(MoneyAmount);
            }
            else
            {
                return false;
            }
            return true;
        }
        


        public bool LeaveSystem()
        {
            return BankSystem.RemoveUser((int)this.id);
        }

        public void ShowPossibleSystemActions()
        {
            if (InfoReqEvent != null)
            {
                string actions = InfoReqEvent();
                Console.WriteLine(actions);
            }
            else
            {
                Console.WriteLine("No answer from system");
            }
        }
        // ISystem

        void IMoney.ShowIntefaceActions()
        {
            Console.WriteLine("Take credit\nExchange money. User is allowed to do this");
        }

        void ISystem.ShowIntefaceActions()
        {
            Console.WriteLine("LeaveSystem\nShowPossibleSystemActions - get possible actions to interact with system");
        }

        protected override void Dispose(bool disposing) {
            if (this.disposed)
                return;

            if (disposing)
            {
                // free managed recourses
                removeAllEventSubscriptions();
            }
            // free unmapped recourses
            // @todo ask

            this.disposed = true;
        }

        private void removeAllEventSubscriptions()
        {
            foreach (Delegate func in InfoReqEvent.GetInvocationList())
            {
                InfoReqEvent -= (SystemUserInfoRequestHandler)func;
            }
        }

        ~BankEmployee() {
            Dispose(false);
            Console.WriteLine($"d-ctor BankEmployee {this.id}");
        }
    }
}