using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    public partial class test : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConditionType",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Parameters = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConditionType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Context",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Context", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CustomerPortalGlobalConfig",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PortalLogoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PortalCoverLogoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Announcement = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HeaderHTML = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FooterHTML = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerPortalGlobalConfig", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CustomField",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsArchived = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomField", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Directory",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Directory", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NotificationBatch",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsAssociactedToAnyProject = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationBatch", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NotificationTo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationTo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NotificationTrigger",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationTrigger", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Organization",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organization", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Permission",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Category = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permission", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PermissionBatch",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsAssociatedtoAnyProject = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionBatch", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PermissionTo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionTo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PostFunctionType",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Parameters = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostFunctionType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Priority",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AvatarUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PriorityColorHTMLCode = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: true),
                    SequenceNumber = table.Column<long>(type: "bigint", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Priority", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PriorityBatch",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsAssociatedToAnyProject = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PriorityBatch", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProjectRole",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectRole", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Resolution",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resolution", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Screen",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsAssociatedToAnyBatch = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Screen", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Status",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    StatusCategory = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Status", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TicketEvent",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketEvent", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TicketSecurity",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketSecurity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TicketSecurityBatch",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsAssociatedToAnyProject = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketSecurityBatch", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TicketType",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AvatarUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TicketTypeBatch",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsAssociatedtoAnyProject = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketTypeBatch", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TicketTypeScreenBatch",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsAssociatedToAnyProject = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketTypeScreenBatch", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ValidatorType",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Parameters = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ValidatorType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Workflow",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsDraft = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workflow", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WorkflowBatch",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsAssociatedToAnyProject = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkflowBatch", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WorkSchedule",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkingHoursPerDay = table.Column<long>(type: "bigint", nullable: false),
                    NoOfWorkingDaysPerWeek = table.Column<short>(type: "smallint", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkSchedule", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ContextValue",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContextId = table.Column<long>(type: "bigint", nullable: false),
                    ParentValue = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    ChildValue = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    XMLORJSON = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContextValue", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContextValue_Context",
                        column: x => x.ContextId,
                        principalTable: "Context",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Group",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DirectoryId = table.Column<long>(type: "bigint", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))"),
                    IsLicenseProvider = table.Column<bool>(type: "bit", nullable: false),
                    IsAdminProvider = table.Column<bool>(type: "bit", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Group", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Group_Directory",
                        column: x => x.DirectoryId,
                        principalTable: "Directory",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    EmailAddress = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))"),
                    UserProfilePictureUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsLicensed = table.Column<bool>(type: "bit", nullable: true),
                    ActiveToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsPersonalAccessTokenCreated = table.Column<bool>(type: "bit", nullable: false),
                    DirectoryId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_Directory",
                        column: x => x.DirectoryId,
                        principalTable: "Directory",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PermissionBatchMapping",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PermissionId = table.Column<long>(type: "bigint", nullable: false),
                    PermissionBatchId = table.Column<long>(type: "bigint", nullable: false),
                    PermissionToId = table.Column<long>(type: "bigint", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionBatchMapping", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PermissionBatchMapping_Permission",
                        column: x => x.PermissionId,
                        principalTable: "Permission",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PermissionBatchMapping_PermissionBatch",
                        column: x => x.PermissionBatchId,
                        principalTable: "PermissionBatch",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PermissionBatchMapping_PermissionTo",
                        column: x => x.PermissionToId,
                        principalTable: "PermissionTo",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PriorityBatchMapping",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PriorityId = table.Column<long>(type: "bigint", nullable: false),
                    PriorityBatchId = table.Column<long>(type: "bigint", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PriorityBatchMapping", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PriorityBatchMapping_Priority",
                        column: x => x.PriorityId,
                        principalTable: "Priority",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PriorityBatchMapping_PriorityBatch",
                        column: x => x.PriorityBatchId,
                        principalTable: "PriorityBatch",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ScreenBatch",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ScreenId = table.Column<long>(type: "bigint", nullable: false),
                    Description = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    Operation = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScreenBatch", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScreenBatch_Screen",
                        column: x => x.ScreenId,
                        principalTable: "Screen",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ScreenContents",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ScreenId = table.Column<long>(type: "bigint", nullable: false),
                    SequenceInScreen = table.Column<long>(type: "bigint", nullable: false),
                    FieldId = table.Column<long>(type: "bigint", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScreenContents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScreenContents_Screen",
                        column: x => x.ScreenId,
                        principalTable: "Screen",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TicketTypeScreenBatchMapping",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ScreenBatchId = table.Column<long>(type: "bigint", nullable: false),
                    TicketTypeId = table.Column<long>(type: "bigint", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketTypeScreenBatchMapping", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TicketTypeScreenBatchMapping_Screen",
                        column: x => x.ScreenBatchId,
                        principalTable: "Screen",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TicketTypeScreenBatchMapping_TicketTypeBatch",
                        column: x => x.TicketTypeId,
                        principalTable: "TicketType",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TicketTypeBatchMapping",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TicketTypeId = table.Column<long>(type: "bigint", nullable: false),
                    TicketTypeBatchId = table.Column<long>(type: "bigint", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketTypeBatchMapping", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TicketTypeBatchMapping_TicketType",
                        column: x => x.TicketTypeId,
                        principalTable: "TicketType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TicketTypeBatchMapping_TicketTypeBatch",
                        column: x => x.TicketTypeBatchId,
                        principalTable: "TicketTypeBatch",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Transition",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    FromStatusId = table.Column<long>(type: "bigint", nullable: false),
                    ToStatusId = table.Column<long>(type: "bigint", nullable: false),
                    TransitionScreenId = table.Column<long>(type: "bigint", nullable: true),
                    FromStatusBoxId = table.Column<long>(type: "bigint", nullable: false),
                    ToStatusBoxId = table.Column<long>(type: "bigint", nullable: false),
                    WorkflowId = table.Column<long>(type: "bigint", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transition", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transition_Screen",
                        column: x => x.TransitionScreenId,
                        principalTable: "Screen",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Transition_Status_From",
                        column: x => x.FromStatusId,
                        principalTable: "Status",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Transition_Status_To",
                        column: x => x.ToStatusId,
                        principalTable: "Status",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Transition_Workflow",
                        column: x => x.WorkflowId,
                        principalTable: "Workflow",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "WorkflowBatchMapping",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkflowId = table.Column<long>(type: "bigint", nullable: false),
                    WorkflowBatchId = table.Column<long>(type: "bigint", nullable: false),
                    TicketTypeId = table.Column<long>(type: "bigint", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkflowBatchMapping", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkflowBatchMapping_TicketType",
                        column: x => x.TicketTypeId,
                        principalTable: "TicketType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WorkflowBatchMapping_Workflow",
                        column: x => x.WorkflowId,
                        principalTable: "Workflow",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WorkflowBatchMapping_WorkflowBatch",
                        column: x => x.WorkflowBatchId,
                        principalTable: "WorkflowBatch",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CustomFieldOption",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContextId = table.Column<long>(type: "bigint", nullable: false),
                    CustomFieldId = table.Column<long>(type: "bigint", nullable: false),
                    ParentValueId = table.Column<long>(type: "bigint", nullable: false),
                    ChildValueId = table.Column<long>(type: "bigint", nullable: true),
                    XMLORJSONId = table.Column<long>(type: "bigint", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsEnabled = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomFieldOption", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomFieldOption_Context",
                        column: x => x.ContextId,
                        principalTable: "Context",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CustomFieldOption_ContextValue_Child",
                        column: x => x.ChildValueId,
                        principalTable: "ContextValue",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CustomFieldOption_ContextValue_Parent",
                        column: x => x.ParentValueId,
                        principalTable: "ContextValue",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CustomFieldOption_CustomField",
                        column: x => x.CustomFieldId,
                        principalTable: "CustomField",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "GroupMembership",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupId = table.Column<long>(type: "bigint", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupMembership", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GroupMembership_Group",
                        column: x => x.GroupId,
                        principalTable: "Group",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_GroupMembership_User",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Project",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    ProjectLead = table.Column<long>(type: "bigint", nullable: false),
                    ProjectKey = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    DefaultAssignee = table.Column<long>(type: "bigint", nullable: true),
                    ProjectLogoUrl = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsArchived = table.Column<bool>(type: "bit", nullable: false),
                    PreviousIssueId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Project", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Project_User",
                        column: x => x.ProjectLead,
                        principalTable: "User",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Project_User_Assignee",
                        column: x => x.DefaultAssignee,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Condition",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    ConditionTypeId = table.Column<long>(type: "bigint", nullable: false),
                    TransitionId = table.Column<long>(type: "bigint", nullable: false),
                    Parameters = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Condition", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Condition_ConditionType",
                        column: x => x.ConditionTypeId,
                        principalTable: "ConditionType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Condition_Transition",
                        column: x => x.TransitionId,
                        principalTable: "Transition",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Postfunction",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    PostfunctionTypeId = table.Column<long>(type: "bigint", nullable: false),
                    TransitionId = table.Column<long>(type: "bigint", nullable: false),
                    Parameters = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Postfunction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Postfunction_PostfunctionType",
                        column: x => x.PostfunctionTypeId,
                        principalTable: "PostFunctionType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Postfunction_Transition",
                        column: x => x.TransitionId,
                        principalTable: "Transition",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Validator",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    ValidatorTypeId = table.Column<long>(type: "bigint", nullable: false),
                    TransitionId = table.Column<long>(type: "bigint", nullable: false),
                    Parameters = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Validator", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Validator_Transition",
                        column: x => x.TransitionId,
                        principalTable: "Transition",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Validator_ValidatorType",
                        column: x => x.ValidatorTypeId,
                        principalTable: "ValidatorType",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PriorityBatchAssociation",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PriorityBatchId = table.Column<long>(type: "bigint", nullable: false),
                    ProjectId = table.Column<long>(type: "bigint", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PriorityBatchAssociation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PriorityBatchAssociation_PriorityBatch",
                        column: x => x.PriorityBatchId,
                        principalTable: "PriorityBatch",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PriorityBatchAssociation_Project",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Ticket",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Summary = table.Column<string>(type: "varchar(256)", unicode: false, maxLength: 256, nullable: false),
                    Description = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    AssigneeId = table.Column<long>(type: "bigint", nullable: true),
                    ReporterId = table.Column<long>(type: "bigint", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsArchived = table.Column<bool>(type: "bit", nullable: false),
                    ProjectId = table.Column<long>(type: "bigint", nullable: false),
                    TicketNumberForTheProject = table.Column<long>(type: "bigint", nullable: true),
                    PriorityId = table.Column<long>(type: "bigint", nullable: true),
                    ResolutionId = table.Column<long>(type: "bigint", nullable: true),
                    CurrentStatusId = table.Column<long>(type: "bigint", nullable: false),
                    WorkflowId = table.Column<long>(type: "bigint", nullable: false),
                    ResolutionDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ticket", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ticket_Priority",
                        column: x => x.PriorityId,
                        principalTable: "Priority",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Ticket_Project",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Ticket_Resolution",
                        column: x => x.ResolutionId,
                        principalTable: "Resolution",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Ticket_Status",
                        column: x => x.CurrentStatusId,
                        principalTable: "Status",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Ticket_User_Assignee",
                        column: x => x.AssigneeId,
                        principalTable: "User",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Ticket_User_Reporter",
                        column: x => x.ReporterId,
                        principalTable: "User",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Ticket_Workflow",
                        column: x => x.WorkflowId,
                        principalTable: "Workflow",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TicketTypeBatchAssociation",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectId = table.Column<long>(type: "bigint", nullable: false),
                    TicketTypeBatchId = table.Column<long>(type: "bigint", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketTypeBatchAssociation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TicketTypeBatchAssociation_Project",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TicketTypeBatchAssociation_TicketTypeBatch",
                        column: x => x.TicketTypeBatchId,
                        principalTable: "TicketTypeBatch",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TicketTypeScreenBatchProjectMapping",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TicketTypeScreenBatchId = table.Column<long>(type: "bigint", nullable: false),
                    ProjectId = table.Column<long>(type: "bigint", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketTypeScreenBatchProjectMapping", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TicketTypeScreenBatchProjectMapping_Project",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TicketTypeScreenBatchProjectMapping_TicketTypeScreenBatch",
                        column: x => x.TicketTypeScreenBatchId,
                        principalTable: "TicketTypeScreenBatch",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "WorkflowBatchAssociation",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkflowBatchId = table.Column<long>(type: "bigint", nullable: false),
                    ProjectId = table.Column<long>(type: "bigint", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkflowBatchAssociation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkflowBatchAssociation_Project",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WorkflowBatchAssociation_WorkflowBatch",
                        column: x => x.WorkflowBatchId,
                        principalTable: "WorkflowBatch",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Comment",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TicketId = table.Column<long>(type: "bigint", nullable: false),
                    CommentBody = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    CommentedBy = table.Column<long>(type: "bigint", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comment_Ticket",
                        column: x => x.TicketId,
                        principalTable: "Ticket",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Comment_User",
                        column: x => x.CommentedBy,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CustomFieldValue",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TicketId = table.Column<long>(type: "bigint", nullable: false),
                    CustomFieldId = table.Column<long>(type: "bigint", nullable: false),
                    CustomFieldOptionId = table.Column<long>(type: "bigint", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomFieldValue", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomFieldValue_CustomField",
                        column: x => x.CustomFieldId,
                        principalTable: "CustomField",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CustomFieldValue_CustomFieldOption",
                        column: x => x.CustomFieldOptionId,
                        principalTable: "CustomFieldOption",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CustomFieldValue_Ticket",
                        column: x => x.TicketId,
                        principalTable: "Ticket",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TimeTracking",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TicketId = table.Column<long>(type: "bigint", nullable: false),
                    EstimatedTime = table.Column<long>(type: "bigint", nullable: true),
                    RemainingTime = table.Column<long>(type: "bigint", nullable: true),
                    LoggedTime = table.Column<long>(type: "bigint", nullable: true),
                    LogDescription = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    TimeLoggedBy = table.Column<long>(type: "bigint", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeTracking", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimeTracking_Ticket",
                        column: x => x.TicketId,
                        principalTable: "Ticket",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TimeTracking_User",
                        column: x => x.TimeLoggedBy,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TransitionHistory",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TicketId = table.Column<long>(type: "bigint", nullable: false),
                    FromStatusId = table.Column<long>(type: "bigint", nullable: false),
                    ToStatusId = table.Column<long>(type: "bigint", nullable: false),
                    TransitionedBy = table.Column<long>(type: "bigint", nullable: false),
                    TransitionDate = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransitionHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TransitionHistory_Status_From",
                        column: x => x.FromStatusId,
                        principalTable: "Status",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TransitionHistory_Status_To",
                        column: x => x.ToStatusId,
                        principalTable: "Status",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TransitionHistory_Ticket",
                        column: x => x.TicketId,
                        principalTable: "Ticket",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TransitionHistory_User",
                        column: x => x.TransitionedBy,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comment_CommentedBy",
                table: "Comment",
                column: "CommentedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_TicketId",
                table: "Comment",
                column: "TicketId");

            migrationBuilder.CreateIndex(
                name: "IX_Condition_ConditionTypeId",
                table: "Condition",
                column: "ConditionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Condition_TransitionId",
                table: "Condition",
                column: "TransitionId");

            migrationBuilder.CreateIndex(
                name: "UQ_ConditionTypeName",
                table: "ConditionType",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ContextValue_ContextId",
                table: "ContextValue",
                column: "ContextId");

            migrationBuilder.CreateIndex(
                name: "UQ_CustomerPortalGlobalConfig_Name",
                table: "CustomerPortalGlobalConfig",
                column: "Title",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CustomFieldOption_ChildValueId",
                table: "CustomFieldOption",
                column: "ChildValueId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomFieldOption_ContextId",
                table: "CustomFieldOption",
                column: "ContextId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomFieldOption_CustomFieldId",
                table: "CustomFieldOption",
                column: "CustomFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomFieldOption_ParentValueId",
                table: "CustomFieldOption",
                column: "ParentValueId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomFieldValue_CustomFieldId",
                table: "CustomFieldValue",
                column: "CustomFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomFieldValue_CustomFieldOptionId",
                table: "CustomFieldValue",
                column: "CustomFieldOptionId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomFieldValue_TicketId",
                table: "CustomFieldValue",
                column: "TicketId");

            migrationBuilder.CreateIndex(
                name: "IX_Directory",
                table: "Directory",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_DirectoryName",
                table: "Directory",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Group_DirectoryId",
                table: "Group",
                column: "DirectoryId");

            migrationBuilder.CreateIndex(
                name: "UQ_GroupName",
                table: "Group",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GroupMembership_GroupId",
                table: "GroupMembership",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupMembership_UserId",
                table: "GroupMembership",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "UQ_NNotificationBatch_Name",
                table: "NotificationBatch",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_NotificationTo_Name",
                table: "NotificationTo",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_NotificationTrigger_Name",
                table: "NotificationTrigger",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_Organization_Name",
                table: "Organization",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_Permission_Name",
                table: "Permission",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_PermissionBatch_Name",
                table: "PermissionBatch",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PermissionBatchMapping_PermissionBatchId",
                table: "PermissionBatchMapping",
                column: "PermissionBatchId");

            migrationBuilder.CreateIndex(
                name: "IX_PermissionBatchMapping_PermissionId",
                table: "PermissionBatchMapping",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_PermissionBatchMapping_PermissionToId",
                table: "PermissionBatchMapping",
                column: "PermissionToId");

            migrationBuilder.CreateIndex(
                name: "UQ_PermissionTo_Name",
                table: "PermissionTo",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Postfunction_PostfunctionTypeId",
                table: "Postfunction",
                column: "PostfunctionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Postfunction_TransitionId",
                table: "Postfunction",
                column: "TransitionId");

            migrationBuilder.CreateIndex(
                name: "UQ_PostFunctionName",
                table: "PostFunctionType",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_PriorityName",
                table: "Priority",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_PriorityBatch_Name",
                table: "PriorityBatch",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PriorityBatchAssociation_PriorityBatchId",
                table: "PriorityBatchAssociation",
                column: "PriorityBatchId");

            migrationBuilder.CreateIndex(
                name: "IX_PriorityBatchAssociation_ProjectId",
                table: "PriorityBatchAssociation",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_PriorityBatchMapping_PriorityBatchId",
                table: "PriorityBatchMapping",
                column: "PriorityBatchId");

            migrationBuilder.CreateIndex(
                name: "IX_PriorityBatchMapping_PriorityId",
                table: "PriorityBatchMapping",
                column: "PriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_Project_DefaultAssignee",
                table: "Project",
                column: "DefaultAssignee");

            migrationBuilder.CreateIndex(
                name: "IX_Project_ProjectLead",
                table: "Project",
                column: "ProjectLead");

            migrationBuilder.CreateIndex(
                name: "UQ_ProjectKey",
                table: "Project",
                column: "ProjectKey",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_Projectname",
                table: "Project",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_ProjectRoles_Name",
                table: "ProjectRole",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_Resolution_Name",
                table: "Resolution",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_Screen_Name",
                table: "Screen",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ScreenBatch_ScreenId",
                table: "ScreenBatch",
                column: "ScreenId");

            migrationBuilder.CreateIndex(
                name: "IX_ScreenContents_ScreenId",
                table: "ScreenContents",
                column: "ScreenId");

            migrationBuilder.CreateIndex(
                name: "UQ_StatusName",
                table: "Status",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_AssigneeId",
                table: "Ticket",
                column: "AssigneeId");

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_CurrentStatusId",
                table: "Ticket",
                column: "CurrentStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_PriorityId",
                table: "Ticket",
                column: "PriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_ProjectId",
                table: "Ticket",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_ReporterId",
                table: "Ticket",
                column: "ReporterId");

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_ResolutionId",
                table: "Ticket",
                column: "ResolutionId");

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_WorkflowId",
                table: "Ticket",
                column: "WorkflowId");

            migrationBuilder.CreateIndex(
                name: "UQ_TicketEvent_Name",
                table: "TicketEvent",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_TicketSecurity_Name",
                table: "TicketSecurity",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_TicketSecurityBatchName",
                table: "TicketSecurityBatch",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TicketType",
                table: "TicketType",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_TicketTypeName",
                table: "TicketType",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_Name",
                table: "TicketTypeBatch",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TicketTypeBatchAssociation_ProjectId",
                table: "TicketTypeBatchAssociation",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketTypeBatchAssociation_TicketTypeBatchId",
                table: "TicketTypeBatchAssociation",
                column: "TicketTypeBatchId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketTypeBatchMapping_TicketTypeBatchId",
                table: "TicketTypeBatchMapping",
                column: "TicketTypeBatchId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketTypeBatchMapping_TicketTypeId",
                table: "TicketTypeBatchMapping",
                column: "TicketTypeId");

            migrationBuilder.CreateIndex(
                name: "UQ_TicketTypeScreenBatchName",
                table: "TicketTypeScreenBatch",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TicketTypeScreenBatchMapping_ScreenBatchId",
                table: "TicketTypeScreenBatchMapping",
                column: "ScreenBatchId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketTypeScreenBatchMapping_TicketTypeId",
                table: "TicketTypeScreenBatchMapping",
                column: "TicketTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketTypeScreenBatchProjectMapping_ProjectId",
                table: "TicketTypeScreenBatchProjectMapping",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketTypeScreenBatchProjectMapping_TicketTypeScreenBatchId",
                table: "TicketTypeScreenBatchProjectMapping",
                column: "TicketTypeScreenBatchId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeTracking_TicketId",
                table: "TimeTracking",
                column: "TicketId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeTracking_TimeLoggedBy",
                table: "TimeTracking",
                column: "TimeLoggedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Transition_FromStatusId",
                table: "Transition",
                column: "FromStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Transition_ToStatusId",
                table: "Transition",
                column: "ToStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Transition_TransitionScreenId",
                table: "Transition",
                column: "TransitionScreenId");

            migrationBuilder.CreateIndex(
                name: "IX_Transition_WorkflowId",
                table: "Transition",
                column: "WorkflowId");

            migrationBuilder.CreateIndex(
                name: "IX_TransitionHistory_FromStatusId",
                table: "TransitionHistory",
                column: "FromStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_TransitionHistory_TicketId",
                table: "TransitionHistory",
                column: "TicketId");

            migrationBuilder.CreateIndex(
                name: "IX_TransitionHistory_ToStatusId",
                table: "TransitionHistory",
                column: "ToStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_TransitionHistory_TransitionedBy",
                table: "TransitionHistory",
                column: "TransitionedBy");

            migrationBuilder.CreateIndex(
                name: "IX_User_DirectoryId",
                table: "User",
                column: "DirectoryId");

            migrationBuilder.CreateIndex(
                name: "UQ_User_EmailAddress",
                table: "User",
                column: "EmailAddress",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_User_UserName",
                table: "User",
                column: "UserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Validator_TransitionId",
                table: "Validator",
                column: "TransitionId");

            migrationBuilder.CreateIndex(
                name: "IX_Validator_ValidatorTypeId",
                table: "Validator",
                column: "ValidatorTypeId");

            migrationBuilder.CreateIndex(
                name: "UQ_ValidatorTypeName",
                table: "ValidatorType",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_Workflow_Name",
                table: "Workflow",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_WorkflowBatch_Name",
                table: "WorkflowBatch",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowBatchAssociation_ProjectId",
                table: "WorkflowBatchAssociation",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowBatchAssociation_WorkflowBatchId",
                table: "WorkflowBatchAssociation",
                column: "WorkflowBatchId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowBatchMapping_TicketTypeId",
                table: "WorkflowBatchMapping",
                column: "TicketTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowBatchMapping_WorkflowBatchId",
                table: "WorkflowBatchMapping",
                column: "WorkflowBatchId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowBatchMapping_WorkflowId",
                table: "WorkflowBatchMapping",
                column: "WorkflowId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comment");

            migrationBuilder.DropTable(
                name: "Condition");

            migrationBuilder.DropTable(
                name: "CustomerPortalGlobalConfig");

            migrationBuilder.DropTable(
                name: "CustomFieldValue");

            migrationBuilder.DropTable(
                name: "GroupMembership");

            migrationBuilder.DropTable(
                name: "NotificationBatch");

            migrationBuilder.DropTable(
                name: "NotificationTo");

            migrationBuilder.DropTable(
                name: "NotificationTrigger");

            migrationBuilder.DropTable(
                name: "Organization");

            migrationBuilder.DropTable(
                name: "PermissionBatchMapping");

            migrationBuilder.DropTable(
                name: "Postfunction");

            migrationBuilder.DropTable(
                name: "PriorityBatchAssociation");

            migrationBuilder.DropTable(
                name: "PriorityBatchMapping");

            migrationBuilder.DropTable(
                name: "ProjectRole");

            migrationBuilder.DropTable(
                name: "ScreenBatch");

            migrationBuilder.DropTable(
                name: "ScreenContents");

            migrationBuilder.DropTable(
                name: "TicketEvent");

            migrationBuilder.DropTable(
                name: "TicketSecurity");

            migrationBuilder.DropTable(
                name: "TicketSecurityBatch");

            migrationBuilder.DropTable(
                name: "TicketTypeBatchAssociation");

            migrationBuilder.DropTable(
                name: "TicketTypeBatchMapping");

            migrationBuilder.DropTable(
                name: "TicketTypeScreenBatchMapping");

            migrationBuilder.DropTable(
                name: "TicketTypeScreenBatchProjectMapping");

            migrationBuilder.DropTable(
                name: "TimeTracking");

            migrationBuilder.DropTable(
                name: "TransitionHistory");

            migrationBuilder.DropTable(
                name: "Validator");

            migrationBuilder.DropTable(
                name: "WorkflowBatchAssociation");

            migrationBuilder.DropTable(
                name: "WorkflowBatchMapping");

            migrationBuilder.DropTable(
                name: "WorkSchedule");

            migrationBuilder.DropTable(
                name: "ConditionType");

            migrationBuilder.DropTable(
                name: "CustomFieldOption");

            migrationBuilder.DropTable(
                name: "Group");

            migrationBuilder.DropTable(
                name: "Permission");

            migrationBuilder.DropTable(
                name: "PermissionBatch");

            migrationBuilder.DropTable(
                name: "PermissionTo");

            migrationBuilder.DropTable(
                name: "PostFunctionType");

            migrationBuilder.DropTable(
                name: "PriorityBatch");

            migrationBuilder.DropTable(
                name: "TicketTypeBatch");

            migrationBuilder.DropTable(
                name: "TicketTypeScreenBatch");

            migrationBuilder.DropTable(
                name: "Ticket");

            migrationBuilder.DropTable(
                name: "Transition");

            migrationBuilder.DropTable(
                name: "ValidatorType");

            migrationBuilder.DropTable(
                name: "TicketType");

            migrationBuilder.DropTable(
                name: "WorkflowBatch");

            migrationBuilder.DropTable(
                name: "ContextValue");

            migrationBuilder.DropTable(
                name: "CustomField");

            migrationBuilder.DropTable(
                name: "Priority");

            migrationBuilder.DropTable(
                name: "Project");

            migrationBuilder.DropTable(
                name: "Resolution");

            migrationBuilder.DropTable(
                name: "Screen");

            migrationBuilder.DropTable(
                name: "Status");

            migrationBuilder.DropTable(
                name: "Workflow");

            migrationBuilder.DropTable(
                name: "Context");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Directory");
        }
    }
}
