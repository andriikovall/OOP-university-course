using System;

using Human;

namespace CustomException
{
    class EmployeeAccessExceptionArgs
    {
        public User User;
        public string Message;

        public EmployeeAccessExceptionArgs(string Msg, User user)
        {
            this.Message = Msg;
            this.User = user;
        }

        public EmployeeAccessExceptionArgs(User user, string Msg = "")
        {
            this.Message = Msg;
            this.User = user;
        }
    }

    class EmployeeAccessException : Exception
    {
        public EmployeeAccessExceptionArgs args;
        public EmployeeAccessException(EmployeeAccessExceptionArgs args) : base(args.Message)
        {
            this.args = args;
        }

    }
}