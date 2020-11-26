using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace dating.app.Helper
{
    public static class ExtensionMethods
    {
        public static int CalulateAge(this DateTime dateTime){
            var age = DateTime.Today.Year - dateTime.Year;
            return age;
        }

        public static void AddPagination(this HttpResponse response, int currentPage, int itemPerPage,
         int totalPage,int totalItem){
              var paginationHeader= new PaginationHeader(currentPage,itemPerPage,totalPage,totalItem);
              response.Headers.Add("PaginationHeader",JsonConvert.SerializeObject(paginationHeader));
              response.Headers.Add("Access-Control-Expose-Headers","PaginationHeader");
         }
        
    }
}