using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Data.Models;
using Directory = Data.Models.Directory;

namespace Data.DatabaseContext
{
    public partial class Resolve360Context : DbContext
    {
        public Resolve360Context()
        {
        }

        public Resolve360Context(DbContextOptions<Resolve360Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Comment> Comments { get; set; } = null!;
        public virtual DbSet<Condition> Conditions { get; set; } = null!;
        public virtual DbSet<ConditionType> ConditionTypes { get; set; } = null!;
        public virtual DbSet<Context> Contexts { get; set; } = null!;
        public virtual DbSet<ContextValue> ContextValues { get; set; } = null!;
        public virtual DbSet<CustomField> CustomFields { get; set; } = null!;
        public virtual DbSet<CustomFieldOption> CustomFieldOptions { get; set; } = null!;
        public virtual DbSet<CustomFieldValue> CustomFieldValues { get; set; } = null!;
        public virtual DbSet<CustomerPortalGlobalConfig> CustomerPortalGlobalConfigs { get; set; } = null!;
        public virtual DbSet<Directory> Directories { get; set; } = null!;
        public virtual DbSet<Group> Groups { get; set; } = null!;
        public virtual DbSet<GroupMembership> GroupMemberships { get; set; } = null!;
        public virtual DbSet<NotificationBatch> NotificationBatches { get; set; } = null!;
        public virtual DbSet<NotificationTo> NotificationTos { get; set; } = null!;
        public virtual DbSet<NotificationTrigger> NotificationTriggers { get; set; } = null!;
        public virtual DbSet<Organization> Organizations { get; set; } = null!;
        public virtual DbSet<Permission> Permissions { get; set; } = null!;
        public virtual DbSet<PermissionBatch> PermissionBatches { get; set; } = null!;
        public virtual DbSet<PermissionBatchMapping> PermissionBatchMappings { get; set; } = null!;
        public virtual DbSet<PermissionTo> PermissionTos { get; set; } = null!;
        public virtual DbSet<PostFunctionType> PostFunctionTypes { get; set; } = null!;
        public virtual DbSet<Postfunction> Postfunctions { get; set; } = null!;
        public virtual DbSet<Priority> Priorities { get; set; } = null!;
        public virtual DbSet<PriorityBatch> PriorityBatches { get; set; } = null!;
        public virtual DbSet<PriorityBatchAssociation> PriorityBatchAssociations { get; set; } = null!;
        public virtual DbSet<PriorityBatchMapping> PriorityBatchMappings { get; set; } = null!;
        public virtual DbSet<Project> Projects { get; set; } = null!;
        public virtual DbSet<ProjectRole> ProjectRoles { get; set; } = null!;
        public virtual DbSet<Resolution> Resolutions { get; set; } = null!;
        public virtual DbSet<Screen> Screens { get; set; } = null!;
        public virtual DbSet<ScreenBatch> ScreenBatches { get; set; } = null!;
        public virtual DbSet<ScreenContent> ScreenContents { get; set; } = null!;
        public virtual DbSet<Status> Statuses { get; set; } = null!;
        public virtual DbSet<Ticket> Tickets { get; set; } = null!;
        public virtual DbSet<TicketEvent> TicketEvents { get; set; } = null!;
        public virtual DbSet<TicketSecurity> TicketSecurities { get; set; } = null!;
        public virtual DbSet<TicketSecurityBatch> TicketSecurityBatches { get; set; } = null!;
        public virtual DbSet<TicketType> TicketTypes { get; set; } = null!;
        public virtual DbSet<TicketTypeBatch> TicketTypeBatches { get; set; } = null!;
        public virtual DbSet<TicketTypeBatchAssociation> TicketTypeBatchAssociations { get; set; } = null!;
        public virtual DbSet<TicketTypeBatchMapping> TicketTypeBatchMappings { get; set; } = null!;
        public virtual DbSet<TicketTypeScreenBatch> TicketTypeScreenBatches { get; set; } = null!;
        public virtual DbSet<TicketTypeScreenBatchMapping> TicketTypeScreenBatchMappings { get; set; } = null!;
        public virtual DbSet<TicketTypeScreenBatchProjectMapping> TicketTypeScreenBatchProjectMappings { get; set; } = null!;
        public virtual DbSet<TimeTracking> TimeTrackings { get; set; } = null!;
        public virtual DbSet<Transition> Transitions { get; set; } = null!;
        public virtual DbSet<TransitionHistory> TransitionHistories { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<Validator> Validators { get; set; } = null!;
        public virtual DbSet<ValidatorType> ValidatorTypes { get; set; } = null!;
        public virtual DbSet<WorkSchedule> WorkSchedules { get; set; } = null!;
        public virtual DbSet<Workflow> Workflows { get; set; } = null!;
        public virtual DbSet<WorkflowBatch> WorkflowBatches { get; set; } = null!;
        public virtual DbSet<WorkflowBatchAssociation> WorkflowBatchAssociations { get; set; } = null!;
        public virtual DbSet<WorkflowBatchMapping> WorkflowBatchMappings { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=resolve360.database.windows.net;Database=resolve360;Uid=satya2256;Pwd=JiraConf@123");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comment>(entity =>
            {
                entity.ToTable("Comment");

                entity.Property(e => e.CommentBody).IsUnicode(false);

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.CommentedByNavigation)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.CommentedBy)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment_User");

                entity.HasOne(d => d.Ticket)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.TicketId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment_Ticket");
            });

            modelBuilder.Entity<Condition>(entity =>
            {
                entity.ToTable("Condition");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Parameters).IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.ConditionType)
                    .WithMany(p => p.Conditions)
                    .HasForeignKey(d => d.ConditionTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Condition_ConditionType");

                entity.HasOne(d => d.Transition)
                    .WithMany(p => p.Conditions)
                    .HasForeignKey(d => d.TransitionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Condition_Transition");
            });

            modelBuilder.Entity<ConditionType>(entity =>
            {
                entity.ToTable("ConditionType");

                entity.HasIndex(e => e.Name, "UQ_ConditionTypeName")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Context>(entity =>
            {
                entity.ToTable("Context");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<ContextValue>(entity =>
            {
                entity.ToTable("ContextValue");

                entity.Property(e => e.ChildValue)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.ParentValue)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.Property(e => e.Xmlorjson)
                    .IsUnicode(false)
                    .HasColumnName("XMLORJSON");

                entity.HasOne(d => d.Context)
                    .WithMany(p => p.ContextValues)
                    .HasForeignKey(d => d.ContextId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ContextValue_Context");
            });

            modelBuilder.Entity<CustomField>(entity =>
            {
                entity.ToTable("CustomField");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<CustomFieldOption>(entity =>
            {
                entity.ToTable("CustomFieldOption");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.IsEnabled)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.Property(e => e.Xmlorjsonid).HasColumnName("XMLORJSONId");

                entity.HasOne(d => d.ChildValue)
                    .WithMany(p => p.CustomFieldOptionChildValues)
                    .HasForeignKey(d => d.ChildValueId)
                    .HasConstraintName("FK_CustomFieldOption_ContextValue_Child");

                entity.HasOne(d => d.Context)
                    .WithMany(p => p.CustomFieldOptions)
                    .HasForeignKey(d => d.ContextId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CustomFieldOption_Context");

                entity.HasOne(d => d.CustomField)
                    .WithMany(p => p.CustomFieldOptions)
                    .HasForeignKey(d => d.CustomFieldId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CustomFieldOption_CustomField");

                entity.HasOne(d => d.ParentValue)
                    .WithMany(p => p.CustomFieldOptionParentValues)
                    .HasForeignKey(d => d.ParentValueId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CustomFieldOption_ContextValue_Parent");
            });

            modelBuilder.Entity<CustomFieldValue>(entity =>
            {
                entity.ToTable("CustomFieldValue");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.CustomField)
                    .WithMany(p => p.CustomFieldValues)
                    .HasForeignKey(d => d.CustomFieldId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CustomFieldValue_CustomField");

                entity.HasOne(d => d.CustomFieldOption)
                    .WithMany(p => p.CustomFieldValues)
                    .HasForeignKey(d => d.CustomFieldOptionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CustomFieldValue_CustomFieldOption");

                entity.HasOne(d => d.Ticket)
                    .WithMany(p => p.CustomFieldValues)
                    .HasForeignKey(d => d.TicketId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CustomFieldValue_Ticket");
            });

            modelBuilder.Entity<CustomerPortalGlobalConfig>(entity =>
            {
                entity.ToTable("CustomerPortalGlobalConfig");

                entity.HasIndex(e => e.Title, "UQ_CustomerPortalGlobalConfig_Name")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.FooterHtml).HasColumnName("FooterHTML");

                entity.Property(e => e.HeaderHtml).HasColumnName("HeaderHTML");

                entity.Property(e => e.Title)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<Directory>(entity =>
            {
                entity.ToTable("Directory");

                entity.HasIndex(e => e.Name, "IX_Directory")
                    .IsUnique();

                entity.HasIndex(e => e.Name, "UQ_DirectoryName")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<Group>(entity =>
            {
                entity.ToTable("Group");

                entity.HasIndex(e => e.Name, "UQ_GroupName")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.Directory)
                    .WithMany(p => p.Groups)
                    .HasForeignKey(d => d.DirectoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Group_Directory");
            });

            modelBuilder.Entity<GroupMembership>(entity =>
            {
                entity.ToTable("GroupMembership");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.GroupMemberships)
                    .HasForeignKey(d => d.GroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GroupMembership_Group");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.GroupMemberships)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GroupMembership_User");
            });

            modelBuilder.Entity<NotificationBatch>(entity =>
            {
                entity.ToTable("NotificationBatch");

                entity.HasIndex(e => e.Name, "UQ_NNotificationBatch_Name")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<NotificationTo>(entity =>
            {
                entity.ToTable("NotificationTo");

                entity.HasIndex(e => e.Name, "UQ_NotificationTo_Name")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<NotificationTrigger>(entity =>
            {
                entity.ToTable("NotificationTrigger");

                entity.HasIndex(e => e.Name, "UQ_NotificationTrigger_Name")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<Organization>(entity =>
            {
                entity.ToTable("Organization");

                entity.HasIndex(e => e.Name, "UQ_Organization_Name")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<Permission>(entity =>
            {
                entity.ToTable("Permission");

                entity.HasIndex(e => e.Name, "UQ_Permission_Name")
                    .IsUnique();

                entity.Property(e => e.Category)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<PermissionBatch>(entity =>
            {
                entity.ToTable("PermissionBatch");

                entity.HasIndex(e => e.Name, "UQ_PermissionBatch_Name")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<PermissionBatchMapping>(entity =>
            {
                entity.ToTable("PermissionBatchMapping");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.PermissionBatch)
                    .WithMany(p => p.PermissionBatchMappings)
                    .HasForeignKey(d => d.PermissionBatchId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PermissionBatchMapping_PermissionBatch");

                entity.HasOne(d => d.Permission)
                    .WithMany(p => p.PermissionBatchMappings)
                    .HasForeignKey(d => d.PermissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PermissionBatchMapping_Permission");

                entity.HasOne(d => d.PermissionTo)
                    .WithMany(p => p.PermissionBatchMappings)
                    .HasForeignKey(d => d.PermissionToId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PermissionBatchMapping_PermissionTo");
            });

            modelBuilder.Entity<PermissionTo>(entity =>
            {
                entity.ToTable("PermissionTo");

                entity.HasIndex(e => e.Name, "UQ_PermissionTo_Name")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<PostFunctionType>(entity =>
            {
                entity.ToTable("PostFunctionType");

                entity.HasIndex(e => e.Name, "UQ_PostFunctionName")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Postfunction>(entity =>
            {
                entity.ToTable("Postfunction");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Parameters).IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.PostfunctionType)
                    .WithMany(p => p.Postfunctions)
                    .HasForeignKey(d => d.PostfunctionTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Postfunction_PostfunctionType");

                entity.HasOne(d => d.Transition)
                    .WithMany(p => p.Postfunctions)
                    .HasForeignKey(d => d.TransitionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Postfunction_Transition");
            });

            modelBuilder.Entity<Priority>(entity =>
            {
                entity.ToTable("Priority");

                entity.HasIndex(e => e.Name, "UQ_PriorityName")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PriorityColorHtmlcode)
                    .HasMaxLength(10)
                    .HasColumnName("PriorityColorHTMLCode")
                    .IsFixedLength();

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<PriorityBatch>(entity =>
            {
                entity.ToTable("PriorityBatch");

                entity.HasIndex(e => e.Name, "UQ_PriorityBatch_Name")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<PriorityBatchAssociation>(entity =>
            {
                entity.ToTable("PriorityBatchAssociation");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.PriorityBatch)
                    .WithMany(p => p.PriorityBatchAssociations)
                    .HasForeignKey(d => d.PriorityBatchId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PriorityBatchAssociation_PriorityBatch");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.PriorityBatchAssociations)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PriorityBatchAssociation_Project");
            });

            modelBuilder.Entity<PriorityBatchMapping>(entity =>
            {
                entity.ToTable("PriorityBatchMapping");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.PriorityBatch)
                    .WithMany(p => p.PriorityBatchMappings)
                    .HasForeignKey(d => d.PriorityBatchId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PriorityBatchMapping_PriorityBatch");

                entity.HasOne(d => d.Priority)
                    .WithMany(p => p.PriorityBatchMappings)
                    .HasForeignKey(d => d.PriorityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PriorityBatchMapping_Priority");
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.ToTable("Project");

                entity.HasIndex(e => e.ProjectKey, "UQ_ProjectKey")
                    .IsUnique();

                entity.HasIndex(e => e.Name, "UQ_Projectname")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ProjectKey)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ProjectLogoUrl).IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.DefaultAssigneeNavigation)
                    .WithMany(p => p.ProjectDefaultAssigneeNavigations)
                    .HasForeignKey(d => d.DefaultAssignee)
                    .HasConstraintName("FK_Project_User_Assignee");

                entity.HasOne(d => d.ProjectLeadNavigation)
                    .WithMany(p => p.ProjectProjectLeadNavigations)
                    .HasForeignKey(d => d.ProjectLead)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Project_User");
            });

            modelBuilder.Entity<ProjectRole>(entity =>
            {
                entity.ToTable("ProjectRole");

                entity.HasIndex(e => e.Name, "UQ_ProjectRoles_Name")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<Resolution>(entity =>
            {
                entity.ToTable("Resolution");

                entity.HasIndex(e => e.Name, "UQ_Resolution_Name")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<Screen>(entity =>
            {
                entity.ToTable("Screen");

                entity.HasIndex(e => e.Name, "UQ_Screen_Name")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<ScreenBatch>(entity =>
            {
                entity.ToTable("ScreenBatch");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.Operation)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.Screen)
                    .WithMany(p => p.ScreenBatches)
                    .HasForeignKey(d => d.ScreenId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ScreenBatch_Screen");
            });

            modelBuilder.Entity<ScreenContent>(entity =>
            {
                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.Screen)
                    .WithMany(p => p.ScreenContents)
                    .HasForeignKey(d => d.ScreenId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ScreenContents_Screen");
            });

            modelBuilder.Entity<Status>(entity =>
            {
                entity.ToTable("Status");

                entity.HasIndex(e => e.Name, "UQ_StatusName")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.StatusCategory).HasMaxLength(50);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<Ticket>(entity =>
            {
                entity.ToTable("Ticket");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.ResolutionDate).HasColumnType("datetime");

                entity.Property(e => e.Summary)
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.Assignee)
                    .WithMany(p => p.TicketAssignees)
                    .HasForeignKey(d => d.AssigneeId)
                    .HasConstraintName("FK_Ticket_User_Assignee");

                entity.HasOne(d => d.CurrentStatus)
                    .WithMany(p => p.Tickets)
                    .HasForeignKey(d => d.CurrentStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Ticket_Status");

                entity.HasOne(d => d.Priority)
                    .WithMany(p => p.Tickets)
                    .HasForeignKey(d => d.PriorityId)
                    .HasConstraintName("FK_Ticket_Priority");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.Tickets)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Ticket_Project");

                entity.HasOne(d => d.Reporter)
                    .WithMany(p => p.TicketReporters)
                    .HasForeignKey(d => d.ReporterId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Ticket_User_Reporter");

                entity.HasOne(d => d.Resolution)
                    .WithMany(p => p.Tickets)
                    .HasForeignKey(d => d.ResolutionId)
                    .HasConstraintName("FK_Ticket_Resolution");

                entity.HasOne(d => d.Workflow)
                    .WithMany(p => p.Tickets)
                    .HasForeignKey(d => d.WorkflowId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Ticket_Workflow");
            });

            modelBuilder.Entity<TicketEvent>(entity =>
            {
                entity.ToTable("TicketEvent");

                entity.HasIndex(e => e.Name, "UQ_TicketEvent_Name")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<TicketSecurity>(entity =>
            {
                entity.ToTable("TicketSecurity");

                entity.HasIndex(e => e.Name, "UQ_TicketSecurity_Name")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<TicketSecurityBatch>(entity =>
            {
                entity.ToTable("TicketSecurityBatch");

                entity.HasIndex(e => e.Name, "UQ_TicketSecurityBatchName")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<TicketType>(entity =>
            {
                entity.ToTable("TicketType");

                entity.HasIndex(e => e.Name, "IX_TicketType")
                    .IsUnique();

                entity.HasIndex(e => e.Name, "UQ_TicketTypeName")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<TicketTypeBatch>(entity =>
            {
                entity.ToTable("TicketTypeBatch");

                entity.HasIndex(e => e.Name, "UQ_Name")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<TicketTypeBatchAssociation>(entity =>
            {
                entity.ToTable("TicketTypeBatchAssociation");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.TicketTypeBatchAssociations)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TicketTypeBatchAssociation_Project");

                entity.HasOne(d => d.TicketTypeBatch)
                    .WithMany(p => p.TicketTypeBatchAssociations)
                    .HasForeignKey(d => d.TicketTypeBatchId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TicketTypeBatchAssociation_TicketTypeBatch");
            });

            modelBuilder.Entity<TicketTypeBatchMapping>(entity =>
            {
                entity.ToTable("TicketTypeBatchMapping");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.TicketTypeBatch)
                    .WithMany(p => p.TicketTypeBatchMappings)
                    .HasForeignKey(d => d.TicketTypeBatchId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TicketTypeBatchMapping_TicketTypeBatch");

                entity.HasOne(d => d.TicketType)
                    .WithMany(p => p.TicketTypeBatchMappings)
                    .HasForeignKey(d => d.TicketTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TicketTypeBatchMapping_TicketType");
            });

            modelBuilder.Entity<TicketTypeScreenBatch>(entity =>
            {
                entity.ToTable("TicketTypeScreenBatch");

                entity.HasIndex(e => e.Name, "UQ_TicketTypeScreenBatchName")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<TicketTypeScreenBatchMapping>(entity =>
            {
                entity.ToTable("TicketTypeScreenBatchMapping");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.ScreenBatch)
                    .WithMany(p => p.TicketTypeScreenBatchMappings)
                    .HasForeignKey(d => d.ScreenBatchId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TicketTypeScreenBatchMapping_Screen");

                entity.HasOne(d => d.TicketType)
                    .WithMany(p => p.TicketTypeScreenBatchMappings)
                    .HasForeignKey(d => d.TicketTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TicketTypeScreenBatchMapping_TicketTypeBatch");
            });

            modelBuilder.Entity<TicketTypeScreenBatchProjectMapping>(entity =>
            {
                entity.ToTable("TicketTypeScreenBatchProjectMapping");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.TicketTypeScreenBatchProjectMappings)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TicketTypeScreenBatchProjectMapping_Project");

                entity.HasOne(d => d.TicketTypeScreenBatch)
                    .WithMany(p => p.TicketTypeScreenBatchProjectMappings)
                    .HasForeignKey(d => d.TicketTypeScreenBatchId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TicketTypeScreenBatchProjectMapping_TicketTypeScreenBatch");
            });

            modelBuilder.Entity<TimeTracking>(entity =>
            {
                entity.ToTable("TimeTracking");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.LogDescription).IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.Ticket)
                    .WithMany(p => p.TimeTrackings)
                    .HasForeignKey(d => d.TicketId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TimeTracking_Ticket");

                entity.HasOne(d => d.TimeLoggedByNavigation)
                    .WithMany(p => p.TimeTrackings)
                    .HasForeignKey(d => d.TimeLoggedBy)
                    .HasConstraintName("FK_TimeTracking_User");
            });

            modelBuilder.Entity<Transition>(entity =>
            {
                entity.ToTable("Transition");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.FromStatus)
                    .WithMany(p => p.TransitionFromStatuses)
                    .HasForeignKey(d => d.FromStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Transition_Status_From");

                entity.HasOne(d => d.ToStatus)
                    .WithMany(p => p.TransitionToStatuses)
                    .HasForeignKey(d => d.ToStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Transition_Status_To");

                entity.HasOne(d => d.TransitionScreen)
                    .WithMany(p => p.Transitions)
                    .HasForeignKey(d => d.TransitionScreenId)
                    .HasConstraintName("FK_Transition_Screen");

                entity.HasOne(d => d.Workflow)
                    .WithMany(p => p.Transitions)
                    .HasForeignKey(d => d.WorkflowId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Transition_Workflow");
            });

            modelBuilder.Entity<TransitionHistory>(entity =>
            {
                entity.ToTable("TransitionHistory");

                entity.Property(e => e.TransitionDate).HasColumnType("datetime");

                entity.HasOne(d => d.FromStatus)
                    .WithMany(p => p.TransitionHistoryFromStatuses)
                    .HasForeignKey(d => d.FromStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TransitionHistory_Status_From");

                entity.HasOne(d => d.Ticket)
                    .WithMany(p => p.TransitionHistories)
                    .HasForeignKey(d => d.TicketId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TransitionHistory_Ticket");

                entity.HasOne(d => d.ToStatus)
                    .WithMany(p => p.TransitionHistoryToStatuses)
                    .HasForeignKey(d => d.ToStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TransitionHistory_Status_To");

                entity.HasOne(d => d.TransitionedByNavigation)
                    .WithMany(p => p.TransitionHistories)
                    .HasForeignKey(d => d.TransitionedBy)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TransitionHistory_User");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.HasIndex(e => e.EmailAddress, "UQ_User_EmailAddress")
                    .IsUnique();

                entity.HasIndex(e => e.UserName, "UQ_User_UserName")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.EmailAddress).HasMaxLength(50);

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.Property(e => e.UserName).HasMaxLength(50);

                entity.HasOne(d => d.Directory)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.DirectoryId)
                    .HasConstraintName("FK_User_Directory");
            });

            modelBuilder.Entity<Validator>(entity =>
            {
                entity.ToTable("Validator");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Parameters).IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.Transition)
                    .WithMany(p => p.Validators)
                    .HasForeignKey(d => d.TransitionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Validator_Transition");

                entity.HasOne(d => d.ValidatorType)
                    .WithMany(p => p.Validators)
                    .HasForeignKey(d => d.ValidatorTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Validator_ValidatorType");
            });

            modelBuilder.Entity<ValidatorType>(entity =>
            {
                entity.ToTable("ValidatorType");

                entity.HasIndex(e => e.Name, "UQ_ValidatorTypeName")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<WorkSchedule>(entity =>
            {
                entity.ToTable("WorkSchedule");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<Workflow>(entity =>
            {
                entity.ToTable("Workflow");

                entity.HasIndex(e => e.Name, "UQ_Workflow_Name")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.IsDraft)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<WorkflowBatch>(entity =>
            {
                entity.ToTable("WorkflowBatch");

                entity.HasIndex(e => e.Name, "UQ_WorkflowBatch_Name")
                    .IsUnique();

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updated).HasColumnType("datetime");
            });

            modelBuilder.Entity<WorkflowBatchAssociation>(entity =>
            {
                entity.ToTable("WorkflowBatchAssociation");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.WorkflowBatchAssociations)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WorkflowBatchAssociation_Project");

                entity.HasOne(d => d.WorkflowBatch)
                    .WithMany(p => p.WorkflowBatchAssociations)
                    .HasForeignKey(d => d.WorkflowBatchId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WorkflowBatchAssociation_WorkflowBatch");
            });

            modelBuilder.Entity<WorkflowBatchMapping>(entity =>
            {
                entity.ToTable("WorkflowBatchMapping");

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Updated).HasColumnType("datetime");

                entity.HasOne(d => d.TicketType)
                    .WithMany(p => p.WorkflowBatchMappings)
                    .HasForeignKey(d => d.TicketTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WorkflowBatchMapping_TicketType");

                entity.HasOne(d => d.WorkflowBatch)
                    .WithMany(p => p.WorkflowBatchMappings)
                    .HasForeignKey(d => d.WorkflowBatchId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WorkflowBatchMapping_WorkflowBatch");

                entity.HasOne(d => d.Workflow)
                    .WithMany(p => p.WorkflowBatchMappings)
                    .HasForeignKey(d => d.WorkflowId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WorkflowBatchMapping_Workflow");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
