using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eShopSolution.Data.Migrations
{
    public partial class Change_PaymentMethod_Type_To_String_Order_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PaymentMethod",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "AppRoles",
                keyColumn: "Id",
                keyValue: new Guid("8d04dce2-969a-435d-bba4-df3f325983dc"),
                column: "ConcurrencyStamp",
                value: "45c68a23-cc5e-48ca-99d0-a42c4d863a21");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("69bd714f-9576-45ba-b5b7-f00649be00de"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "c3bcf8b1-e264-4485-adf0-363f21f1b31c", "AQAAAAEAACcQAAAAEKVBBlMrmMlMt0Yg0uyii07dHL4bgLL66e6yft/OspKL2nUOiOMCJSf9nGCh3Op5PQ==" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2021, 6, 15, 22, 22, 25, 336, DateTimeKind.Local).AddTicks(5100));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateCreated",
                value: new DateTime(2021, 6, 15, 22, 22, 25, 337, DateTimeKind.Local).AddTicks(2261));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "DateCreated",
                value: new DateTime(2021, 6, 15, 22, 22, 25, 337, DateTimeKind.Local).AddTicks(2288));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "DateCreated",
                value: new DateTime(2021, 6, 15, 22, 22, 25, 337, DateTimeKind.Local).AddTicks(2291));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "DateCreated",
                value: new DateTime(2021, 6, 15, 22, 22, 25, 337, DateTimeKind.Local).AddTicks(2293));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "DateCreated",
                value: new DateTime(2021, 6, 15, 22, 22, 25, 337, DateTimeKind.Local).AddTicks(2295));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "PaymentMethod",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AppRoles",
                keyColumn: "Id",
                keyValue: new Guid("8d04dce2-969a-435d-bba4-df3f325983dc"),
                column: "ConcurrencyStamp",
                value: "1d99746a-a273-4246-99f5-a5d4798e6f1d");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("69bd714f-9576-45ba-b5b7-f00649be00de"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "59b968c7-f02c-4c36-a26b-cd8b7e645bc9", "AQAAAAEAACcQAAAAEOMzed8Ugk7OxJdtRGXoRdhVMtO72tVKT8YKus3dNky5BjYrFE6YO5k/Ch7hkGdRXg==" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2021, 6, 15, 21, 51, 14, 206, DateTimeKind.Local).AddTicks(3379));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateCreated",
                value: new DateTime(2021, 6, 15, 21, 51, 14, 207, DateTimeKind.Local).AddTicks(898));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "DateCreated",
                value: new DateTime(2021, 6, 15, 21, 51, 14, 207, DateTimeKind.Local).AddTicks(927));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "DateCreated",
                value: new DateTime(2021, 6, 15, 21, 51, 14, 207, DateTimeKind.Local).AddTicks(930));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "DateCreated",
                value: new DateTime(2021, 6, 15, 21, 51, 14, 207, DateTimeKind.Local).AddTicks(932));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "DateCreated",
                value: new DateTime(2021, 6, 15, 21, 51, 14, 207, DateTimeKind.Local).AddTicks(933));
        }
    }
}
