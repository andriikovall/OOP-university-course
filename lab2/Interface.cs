using System;


namespace UserClassIntefrace 
{   
    interface IMoney {
        int  TakeCredit(int moneyAmount);
        bool ExchangeMoney(int accountSrcId, int accountDstId);
        void ICouldntImagineSameMethodSoHereItIs();
    }

    interface ISystem {
        bool LeaveSystem();
        bool ShowPossibleActions();
        void ICouldntImagineSameMethodSoHereItIs();
    }

}