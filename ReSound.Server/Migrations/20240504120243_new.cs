using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReSound.Server.Migrations
{
    /// <inheritdoc />
    public partial class @new : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "sequencer_comment");

            migrationBuilder.DropTable(
                name: "sequencer_mark");

            migrationBuilder.AddColumn<Guid>(
                name: "IdSequencer",
                table: "mark",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "SequencerIdSequencer",
                table: "mark",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "IdSequencer",
                table: "comment",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "SequencerIdSequencer",
                table: "comment",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "follower",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IdUser = table.Column<Guid>(type: "uuid", nullable: false),
                    IdFollower = table.Column<Guid>(type: "uuid", nullable: false),
                    UserIdUser = table.Column<Guid>(type: "uuid", nullable: true),
                    FollowerUserIdUser = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_follower", x => x.Id);
                    table.ForeignKey(
                        name: "FK_follower_users_FollowerUserIdUser",
                        column: x => x.FollowerUserIdUser,
                        principalTable: "users",
                        principalColumn: "IdUser");
                    table.ForeignKey(
                        name: "FK_follower_users_UserIdUser",
                        column: x => x.UserIdUser,
                        principalTable: "users",
                        principalColumn: "IdUser");
                });

            migrationBuilder.CreateTable(
                name: "genre",
                columns: table => new
                {
                    IdGenre = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_genre", x => x.IdGenre);
                });

            migrationBuilder.CreateIndex(
                name: "IX_mark_SequencerIdSequencer",
                table: "mark",
                column: "SequencerIdSequencer");

            migrationBuilder.CreateIndex(
                name: "IX_comment_SequencerIdSequencer",
                table: "comment",
                column: "SequencerIdSequencer");

            migrationBuilder.CreateIndex(
                name: "IX_follower_FollowerUserIdUser",
                table: "follower",
                column: "FollowerUserIdUser");

            migrationBuilder.CreateIndex(
                name: "IX_follower_UserIdUser",
                table: "follower",
                column: "UserIdUser");

            migrationBuilder.AddForeignKey(
                name: "FK_comment_sequencer_SequencerIdSequencer",
                table: "comment",
                column: "SequencerIdSequencer",
                principalTable: "sequencer",
                principalColumn: "IdSequencer");

            migrationBuilder.AddForeignKey(
                name: "FK_mark_sequencer_SequencerIdSequencer",
                table: "mark",
                column: "SequencerIdSequencer",
                principalTable: "sequencer",
                principalColumn: "IdSequencer");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_comment_sequencer_SequencerIdSequencer",
                table: "comment");

            migrationBuilder.DropForeignKey(
                name: "FK_mark_sequencer_SequencerIdSequencer",
                table: "mark");

            migrationBuilder.DropTable(
                name: "follower");

            migrationBuilder.DropTable(
                name: "genre");

            migrationBuilder.DropIndex(
                name: "IX_mark_SequencerIdSequencer",
                table: "mark");

            migrationBuilder.DropIndex(
                name: "IX_comment_SequencerIdSequencer",
                table: "comment");

            migrationBuilder.DropColumn(
                name: "IdSequencer",
                table: "mark");

            migrationBuilder.DropColumn(
                name: "SequencerIdSequencer",
                table: "mark");

            migrationBuilder.DropColumn(
                name: "IdSequencer",
                table: "comment");

            migrationBuilder.DropColumn(
                name: "SequencerIdSequencer",
                table: "comment");

            migrationBuilder.CreateTable(
                name: "sequencer_comment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CommentIdComment = table.Column<Guid>(type: "uuid", nullable: true),
                    SequencerIdSequencer = table.Column<Guid>(type: "uuid", nullable: true),
                    IdComment = table.Column<Guid>(type: "uuid", nullable: false),
                    IdSequencer = table.Column<Guid>(type: "uuid", nullable: false)
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
                    MarkIdMark = table.Column<Guid>(type: "uuid", nullable: true),
                    SequencerIdSequencer = table.Column<Guid>(type: "uuid", nullable: true),
                    IdMark = table.Column<Guid>(type: "uuid", nullable: false),
                    IdSequencer = table.Column<Guid>(type: "uuid", nullable: false)
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
        }
    }
}
