using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JS.AMSWeb.DTO.Shared
{
    public class PaginationDTO
    {
        //public InitDTO InitDTO { get; set; }
        //public SearchDTO SearchDTO { get; set; }

        public int ResultPerPage = 10;
        public int CurrentPage { get; set; } = 1;
        public int TotalResult { get; set; }
        public int CurrentShownResult { get; set; }

        public int TotalPage
        {
            get
            {
                if (TotalResult > 0)
                {
                    var total = int.Parse(Math.Ceiling(TotalResult / double.Parse(ResultPerPage.ToString())).ToString());
                    return total > 0 ? total : 1;
                }
                return 1;
            }
        }

        public int SkipCurrentPageResult
        {
            get
            {
                var skip = (CurrentPage - 1) * ResultPerPage; //10 result per page
                return skip > 0 ? skip : 0;
            }
        }

        public int ShowingFrom
        {
            get
            {
                var from = CurrentPage - 1;
                return CurrentPage > 1 ? from * ResultPerPage + 1 : 1;
            }
        }
        public int ShowingTo
        {
            get
            {
                var to = CurrentPage - 1;
                var x = CurrentPage > 1 ? to * ResultPerPage : 0;
                return x + CurrentShownResult;
            }
        }

        public List<int> TotalPageSelectionShow
        {
            get
            {
                var multiple = int.Parse(Math.Ceiling(CurrentPage / 10M).ToString()) * 10;

                var list = new List<int>();

                for (int i = multiple - 9; i <= multiple; i++)
                {
                    if (i > TotalPage)
                    {
                        break;
                    }

                    list.Add(i);
                }

                return list;
            }
        }

        public int PreviousPage
        {
            get
            {
                var x = CurrentPage - 1;
                if (x <= 0)
                {
                    return 1;
                }
                return CurrentPage - 1;
            }
        }

        public int NextPage
        {
            get
            {
                var x = CurrentPage + 1;
                if (x > TotalPage)
                {
                    return CurrentPage;
                }
                return CurrentPage + 1;
            }
        }

        public int Start
        {
            get
            {
                var x = CurrentPage - 5;
                if (x <= 0)
                {
                    return 1;
                }
                return CurrentPage - 5;
            }
        }

        public int End
        {
            get
            {
                var x = Start + 10;
                if (x > TotalPage)
                {
                    return TotalPage;
                }
                return Start + 9;
            }
        }

        public int Limit
        {
            get
            {
                if (End > 10)
                {
                    return End - 9;
                }
                return 1;
            }
        }
    }
}
