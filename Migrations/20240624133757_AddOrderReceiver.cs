﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CSE443_FinalProject.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderReceiver : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Receiver",
                table: "Order",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Receiver",
                table: "Order");
        }
    }
}
