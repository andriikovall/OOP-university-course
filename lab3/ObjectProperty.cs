using System;
using System.Collections.Generic;

namespace Property
{
    class PropertyTypeCollection<T>
    {
        public Dictionary<string, string> Properties { get; }

        public PropertyTypeCollection(T obj)
        {
            foreach (var prop in obj.GetType().GetProperties())
            {
                var name = prop.Name;
                object value = prop.GetValue(obj, null);

                Properties = new Dictionary<string, string>();
                Properties.Add(name, value.ToString());
            }
        }

        public void logProperties() {
            foreach(var key in Properties.Keys) {
                Console.WriteLine($"{key}: {Properties[key]}");
            }
        }

        public object DefaultObjValue => default(T);

    }
}