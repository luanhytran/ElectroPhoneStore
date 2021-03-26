using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.ViewModels.Common
{
    // Lớp cha của lớp PagedResult
    public class PagedResultBase
    {
        public int PageIndex { get; set; }

        // Số sản phẩm mà 1 trang sẽ hiển thị
        public int PageSize { get; set; }
        public int TotalRecords { get; set; }
        public int PageCount
        {
            get
            {
                var pageCount = (double)TotalRecords / PageSize;
                // Làm tròn pageCount
                return (int)Math.Ceiling(pageCount);
            }
        }
    }
}
