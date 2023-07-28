namespace JS.AMSWeb.Utils
{
    public static class PaginationHelper
    {
        public static int PaginationCurrentPage(int current, int total)
        {
            return current <= total ? current : total;
        }
    }
}
