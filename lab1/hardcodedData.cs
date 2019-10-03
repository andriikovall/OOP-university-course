using Human;
using System;
using System.Collections.Generic;

namespace Data {
    class BankData {
        public static List<User> users = new List<User>(){
            new User("user1", "lastName1"), 
            new User("user2", "lastName2"), 
            new User("user3", "lastName3"), 
            new User("user4", "lastName4"), 
            new User("user5", "lastName5"), 
        };
        // public static List<User> users = new List<User>(){
        //     new User("user1", "lastName1"), 
        //     new User("user2", "lastName2"), 
        //     new User("user3", "lastName3"), 
        //     new User("user4", "lastName4"), 
        //     new User("user5", "lastName5"), 
        // };
    }
}