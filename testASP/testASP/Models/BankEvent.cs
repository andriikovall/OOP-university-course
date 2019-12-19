using System;

using Bank;

namespace BankEvent
{
    // CLEAN CODE - class names should be nouns
    public class BankEventArg : EventArgs
    {
        public Account account;

        public BankEventArg(Account acc)
        {
            // acc because var length should correspond to the scope 
            this.account = acc;
        }

        public BankEventArg() : this(null) { }
    }

    public delegate void AccountHandler(BankEventArg bankArg);

    public delegate string SystemUserInfoRequestHandler();
}