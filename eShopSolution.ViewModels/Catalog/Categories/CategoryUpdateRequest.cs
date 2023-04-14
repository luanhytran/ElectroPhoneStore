using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace eShopSolution.ViewModels.Catalog.Categories
{
    public class CategoryUpdateRequest
    {
        public int Id { set; get; }

        [Display(Name = "Tên danh mục")]
        public string Name { get; set; }
    }
}
