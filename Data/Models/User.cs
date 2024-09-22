using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class User
    {
        public User()
        {
            Comments = new HashSet<Comment>();
            GroupMemberships = new HashSet<GroupMembership>();
            ProjectDefaultAssigneeNavigations = new HashSet<Project>();
            ProjectProjectLeadNavigations = new HashSet<Project>();
            TicketAssignees = new HashSet<Ticket>();
            TicketReporters = new HashSet<Ticket>();
            TimeTrackings = new HashSet<TimeTracking>();
            TransitionHistories = new HashSet<TransitionHistory>();
        }

        public long Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string? LastName { get; set; }
        public string FullName { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string EmailAddress { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool? IsActive { get; set; }
        public string? UserProfilePictureUrl { get; set; }
        public bool? IsLicensed { get; set; }
        public string? ActiveToken { get; set; }
        public bool IsPersonalAccessTokenCreated { get; set; }
        public long? DirectoryId { get; set; }

        public virtual Directory? Directory { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<GroupMembership> GroupMemberships { get; set; }
        public virtual ICollection<Project> ProjectDefaultAssigneeNavigations { get; set; }
        public virtual ICollection<Project> ProjectProjectLeadNavigations { get; set; }
        public virtual ICollection<Ticket> TicketAssignees { get; set; }
        public virtual ICollection<Ticket> TicketReporters { get; set; }
        public virtual ICollection<TimeTracking> TimeTrackings { get; set; }
        public virtual ICollection<TransitionHistory> TransitionHistories { get; set; }
    }
}
