namespace BankUserIntefrace
{
    interface IMoney
    {
        int  TakeCredit(int moneyAmount);
        bool ExchangeMoney(int accountSrcId, int accountDstId, int moneyAmount);
        void ShowIntefaceActions();
    }

    interface ISystem
    {
        bool LeaveSystem();
        void ShowPossibleSystemActions();
        void ShowIntefaceActions();
    }
}