using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReSound.Server.Migrations
{
    /// <inheritdoc />
    public partial class new2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "sequencer_genre",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IdSequencer = table.Column<Guid>(type: "uuid", nullable: false),
                    IdGenre = table.Column<Guid>(type: "uuid", nullable: false),
                    SequencerIdSequencer = table.Column<Guid>(type: "uuid", nullable: true),
                    GenreIdGenre = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sequencer_genre", x => x.Id);
                    table.ForeignKey(
                        name: "FK_sequencer_genre_genre_GenreIdGenre",
                        column: x => x.GenreIdGenre,
                        principalTable: "genre",
                        principalColumn: "IdGenre");
                    table.ForeignKey(
                        name: "FK_sequencer_genre_sequencer_SequencerIdSequencer",
                        column: x => x.SequencerIdSequencer,
                        principalTable: "sequencer",
                        principalColumn: "IdSequencer");
                });

            migrationBuilder.CreateIndex(
                name: "IX_sequencer_genre_GenreIdGenre",
                table: "sequencer_genre",
                column: "GenreIdGenre");

            migrationBuilder.CreateIndex(
                name: "IX_sequencer_genre_SequencerIdSequencer",
                table: "sequencer_genre",
                column: "SequencerIdSequencer");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "sequencer_genre");
        }
    }
}
