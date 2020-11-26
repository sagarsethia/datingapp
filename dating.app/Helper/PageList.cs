using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace dating.app.Helper
{
    public class PagedList<T>:List<T>
    {  
        // Current Page e.g 1,2,3,4,5
        // Selected by user
        public int CurrentPage { get; set; }
        
        // Current PageSize e.g 5,10,15
        public int PageSize { get; set; }
        
        // Total pages to show on screen
        public int TotalPages { get; set; }
        
        // Total number of items available to us
        public int TotalCount { get; set; }

        public PagedList(List<T> items, int pageSize,int pageNum, int count)
        {
            this.PageSize = pageSize;
            this.CurrentPage = pageNum;
            this.TotalCount = count;
            this.TotalPages = (int)Math.Ceiling(count/(double)pageSize);
            this.AddRange(items);
        }

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T>source,int pageNumber,
         int pageSize)
        {
             int count = await source.CountAsync();
             var item = await source.Skip((pageNumber-1)*pageSize).Take(pageSize).ToListAsync();
             return new PagedList<T>(item,pageSize,pageNumber,count);
        }


    }
}