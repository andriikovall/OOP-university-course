using System;
using System.Collections.Generic;

namespace GenericCollection
{
    class Stack<T>
    {

        private int MaxSize = Int32.MaxValue;

        private List<T> items;

        public Stack(List<T> items)
        {
            this.items = items;
        }

        public Stack(T[] val) : this(new List<T>(val))
        {}

        public Stack() : this(new List<T>()) 
        {}

        public void Push(T value)
        {
            if (items.Count >= MaxSize)
                throw new Exception("Stack Overflow Exception =))");
            items.Add(value);
        }

        public T pop()
        {
            if (items.Count == 0) 
                throw new Exception("Stack is empty");
            var removeIndex = items.Count - 1;
            T returnValue = items[removeIndex];
            items.RemoveAt(removeIndex);
            return returnValue;
        }

        public int Count => items.Count;

        public bool isEmpty() {
            return items.Count == 0;
        }
    }
}