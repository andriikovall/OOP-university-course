using System;

using Bank;

namespace BankEvent
{
    public class BankEventArg : EventArgs
    {
        public Account account;

        public BankEventArg(Account acc)
        {
            this.account = acc;
        }

        public BankEventArg() : this(null) { }
    }

    public delegate void AccountHandle(BankEventArg bankArg);
}