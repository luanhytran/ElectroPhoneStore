using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eShopSolution.Data.Migrations
{
    public partial class AddRoleColumnInToAppUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "AppUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(3000)",
                oldMaxLength: 3000);

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "AppUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AppRoles",
                keyColumn: "Id",
                keyValue: new Guid("8d04dce2-969a-435d-bba4-df3f325983dc"),
                column: "ConcurrencyStamp",
                value: "2fe27697-e1e5-4521-b5d3-4db6ee5b0dc3");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("69bd714f-9576-45ba-b5b7-f00649be00de"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "587ef187-724d-407e-ac38-b0838964f338", "AQAAAAEAACcQAAAAEDcGFrNSgH13sRu5hHvrBZ9/FQDugCOna3rJ0e2XWUwqSnL6DNigCtf/3w2N3S5btg==" });

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2021, 6, 4, 0, 46, 45, 922, DateTimeKind.Local).AddTicks(3109));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateCreated",
                value: new DateTime(2021, 6, 4, 0, 46, 45, 923, DateTimeKind.Local).AddTicks(563));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 3,
                column: "DateCreated",
                value: new DateTime(2021, 6, 4, 0, 46, 45, 923, DateTimeKind.Local).AddTicks(590));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 4,
                column: "DateCreated",
                value: new DateTime(2021, 6, 4, 0, 46, 45, 923, DateTimeKind.Local).AddTicks(593));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 5,
                column: "DateCreated",
                value: new DateTime(2021, 6, 4, 0, 46, 45, 923, DateTimeKind.Local).AddTicks(595));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 6,
                column: "DateCreated",
                value: new DateTime(2021, 6, 4, 0, 46, 45, 923, DateTimeKind.Local).AddTicks(597));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "AppUsers");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "AppUsers",
                type: "nvarchar(3000)",
                maxLength: 3000,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

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
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "08dcbc05-2efd-4329-a277-ee97bb44edd6", "AQAAAAEAACcQAAAAELbut3AOp6A/EViQvrHJz4ZtGwr49+2Xv4Yxt93NHvoiJfgqTCMa3KS7TTy+EV1t+Q==" });

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
    }
}
