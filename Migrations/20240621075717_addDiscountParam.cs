using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CSE443_FinalProject.Migrations
{
    /// <inheritdoc />
    public partial class addDiscountParam : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Cart_UserId",
                table: "Cart");

            migrationBuilder.AddColumn<int>(
                name: "discount",
                table: "Coffee",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Cart_UserId",
                table: "Cart",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Cart_UserId",
                table: "Cart");

            migrationBuilder.DropColumn(
                name: "discount",
                table: "Coffee");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_UserId",
                table: "Cart",
                column: "UserId");
        }
    }
}
