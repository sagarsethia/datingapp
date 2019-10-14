using System;

namespace dating.app.Helper
{
    public static class ExtensionMethods
    {
        public static int CalulateAge(this DateTime dateTime){
            var age = DateTime.Today.Year - dateTime.Year;
            return age;
        }
        
    }
}