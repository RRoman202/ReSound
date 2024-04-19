using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReSound.Server.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "settings_sequencer",
                columns: table => new
                {
                    IdSettingsSequencer = table.Column<Guid>(type: "uuid", nullable: false),
                    BPM = table.Column<int>(type: "integer", nullable: false),
                    Volume = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_settings_sequencer", x => x.IdSettingsSequencer);
                });

            migrationBuilder.CreateTable(
                name: "sound",
                columns: table => new
                {
                    IdSound = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Path = table.Column<string>(type: "text", nullable: true),
                    FileName = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sound", x => x.IdSound);
                });

            migrationBuilder.CreateTable(
                name: "track",
                columns: table => new
                {
                    IdTrack = table.Column<Guid>(type: "uuid", nullable: false),
                    Volume = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_track", x => x.IdTrack);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    IdUser = table.Column<Guid>(type: "uuid", nullable: false),
                    Login = table.Column<string>(type: "text", nullable: true),
                    Password = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    Photo = table.Column<string>(type: "text", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DateUpdated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.IdUser);
                });

            migrationBuilder.CreateTable(
                name: "template",
                columns: table => new
                {
                    IdTemplate = table.Column<Guid>(type: "uuid", nullable: false),
                    Volume = table.Column<int>(type: "integer", nullable: false),
                    Notes = table.Column<bool[][]>(type: "jsonb", nullable: true),
                    IdSound = table.Column<Guid>(type: "uuid", nullable: false),
                    SoundIdSound = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_template", x => x.IdTemplate);
                    table.ForeignKey(
                        name: "FK_template_sound_SoundIdSound",
                        column: x => x.SoundIdSound,
                        principalTable: "sound",
                        principalColumn: "IdSound");
                });

            migrationBuilder.CreateTable(
                name: "comment",
                columns: table => new
                {
                    IdComment = table.Column<Guid>(type: "uuid", nullable: false),
                    IdUser = table.Column<Guid>(type: "uuid", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: true),
                    UserIdUser = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_comment", x => x.IdComment);
                    table.ForeignKey(
                        name: "FK_comment_users_UserIdUser",
                        column: x => x.UserIdUser,
                        principalTable: "users",
                        principalColumn: "IdUser");
                });

            migrationBuilder.CreateTable(
                name: "mark",
                columns: table => new
                {
                    IdMark = table.Column<Guid>(type: "uuid", nullable: false),
                    IdUser = table.Column<Guid>(type: "uuid", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Value = table.Column<int>(type: "integer", nullable: false),
                    UserIdUser = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_mark", x => x.IdMark);
                    table.ForeignKey(
                        name: "FK_mark_users_UserIdUser",
                        column: x => x.UserIdUser,
                        principalTable: "users",
                        principalColumn: "IdUser");
                });

            migrationBuilder.CreateTable(
                name: "sequencer",
                columns: table => new
                {
                    IdSequencer = table.Column<Guid>(type: "uuid", nullable: false),
                    IdUser = table.Column<Guid>(type: "uuid", nullable: false),
                    IdSettingsSequencer = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Private = table.Column<bool>(type: "boolean", nullable: false),
                    Photo = table.Column<string>(type: "text", nullable: true),
                    UserIdUser = table.Column<Guid>(type: "uuid", nullable: true),
                    SettingsSequencerIdSettingsSequencer = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sequencer", x => x.IdSequencer);
                    table.ForeignKey(
                        name: "FK_sequencer_settings_sequencer_SettingsSequencerIdSettingsSeq~",
                        column: x => x.SettingsSequencerIdSettingsSequencer,
                        principalTable: "settings_sequencer",
                        principalColumn: "IdSettingsSequencer");
                    table.ForeignKey(
                        name: "FK_sequencer_users_UserIdUser",
                        column: x => x.UserIdUser,
                        principalTable: "users",
                        principalColumn: "IdUser");
                });

            migrationBuilder.CreateTable(
                name: "track_template",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IdTrack = table.Column<Guid>(type: "uuid", nullable: false),
                    IdTemplate = table.Column<Guid>(type: "uuid", nullable: false),
                    TrackIdTrack = table.Column<Guid>(type: "uuid", nullable: true),
                    TemplateIdTemplate = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_track_template", x => x.Id);
                    table.ForeignKey(
                        name: "FK_track_template_template_TemplateIdTemplate",
                        column: x => x.TemplateIdTemplate,
                        principalTable: "template",
                        principalColumn: "IdTemplate");
                    table.ForeignKey(
                        name: "FK_track_template_track_TrackIdTrack",
                        column: x => x.TrackIdTrack,
                        principalTable: "track",
                        principalColumn: "IdTrack");
                });

            migrationBuilder.CreateTable(
                name: "sequencer_comment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IdSequencer = table.Column<Guid>(type: "uuid", nullable: false),
                    IdComment = table.Column<Guid>(type: "uuid", nullable: false),
                    SequencerIdSequencer = table.Column<Guid>(type: "uuid", nullable: true),
                    CommentIdComment = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sequencer_comment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_sequencer_comment_comment_CommentIdComment",
                        column: x => x.CommentIdComment,
                        principalTable: "comment",
                        principalColumn: "IdComment");
                    table.ForeignKey(
                        name: "FK_sequencer_comment_sequencer_SequencerIdSequencer",
                        column: x => x.SequencerIdSequencer,
                        principalTable: "sequencer",
                        principalColumn: "IdSequencer");
                });

            migrationBuilder.CreateTable(
                name: "sequencer_mark",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IdSequencer = table.Column<Guid>(type: "uuid", nullable: false),
                    IdMark = table.Column<Guid>(type: "uuid", nullable: false),
                    SequencerIdSequencer = table.Column<Guid>(type: "uuid", nullable: true),
                    MarkIdMark = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sequencer_mark", x => x.Id);
                    table.ForeignKey(
                        name: "FK_sequencer_mark_mark_MarkIdMark",
                        column: x => x.MarkIdMark,
                        principalTable: "mark",
                        principalColumn: "IdMark");
                    table.ForeignKey(
                        name: "FK_sequencer_mark_sequencer_SequencerIdSequencer",
                        column: x => x.SequencerIdSequencer,
                        principalTable: "sequencer",
                        principalColumn: "IdSequencer");
                });

            migrationBuilder.CreateTable(
                name: "sequencer_template",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IdSequencer = table.Column<Guid>(type: "uuid", nullable: false),
                    IdTemplate = table.Column<Guid>(type: "uuid", nullable: false),
                    SequencerIdSequencer = table.Column<Guid>(type: "uuid", nullable: true),
                    TemplateIdTemplate = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sequencer_template", x => x.Id);
                    table.ForeignKey(
                        name: "FK_sequencer_template_sequencer_SequencerIdSequencer",
                        column: x => x.SequencerIdSequencer,
                        principalTable: "sequencer",
                        principalColumn: "IdSequencer");
                    table.ForeignKey(
                        name: "FK_sequencer_template_template_TemplateIdTemplate",
                        column: x => x.TemplateIdTemplate,
                        principalTable: "template",
                        principalColumn: "IdTemplate");
                });

            migrationBuilder.CreateTable(
                name: "sequencer_track",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IdSequencer = table.Column<Guid>(type: "uuid", nullable: false),
                    IdTrack = table.Column<Guid>(type: "uuid", nullable: false),
                    SequencerIdSequencer = table.Column<Guid>(type: "uuid", nullable: true),
                    TrackIdTrack = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sequencer_track", x => x.Id);
                    table.ForeignKey(
                        name: "FK_sequencer_track_sequencer_SequencerIdSequencer",
                        column: x => x.SequencerIdSequencer,
                        principalTable: "sequencer",
                        principalColumn: "IdSequencer");
                    table.ForeignKey(
                        name: "FK_sequencer_track_track_TrackIdTrack",
                        column: x => x.TrackIdTrack,
                        principalTable: "track",
                        principalColumn: "IdTrack");
                });

            migrationBuilder.CreateIndex(
                name: "IX_comment_UserIdUser",
                table: "comment",
                column: "UserIdUser");

            migrationBuilder.CreateIndex(
                name: "IX_mark_UserIdUser",
                table: "mark",
                column: "UserIdUser");

            migrationBuilder.CreateIndex(
                name: "IX_sequencer_SettingsSequencerIdSettingsSequencer",
                table: "sequencer",
                column: "SettingsSequencerIdSettingsSequencer");

            migrationBuilder.CreateIndex(
                name: "IX_sequencer_UserIdUser",
                table: "sequencer",
                column: "UserIdUser");

            migrationBuilder.CreateIndex(
                name: "IX_sequencer_comment_CommentIdComment",
                table: "sequencer_comment",
                column: "CommentIdComment");

            migrationBuilder.CreateIndex(
                name: "IX_sequencer_comment_SequencerIdSequencer",
                table: "sequencer_comment",
                column: "SequencerIdSequencer");

            migrationBuilder.CreateIndex(
                name: "IX_sequencer_mark_MarkIdMark",
                table: "sequencer_mark",
                column: "MarkIdMark");

            migrationBuilder.CreateIndex(
                name: "IX_sequencer_mark_SequencerIdSequencer",
                table: "sequencer_mark",
                column: "SequencerIdSequencer");

            migrationBuilder.CreateIndex(
                name: "IX_sequencer_template_SequencerIdSequencer",
                table: "sequencer_template",
                column: "SequencerIdSequencer");

            migrationBuilder.CreateIndex(
                name: "IX_sequencer_template_TemplateIdTemplate",
                table: "sequencer_template",
                column: "TemplateIdTemplate");

            migrationBuilder.CreateIndex(
                name: "IX_sequencer_track_SequencerIdSequencer",
                table: "sequencer_track",
                column: "SequencerIdSequencer");

            migrationBuilder.CreateIndex(
                name: "IX_sequencer_track_TrackIdTrack",
                table: "sequencer_track",
                column: "TrackIdTrack");

            migrationBuilder.CreateIndex(
                name: "IX_template_SoundIdSound",
                table: "template",
                column: "SoundIdSound");

            migrationBuilder.CreateIndex(
                name: "IX_track_template_TemplateIdTemplate",
                table: "track_template",
                column: "TemplateIdTemplate");

            migrationBuilder.CreateIndex(
                name: "IX_track_template_TrackIdTrack",
                table: "track_template",
                column: "TrackIdTrack");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "sequencer_comment");

            migrationBuilder.DropTable(
                name: "sequencer_mark");

            migrationBuilder.DropTable(
                name: "sequencer_template");

            migrationBuilder.DropTable(
                name: "sequencer_track");

            migrationBuilder.DropTable(
                name: "track_template");

            migrationBuilder.DropTable(
                name: "comment");

            migrationBuilder.DropTable(
                name: "mark");

            migrationBuilder.DropTable(
                name: "sequencer");

            migrationBuilder.DropTable(
                name: "template");

            migrationBuilder.DropTable(
                name: "track");

            migrationBuilder.DropTable(
                name: "settings_sequencer");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "sound");
        }
    }
}
