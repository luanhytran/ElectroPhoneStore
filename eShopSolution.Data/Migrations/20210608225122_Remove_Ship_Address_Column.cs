using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eShopSolution.Data.Migrations
{
    public partial class Remove_Ship_Address_Column : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShipEmail",
                table: "Orders");

            migrationBuilder.UpdateData(
                table: "AppRoles",
                keyColumn: "Id",
                keyValue: new Guid("8d04dce2-969a-435d-bba4-df3f325983dc"),
                column: "ConcurrencyStamp",
                value: "6aecadf4-ca0e-458b-91a5-b430f361d83e");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("69bd714f-9576-45ba-b5b7-f00649be00de"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "817c936c-4367-41f1-9276-a820bb62be67", "AQAAAAEAACcQAAAAEIBCTVmaPePYVAX4uZjHmlUyFQ9/Z0V2hG3tOJGzLlaalzxvSyOXqZCfbGSmN0j7Jg==" });

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2021, 6, 9, 5, 51, 22, 243, DateTimeKind.Local).AddTicks(3622));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateCreated",
                value: new DateTime(2021, 6, 9, 5, 51, 22, 244, DateTimeKind.Local).AddTicks(1051));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 3,
                column: "DateCreated",
                value: new DateTime(2021, 6, 9, 5, 51, 22, 244, DateTimeKind.Local).AddTicks(1078));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 4,
                column: "DateCreated",
                value: new DateTime(2021, 6, 9, 5, 51, 22, 244, DateTimeKind.Local).AddTicks(1081));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 5,
                column: "DateCreated",
                value: new DateTime(2021, 6, 9, 5, 51, 22, 244, DateTimeKind.Local).AddTicks(1083));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 6,
                column: "DateCreated",
                value: new DateTime(2021, 6, 9, 5, 51, 22, 244, DateTimeKind.Local).AddTicks(1085));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ShipEmail",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AppRoles",
                keyColumn: "Id",
                keyValue: new Guid("8d04dce2-969a-435d-bba4-df3f325983dc"),
                column: "ConcurrencyStamp",
                value: "47dbea4e-76a7-4de6-9847-320fbebec25f");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("69bd714f-9576-45ba-b5b7-f00649be00de"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "9078890b-3050-4040-9328-9db6c17570cc", "AQAAAAEAACcQAAAAEJWhBjWeBa8PdNTXRbRvEggjf3T3KhtHtX8SBv3j8EXxZVQN0oWzNIlfjOa8kfI8Pw==" });

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2021, 6, 9, 5, 28, 45, 385, DateTimeKind.Local).AddTicks(6597));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateCreated",
                value: new DateTime(2021, 6, 9, 5, 28, 45, 386, DateTimeKind.Local).AddTicks(4256));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 3,
                column: "DateCreated",
                value: new DateTime(2021, 6, 9, 5, 28, 45, 386, DateTimeKind.Local).AddTicks(4285));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 4,
                column: "DateCreated",
                value: new DateTime(2021, 6, 9, 5, 28, 45, 386, DateTimeKind.Local).AddTicks(4288));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 5,
                column: "DateCreated",
                value: new DateTime(2021, 6, 9, 5, 28, 45, 386, DateTimeKind.Local).AddTicks(4290));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 6,
                column: "DateCreated",
                value: new DateTime(2021, 6, 9, 5, 28, 45, 386, DateTimeKind.Local).AddTicks(4292));
        }
    }
}
