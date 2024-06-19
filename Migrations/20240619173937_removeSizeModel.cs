using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CSE443_FinalProject.Migrations
{
    /// <inheritdoc />
    public partial class removeSizeModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CoffeeSize");

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "Coffee",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Coffee",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Coffee");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Coffee");

            migrationBuilder.CreateTable(
                name: "CoffeeSize",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CoffeeId = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Size = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoffeeSize", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CoffeeSize_Coffee_CoffeeId",
                        column: x => x.CoffeeId,
                        principalTable: "Coffee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CoffeeSize_CoffeeId",
                table: "CoffeeSize",
                column: "CoffeeId");
        }
    }
}
