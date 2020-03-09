using System;

namespace test
{

    class A {
        public virtual void M() {
            Console.WriteLine("A.M()");
        }
    }

    class B : A {
        public override void M() {
            Console.WriteLine("B.M()");
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            A a = new B();
            a.M();
        }
    }
}
