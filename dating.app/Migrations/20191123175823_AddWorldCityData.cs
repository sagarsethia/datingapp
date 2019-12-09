using Microsoft.EntityFrameworkCore.Migrations;

namespace dating.app.Migrations
{
    public partial class AddWorldCityData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    countryName = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.countryName);
                });

            migrationBuilder.CreateTable(
                name: "Cities",
                columns: table => new
                {
                    cityName = table.Column<string>(nullable: false),
                    CountriescountryName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cities", x => x.cityName);
                    table.ForeignKey(
                        name: "FK_Cities_Countries_CountriescountryName",
                        column: x => x.CountriescountryName,
                        principalTable: "Countries",
                        principalColumn: "countryName",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cities_CountriescountryName",
                table: "Cities",
                column: "CountriescountryName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cities");

            migrationBuilder.DropTable(
                name: "Countries");
        }
    }
}
