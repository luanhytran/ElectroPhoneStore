using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eShopSolution.Data.Migrations
{
    public partial class NullableAppUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AppUsers_UserId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "SeoAlias",
                table: "ProductTranslations");

            migrationBuilder.DropColumn(
                name: "SeoDescription",
                table: "ProductTranslations");

            migrationBuilder.DropColumn(
                name: "SeoTitle",
                table: "ProductTranslations");

            migrationBuilder.DropColumn(
                name: "OriginalPrice",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "SeoAlias",
                table: "CategoryTranslations");

            migrationBuilder.DropColumn(
                name: "SeoDescription",
                table: "CategoryTranslations");

            migrationBuilder.DropColumn(
                name: "SeoTitle",
                table: "CategoryTranslations");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "Orders",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.UpdateData(
                table: "AppRoles",
                keyColumn: "Id",
                keyValue: new Guid("8d04dce2-969a-435d-bba4-df3f325983dc"),
                column: "ConcurrencyStamp",
                value: "9b497df1-5aaa-4832-9f64-56e3f5519c67");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("69bd714f-9576-45ba-b5b7-f00649be00de"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "d67397f4-9f12-48a0-9876-0d5baefe8ba9", "AQAAAAEAACcQAAAAEAYZuFfeWkdfe8F4WtSfp4Jovqoq9W9XxWoYk2S/pil3MvMThH8e0cUvqK32Ga3KDw==" });

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2021, 5, 25, 10, 9, 33, 942, DateTimeKind.Local).AddTicks(2886));

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AppUsers_UserId",
                table: "Orders",
                column: "UserId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AppUsers_UserId",
                table: "Orders");

            migrationBuilder.AddColumn<string>(
                name: "SeoAlias",
                table: "ProductTranslations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoDescription",
                table: "ProductTranslations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoTitle",
                table: "ProductTranslations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "OriginalPrice",
                table: "Product",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "Orders",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoAlias",
                table: "CategoryTranslations",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SeoDescription",
                table: "CategoryTranslations",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoTitle",
                table: "CategoryTranslations",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AppRoles",
                keyColumn: "Id",
                keyValue: new Guid("8d04dce2-969a-435d-bba4-df3f325983dc"),
                column: "ConcurrencyStamp",
                value: "c7dc9447-ea74-4805-8c4f-27d774ef1e19");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("69bd714f-9576-45ba-b5b7-f00649be00de"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "f8156cd1-25fb-4473-ae24-a238c5818f39", "AQAAAAEAACcQAAAAEOIJbQUXYr7Nyjta6PLY2uqogqaR8dZnRFz308xcELg/pZmuu8LYI0ccUrPTqg/4ew==" });

            migrationBuilder.UpdateData(
                table: "CategoryTranslations",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "SeoAlias", "SeoDescription", "SeoTitle" },
                values: new object[] { "ao-nam", "Sản phẩm áo thời trang nam", "Sản phẩm áo thời trang nam" });

            migrationBuilder.UpdateData(
                table: "CategoryTranslations",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "SeoAlias", "SeoDescription", "SeoTitle" },
                values: new object[] { "men-shirt", "The shirt product for men", "The shirt product for men" });

            migrationBuilder.UpdateData(
                table: "CategoryTranslations",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "SeoAlias", "SeoDescription", "SeoTitle" },
                values: new object[] { "ao-nu", "Sản phẩm áo thời trang nữ", "Sản phẩm áo thời trang nữ" });

            migrationBuilder.UpdateData(
                table: "CategoryTranslations",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "SeoAlias", "SeoDescription", "SeoTitle" },
                values: new object[] { "women-shirt", "The shirt product for women", "The shirt product for women" });

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateCreated", "OriginalPrice" },
                values: new object[] { new DateTime(2021, 5, 19, 2, 44, 49, 910, DateTimeKind.Local).AddTicks(5331), 100000m });

            migrationBuilder.UpdateData(
                table: "ProductTranslations",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "SeoAlias", "SeoDescription", "SeoTitle" },
                values: new object[] { "ao-so-mi-nam-trang-viet-tien", "Áo sơ mi nam trắng Việt Tiến", "Áo sơ mi nam trắng Việt Tiến" });

            migrationBuilder.UpdateData(
                table: "ProductTranslations",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "SeoAlias", "SeoDescription", "SeoTitle" },
                values: new object[] { "viet-tien-men-t-shirt", "Viet Tien Men T-Shirt", "Viet Tien Men T-Shirt" });

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AppUsers_UserId",
                table: "Orders",
                column: "UserId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
