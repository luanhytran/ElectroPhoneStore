using eShopSolution.Data.Entities;
using System.Collections.Generic;

namespace eShopSolution.Application.Catalog.Orders
{
    public interface IIterator
    {
        // Reset to first element
        OrderDetail First();

        // Get next element
        OrderDetail Next();

        // End of collection check
        bool IsCollectionEnds { get; }

        // Retrieve Current Item
        OrderDetail CurrentItem { get; }
    }

    public class OrderIterator : IIterator
    {
        private List<OrderDetail> Subjects;
        int current = 0;
        int step = 1;

        public OrderIterator(List<OrderDetail> subjects)
        {
            Subjects = subjects;
        }

        public OrderDetail CurrentItem => Subjects[current];

        // Reset the pointer to the first element before you start traversing a data structure.
        public OrderDetail First()
        {
            current = 0;
            if (Subjects.Count > 0)
                return Subjects[current];
            return null;
        }

        public bool IsCollectionEnds
        {
            get { return current >= Subjects.Count; }
        }

        public OrderDetail Next()
        {
            current += step;
            if (!IsCollectionEnds)
                return Subjects[current++];
            else
                return null;
        }
    }
}
