namespace JS.AMS.Data.Core.Abstractions
{
    public interface IDeleted
    {
        bool IsDeleted { get; set; }
        DateTime? DeletedAt { get; set; }
        string DeletedBy { get; set; }
    }
}
