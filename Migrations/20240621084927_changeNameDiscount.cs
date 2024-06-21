using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CSE443_FinalProject.Migrations
{
    /// <inheritdoc />
    public partial class changeNameDiscount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "discount",
                table: "Coffee",
                newName: "Discount");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Discount",
                table: "Coffee",
                newName: "discount");
        }
    }
}
