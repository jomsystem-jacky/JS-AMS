namespace JS.AMS.Data.Core.Abstractions
{
    public interface IAuditable : IEntityId, ICreated, IUpdated, IDeleted, IActive
    {
        byte[] Timestamp { get; set; }
    }
}
