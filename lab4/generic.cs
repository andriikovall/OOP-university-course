using System;

using BankUserIntefrace;

namespace Generic {
    class CustomGeneric<T>  where T : ISystem, IMoney{

        private Object Obj;

        public CustomGeneric(T obj) {
            this.Obj = obj;
        }

        public void getAllPossibilities() {
            Console.WriteLine("System actions");
            ((ISystem)this.Obj).ShowPossibleSystemActions();
            Console.WriteLine("Inerface actions\n");
            ((ISystem)this.Obj).ShowIntefaceActions();
            Console.WriteLine("Inerface actions");
        }
    }
}