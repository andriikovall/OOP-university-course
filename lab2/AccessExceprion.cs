using System;

using Human;

namespace CustomException {

    class EmployeeAccessException : Exception
    {
        public User User;
        public EmployeeAccessException(string message, User errUser) : base(message)
        {
            this.User = errUser;
        }

        public EmployeeAccessException(User errUser, string message = "") : base(message)
        {
            this.User = errUser;
        }

    }
}