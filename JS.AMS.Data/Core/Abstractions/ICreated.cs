namespace JS.AMS.Data.Core.Abstractions
{
    public interface ICreated
    {
        DateTime CreatedAt { get; set; }
        string CreatedBy { get; set; }
    }
}
