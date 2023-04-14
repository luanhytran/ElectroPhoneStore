using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eShopSolution.Data.Migrations
{
    public partial class AddColumnAddress_AppUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserType",
                table: "AppUsers");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "AppUsers",
                type: "nvarchar(3000)",
                maxLength: 3000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AppRoles",
                keyColumn: "Id",
                keyValue: new Guid("8d04dce2-969a-435d-bba4-df3f325983dc"),
                column: "ConcurrencyStamp",
                value: "dcef247e-8614-4503-a00b-9f0ce188ad50");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("69bd714f-9576-45ba-b5b7-f00649be00de"),
                columns: new[] { "Address", "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "123 An Dương Vương P.8 Q.5", "08dcbc05-2efd-4329-a277-ee97bb44edd6", "AQAAAAEAACcQAAAAELbut3AOp6A/EViQvrHJz4ZtGwr49+2Xv4Yxt93NHvoiJfgqTCMa3KS7TTy+EV1t+Q==" });

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2021, 5, 30, 1, 27, 29, 971, DateTimeKind.Local).AddTicks(790));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateCreated",
                value: new DateTime(2021, 5, 30, 1, 27, 29, 971, DateTimeKind.Local).AddTicks(8228));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 3,
                column: "DateCreated",
                value: new DateTime(2021, 5, 30, 1, 27, 29, 971, DateTimeKind.Local).AddTicks(8254));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 4,
                column: "DateCreated",
                value: new DateTime(2021, 5, 30, 1, 27, 29, 971, DateTimeKind.Local).AddTicks(8257));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 5,
                column: "DateCreated",
                value: new DateTime(2021, 5, 30, 1, 27, 29, 971, DateTimeKind.Local).AddTicks(8259));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 6,
                column: "DateCreated",
                value: new DateTime(2021, 5, 30, 1, 27, 29, 971, DateTimeKind.Local).AddTicks(8261));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "AppUsers");

            migrationBuilder.AddColumn<int>(
                name: "UserType",
                table: "AppUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AppRoles",
                keyColumn: "Id",
                keyValue: new Guid("8d04dce2-969a-435d-bba4-df3f325983dc"),
                column: "ConcurrencyStamp",
                value: "d86cb709-ede3-4e77-802a-abe385032051");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("69bd714f-9576-45ba-b5b7-f00649be00de"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "e8793687-e555-40c1-9f15-3e9e57944242", "AQAAAAEAACcQAAAAEBFxV0LW0k4dC9vEZeCjKz7OlC6Mfi5oNtKge5qHkRbSIcD1DwCP9KF+P+oLtWfv8Q==" });

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2021, 5, 28, 15, 29, 3, 806, DateTimeKind.Local).AddTicks(5039));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateCreated",
                value: new DateTime(2021, 5, 28, 15, 29, 3, 807, DateTimeKind.Local).AddTicks(3675));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 3,
                column: "DateCreated",
                value: new DateTime(2021, 5, 28, 15, 29, 3, 807, DateTimeKind.Local).AddTicks(3705));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 4,
                column: "DateCreated",
                value: new DateTime(2021, 5, 28, 15, 29, 3, 807, DateTimeKind.Local).AddTicks(3707));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 5,
                column: "DateCreated",
                value: new DateTime(2021, 5, 28, 15, 29, 3, 807, DateTimeKind.Local).AddTicks(3709));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 6,
                column: "DateCreated",
                value: new DateTime(2021, 5, 28, 15, 29, 3, 807, DateTimeKind.Local).AddTicks(3711));
        }
    }
}
