using eShopSolution.ViewModels.System.Languages;
using eShopSolution.ViewModels.Utilities.Slides;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolution.AdminApp.Models
{
    public class NavigationViewModel
    {
        public List<SlideViewModel> Languages { get; set; }

        public string CurrentLanguageId { get; set; }
    }
}