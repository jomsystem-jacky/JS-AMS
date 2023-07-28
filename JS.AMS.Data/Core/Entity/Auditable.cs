using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using JS.AMS.Data.Core.Abstractions;

namespace JS.AMS.Data.Core.Entity
{
    public abstract class Auditable : IAuditable, IEntityId, ICreated, IUpdated, IDeleted, IActive
    {
        public DateTime CreatedAt { get; set; }

        public string CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public string UpdatedBy { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedAt { get; set; }

        public string DeletedBy { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Timestamp]
        public byte[] Timestamp { get; set; }

        public bool Active { get; set; }
    }
}
