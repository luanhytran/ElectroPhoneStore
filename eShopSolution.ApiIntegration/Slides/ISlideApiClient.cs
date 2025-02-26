using System.Collections.Generic;
using System.Threading.Tasks;
using eShopSolution.ViewModels.Utilities.Slides;

namespace eShopSolution.ApiIntegration.Slides
{
    public interface ISlideApiClient
    {
        Task<List<SlideViewModel>> GetAll();
    }
}
