namespace JS.AMS.Data.Core.Abstractions
{
    public interface IUpdated
    {
        DateTime? UpdatedAt { get; set; }
        string UpdatedBy { get; set; }
    }
}