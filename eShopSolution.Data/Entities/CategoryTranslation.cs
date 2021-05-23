using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.Data.Entities
{
    public class CategoryTranslation
    {
        public int Id { set; get; }

        public int CategoryId { set; get; }

        public string Name { set; get; }

        public string LanguageId { set; get; }

        public Category Category { get; set; }

        public Language Language { get; set; }
    }
}
