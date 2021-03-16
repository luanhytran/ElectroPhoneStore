using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.Application.Dtos
{
    public class PagedViewModel<T>
    {
        public List<T> Items { get; set; }
        public int TotalRecord { get; set; }
    }
}
