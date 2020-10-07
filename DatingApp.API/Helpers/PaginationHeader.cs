namespace DatingApp.API.Helpers
{
    public class PaginationHeader
    {
        public int CurrentPage {get;set;}
        public int ItemsPerPage {get;set;}
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }

        public PaginationHeader(int CurrentPage, int ItemsPerPage, int totalItems, int totalPages)

        {
            this.CurrentPage = CurrentPage;
            this.ItemsPerPage = ItemsPerPage;
            this.TotalItems = totalItems;
            this.TotalPages = totalPages;
        }
    }
}