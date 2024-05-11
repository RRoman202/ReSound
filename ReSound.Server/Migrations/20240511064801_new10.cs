using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReSound.Server.Migrations
{
    /// <inheritdoc />
    public partial class new10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "PositionTemplate",
                table: "track_template",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<int>(
                name: "TrackNumber",
                table: "track",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PositionTemplate",
                table: "track_template");

            migrationBuilder.DropColumn(
                name: "TrackNumber",
                table: "track");
        }
    }
}
