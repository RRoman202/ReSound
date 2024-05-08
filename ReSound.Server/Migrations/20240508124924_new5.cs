using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReSound.Server.Migrations
{
    /// <inheritdoc />
    public partial class new5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "favorite",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IdUser = table.Column<Guid>(type: "uuid", nullable: false),
                    IdSequencer = table.Column<Guid>(type: "uuid", nullable: false),
                    UserIdUser = table.Column<Guid>(type: "uuid", nullable: true),
                    SequencerIdSequencer = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_favorite", x => x.Id);
                    table.ForeignKey(
                        name: "FK_favorite_sequencer_SequencerIdSequencer",
                        column: x => x.SequencerIdSequencer,
                        principalTable: "sequencer",
                        principalColumn: "IdSequencer");
                    table.ForeignKey(
                        name: "FK_favorite_users_UserIdUser",
                        column: x => x.UserIdUser,
                        principalTable: "users",
                        principalColumn: "IdUser");
                });

            migrationBuilder.CreateIndex(
                name: "IX_favorite_SequencerIdSequencer",
                table: "favorite",
                column: "SequencerIdSequencer");

            migrationBuilder.CreateIndex(
                name: "IX_favorite_UserIdUser",
                table: "favorite",
                column: "UserIdUser");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "favorite");
        }
    }
}
