using System;
using System.Collections.Generic;
using System.Collections;

using Human;

namespace CustomUserCollection
{
    public class UserCollection : IEnumerable, IEnumerator
    {
        public int Count { get { return this.items.Count; } }

        private List<User> items; //@todo ask about LinkedList and so on
        private int currIndex;

        public  List<User> Values {
            get => this.items; 
        }

        public UserCollection(int length = 0)
        {
            this.items = new List<User>(length);
            this.currIndex = 0;
        }

        public UserCollection(IEnumerable<User> en) : this()
        {
            this.items = new List<User>(en);
        }

        public bool Insert(User user)
        {
            try
            {
                this.items.Add(user);
                return true;
            }
            catch
            {
                Console.WriteLine("Insertion Error");
                throw;
            }
        }

        public void Remove(User user)
        {
            try
            {
                this.items.Remove(user);
            }
            catch
            {
                Console.WriteLine("Removing Error");
                throw;
            }
        }

        public void Remove(int userId) {
            int index = this.items.FindIndex(user => user.id == userId);
            try 
            {
                this.items.RemoveAt(index);
            }
            catch 
            {
                Console.WriteLine("Removing Error");
                throw;
            }
        }

        public IEnumerator GetEnumerator()
        {
            return items.GetEnumerator();
        }

        Object IEnumerator.Current
        {
            get { return this.items[currIndex]; }
        }

        bool IEnumerator.MoveNext()
        {
            this.currIndex++;
            var indexIsOk = (this.currIndex < this.items.Count && this.currIndex >= 0);
            if (!indexIsOk)
                currIndex--;
            return indexIsOk;
        }

        void IEnumerator.Reset()
        {
            this.currIndex = 0;
        }

        public User this[string name]
        {
            get
            {
                var nameLowered = name.ToLower();
                try
                {
                    return items.Find((user) =>
                    {
                        return user.FirstName.ToLower().Contains(nameLowered) ||
                                user.LastName.ToLower().Contains(nameLowered) ||
                                user.FullName.ToLower().Contains(nameLowered);
                    });
                }
                catch
                {
                    return null;
                }
            }
        }

        public User getById(int id)
        {
            try
            {
                return this.items.Find(user => user.id == id);
            }
            catch 
            {
                return null;
            }
        }


    }

    public static class UserCollectionExtension
    {
        //no property extension provided
        public static int GetBankClientsCount(this UserCollection userCollection) 
        {
            var users = userCollection.Values;
            int count = 0;
            users.ForEach((user) => {
                if (user is BankClient) count++;
            });
            return count;
        }

        public static int GetBankEmployeesCount(this UserCollection userCollection) 
        {
            var users = userCollection.Values;
            int count = 0;
            users.ForEach((user) => {
                if (user is BankEmployee) count++;
            });
            return count;
        }
    }
}