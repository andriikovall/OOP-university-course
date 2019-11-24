using System;
using System.Collections.Generic;
using System.Collections;

using Human;

namespace CustomUserCollection
{
    public class UserCollection : IEnumerable, IEnumerator
    {
        public int Count { get => _items.Count; }

        private List<User> _items;
        private int _currIndex;

        public UserCollection(int length = 0)
        {
            this._items = new List<User>(length);
            this._currIndex = -1;
        }

        public UserCollection(IEnumerable<User> en) : this()
        {
            this._items = new List<User>(en);
        }

        public void Insert(User user)
        {
            try
            {
                this._items.Add(user);
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
                this._items.Remove(user);
            }
            catch
            {
                Console.WriteLine("Removing Error");
                throw;
            }
        }

        public void Remove(int userId)
        {
            int index = this._items.FindIndex(user => user.id == userId);
            try
            {
                this._items.RemoveAt(index);
            }
            catch
            {
                Console.WriteLine("Removing Error");
                throw;
            }
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return _items.GetEnumerator();
        }

        Object IEnumerator.Current
        {
            get
            {
                try
                {
                    return this._items[_currIndex];
                }
                catch
                {
                    throw new InvalidOperationException("Probably you have forgotten to MoveNext()");
                }
            }
        }

        private bool CurrentIndexIsValid()
        {
            return this._currIndex < this._items.Count && this._currIndex >= 0;
        }

        bool IEnumerator.MoveNext()
        {
            this._currIndex++;
            // CLEAN CODE
            // before
            // bool bool indexIsOk = (this._currIndex < this._items.Count && this._currIndex >= 0);

            // this was done because each func should hava its own abstraction level

            // after
            bool indexIsOk = this.CurrentIndexIsValid();

            if (!indexIsOk)
                _currIndex--;
            return indexIsOk;
        }

        void IEnumerator.Reset()
        {
            this._currIndex = -1;
        }

        private UserCollection GetUsersSearchedBySubstringWithCaseIgnored(string searchString) {
            List<User> foundUsers = this._items.FindAll((user) =>
            {
                return user.FullNameContainsCaseIgnored(searchString);
            });
            return new UserCollection(foundUsers);
        }

        public UserCollection this[string searchString]
        {
            get
            {
                if (searchString == null)
                {
                    throw new ArgumentNullException("Search string is null");
                }
                try
                {
                    // CLEAN CODE
                    // better long names than long code
                    return GetUsersSearchedBySubstringWithCaseIgnored(searchString);
                }
                catch
                {
                    return null;
                }
            }
        }

        public User GetById(int id)
        {
            try
            {
                return this._items.Find(user => user.id == id);
            }
            catch
            {
                return null;
            }
        }


    }

    public static class UserCollectionExtension
    {
        public static int GetBankClientsCount(this UserCollection userCollection)
        {
            return GetCountOfType<BankClient>(userCollection);
        }

        public static int GetBankEmployeesCount(this UserCollection userCollection)
        {
            return GetCountOfType<BankEmployee>(userCollection);
        }

        // CLEAN CODE
        // removed reteated code

        // before
        // private static int GetBankEmployeesCount(this UserCollection userCollection) {
        //     int count = 0;

        //     foreach (User user in userCollection)
        //     {
        //         if (user is BankEmployee) count++;
        //     }
        //     return count;
        // }
        // and the same for BankClient

        private static int GetCountOfType<Type>(this UserCollection userCollection) {
            int count = 0;

            foreach (User user in userCollection)
            {
                if (user is Type) count++;
            }
            return count;
        }
    }
}