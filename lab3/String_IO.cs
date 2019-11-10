using System;
using System.Text;

namespace Utils
{
    static class String_IO
    {

        public static string GetHiddenConsoleInput(string textBeforeInput = "")
        {
            Console.WriteLine("> " + textBeforeInput);
            StringBuilder input = new StringBuilder();
            while (true)
            {
                var key = Console.ReadKey(true);
                if (key.Key == ConsoleKey.Enter) break;
                if (key.Key == ConsoleKey.Backspace && input.Length > 0) input.Remove(input.Length - 1, 1);
                else if (key.Key != ConsoleKey.Backspace) input.Append(key.KeyChar);
            }
            return input.ToString();
        }

        public static string GetInputOnText(string textBeforeInput = "")
        {
            Console.WriteLine("> " + textBeforeInput);
            return Console.ReadLine();
        }

        public static string strFirstCharToUpper(string str)
        {
            if (str.Length == 0) return str;
            var strBuilder = new System.Text.StringBuilder(str);
            strBuilder[0] = Char.ToUpper(strBuilder[0]);
            return strBuilder.ToString();
        }
    }
}