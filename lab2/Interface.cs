using System;


namespace BankUserIntefrace
{

    interface IMoney
    {
        int TakeCredit(int moneyAmount);
        bool ExchangeMoney(int accountSrcId, int accountDstId, int moneyAmount);
        void ICouldntImagineSameMethodSoHereItIs();
    }

    interface ISystem
    {
        bool LeaveSystem();
        void ShowPossibleActions();
        void ICouldntImagineSameMethodSoHereItIs();
    }

}