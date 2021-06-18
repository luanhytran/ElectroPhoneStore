using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eShopSolution.Data.Migrations
{
    public partial class Coupon : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CouponId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Coupons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(5)", maxLength: 5, nullable: false),
                    Count = table.Column<int>(type: "int", nullable: false),
                    Promotion = table.Column<int>(type: "int", nullable: false),
                    Describe = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coupons", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "AppRoles",
                keyColumn: "Id",
                keyValue: new Guid("8d04dce2-969a-435d-bba4-df3f325983dc"),
                column: "ConcurrencyStamp",
                value: "6133c43f-3530-465a-be91-751beefd6475");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("69bd714f-9576-45ba-b5b7-f00649be00de"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "6366c7d1-3834-463c-b049-55fd025e9ce9", "AQAAAAEAACcQAAAAEC90sMNXAOYKNruov9hiyD3UID67nQXAqfMucEP+nzFW0rKju5v+iRFB4IZWJFKK6w==" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2021, 6, 13, 14, 4, 36, 124, DateTimeKind.Local).AddTicks(5612));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateCreated",
                value: new DateTime(2021, 6, 13, 14, 4, 36, 125, DateTimeKind.Local).AddTicks(3416));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "DateCreated",
                value: new DateTime(2021, 6, 13, 14, 4, 36, 125, DateTimeKind.Local).AddTicks(3446));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "DateCreated",
                value: new DateTime(2021, 6, 13, 14, 4, 36, 125, DateTimeKind.Local).AddTicks(3449));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "DateCreated",
                value: new DateTime(2021, 6, 13, 14, 4, 36, 125, DateTimeKind.Local).AddTicks(3451));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "DateCreated",
                value: new DateTime(2021, 6, 13, 14, 4, 36, 125, DateTimeKind.Local).AddTicks(3453));

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CouponId",
                table: "Orders",
                column: "CouponId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Coupons_CouponId",
                table: "Orders",
                column: "CouponId",
                principalTable: "Coupons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Coupons_CouponId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "Coupons");

            migrationBuilder.DropIndex(
                name: "IX_Orders_CouponId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CouponId",
                table: "Orders");

            migrationBuilder.UpdateData(
                table: "AppRoles",
                keyColumn: "Id",
                keyValue: new Guid("8d04dce2-969a-435d-bba4-df3f325983dc"),
                column: "ConcurrencyStamp",
                value: "4f3ca076-ed9a-49fb-b100-1520efa50849");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("69bd714f-9576-45ba-b5b7-f00649be00de"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "06579bb2-7759-465b-b220-05650e55ea44", "AQAAAAEAACcQAAAAEMlfqUdtOMlrdVvCS145w273C70Gja2aSPlsApQAuIYU+2mTuYlQBO8W33zJLArEhg==" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2021, 6, 12, 22, 43, 8, 593, DateTimeKind.Local).AddTicks(2046));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateCreated",
                value: new DateTime(2021, 6, 12, 22, 43, 8, 593, DateTimeKind.Local).AddTicks(9540));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "DateCreated",
                value: new DateTime(2021, 6, 12, 22, 43, 8, 593, DateTimeKind.Local).AddTicks(9566));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "DateCreated",
                value: new DateTime(2021, 6, 12, 22, 43, 8, 593, DateTimeKind.Local).AddTicks(9569));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "DateCreated",
                value: new DateTime(2021, 6, 12, 22, 43, 8, 593, DateTimeKind.Local).AddTicks(9571));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "DateCreated",
                value: new DateTime(2021, 6, 12, 22, 43, 8, 593, DateTimeKind.Local).AddTicks(9572));
        }
    }
}
