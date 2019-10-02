using System;
using test;

namespace lab1
{
    class Program
    {
        static void Main(string[] args)
        {
            testClass point = new testClass(1,2);
            Console.WriteLine($"{point.x} {point.y}");
        }
    }
}
