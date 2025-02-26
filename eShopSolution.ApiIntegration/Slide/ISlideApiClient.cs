using System.Collections.Generic;
using System.Threading.Tasks;
using eShopSolution.ViewModels.Utilities.Slides;

namespace eShopSolution.ApiIntegration.Slide
{
    public interface ISlideApiClient
    {
        Task<List<SlideViewModel>> GetAll();
    }
}
