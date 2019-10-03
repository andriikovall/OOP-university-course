using System;

namespace AccountNameSpace {
    class Account {
        public readonly long id;
        public readonly string currency;
        public readonly long nextId;
        private long moneyAmount;
        public void IncreaseAmount(long value) => this.moneyAmount += value;
        public void DecreaseAmount(long value) {
            if (value > moneyAmount) {
                Console.WriteLine("Unable to procces transaction");
                Console.WriteLine($"Not enough credits {moneyAmount}");
                return;
            }
            moneyAmount -= value;
        }

        public Account(long moneyAmount, string currency) {
            this.moneyAmount = moneyAmount;
            this.currency = currency;
        }

        public void ShowAmount() {
            Console.WriteLine($"{id} {moneyAmount} {currency}");
        }
    }
}