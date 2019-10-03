using System;

namespace Human {
    // basic user with no rights
    class User {
        public readonly long id;
        public readonly string firstName;
        public readonly string lastName;
        public static long nextId;


        static User() {
            nextId = 1;
        }
        public User() {
            this.id = nextId++;
            this.firstName = "";
            this.lastName = "";
        }
        public User(long id, string firstName = "", string lastName = "") {
            if (id < nextId) {
                Console.WriteLine($"Unable to create user with id {id}");
                Console.WriteLine($"Assigning id value {nextId}");
                id = nextId;
            }
            this.id = id;
            long newNextId = id + 1;
            nextId = newNextId;

            this.firstName = firstName;
            this.lastName = lastName;
        }
        public string fullName {
            get { return $"{this.firstName} {this.lastName}";}
        }
        public virtual void ShowInfo() {
            Console.WriteLine($"{this.id} - '{this.fullName}'");
        }
    }

}