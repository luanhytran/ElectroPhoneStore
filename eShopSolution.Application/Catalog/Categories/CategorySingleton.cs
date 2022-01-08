using eShopSolution.Data.EF;
using eShopSolution.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace eShopSolution.Application.Catalog.Categories
{
    public sealed class CategorySingleton
    {
        public static CategorySingleton Instance { get; } = new CategorySingleton();
        public List<Category> ListCategory { get; } = new List<Category>();

        public CategorySingleton()
        {
        }

        public void Init(EShopDbContext context)
        {
            if (ListCategory.Count == 0)
            {
                var categories = context.Categories.ToList();

                foreach (var item in categories)
                {
                    ListCategory.Add(item);
                }
            }
        }
    }
}