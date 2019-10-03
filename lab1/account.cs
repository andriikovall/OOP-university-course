using System;

namespace Account {
    class Account {
        public readonly long id;
        public readonly string currency;
        private long amount;
        public void IncreaseAmount(long value) => this.amount += value;
        public void DecreaseAmount(long value) {
            if (value > amount) {
                Console.WriteLine("Unable to procces transaction");
                Console.WriteLine("Not enough credits amount");
                return;
            }
            amount -= value;
        }

        private void showAmount() {
            Console.WriteLine($"{id} {amount} {currency}");
        }
    }
}