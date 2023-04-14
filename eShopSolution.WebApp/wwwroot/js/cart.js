var CartController = function () {
    this.initialize = function () {
        loadData();
        registerEvents();
    }

    function registerEvents() {
        // chức năng tăng số lượng
        $('body').on('click', '.btn-plus', function (e) {
            e.preventDefault(); // line này để khi bấm ok (alert) thì không bị nhảy lên top website
            const id = $(this).data('id');
            const quantity = parseInt($('#txt_quantity_' + id).val()) + 1;
            updateCart(id, quantity);
        });

        // chức năng giảm số lượng
        $('body').on('click', '.btn-minus', function (e) {
            e.preventDefault(); // line này để khi bấm ok (alert) thì không bị nhảy lên top website
            const id = $(this).data('id');
            const quantity = parseInt($('#txt_quantity_' + id).val()) - 1;
            updateCart(id, quantity);
        });

        // chức năng xóa sản phẩm
        $('body').on('click', '.btn-remove', function (e) {
            e.preventDefault(); // line này để khi bấm ok (alert) thì không bị nhảy lên top website
            const id = $(this).data('id');
            updateCart(id, 0);
        });

        $('body').on('click', '#btn-apply-coupon', function (e) {
            e.preventDefault();
            const code = $("#coupon-input-control").val();
            applyCoupon(code);
        });
    }

    function updateCart(id, quantity) {
        const culture = $('#hidCulture').val();
        $.ajax({  // xử lý khi click thêm Product vào Cart
            type: "POST",
            url: '/' + culture + '/Cart/UpdateCart',
            data: {
                id: id,
                quantity: quantity
            },
            success: function (res) {
                if (res == "quantity is greater than stock") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Số lượng mua đã lớn hơn số lượng trong kho của sản phẩm',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }

                $('#lbl_number_of_items_header').text(res.cartItems.length);
                loadData();
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    function loadData() {
        const culture = $('#hidCulture').val();
        $.ajax({  // xử lý khi click thêm Product vào Cart
            type: "GET",
            url: "/" + culture + '/Cart/GetListItems',
            success: function (res) {
                var cartItemsList = res.cartItems;
                var promotion = res.promotion;

                if (cartItemsList.length === 0) {
                    $('.checkout-btn').hide();
                    $('#tbl_cart').hide();
                    $('#coupon-input').hide();
                }

                var html = '';
                var total = 0;

                $.each(cartItemsList, function (i, item) {
                    var amount = item.price * item.quantity;
                    html += "<tr>"
                        + "<td> <img width=\"60\" src=\"" + $('#hidBaseAddress').val() + item.image + "\" alt=\"\" /></td>"
                        + "<td>" + item.name + "</td>"
                        + "<td class=\"availability in-stock text-center\"><span class=\"label\">In stock</span></td>"
                        + "<td>" + numberWithCommas(item.price) + " <span>&#8363;</span>" + "</td>"
                        + "<td><div class=\"input-append\"><input disabled class=\"span1\" style=\"max-width: 34px\" placeholder=\"1\" id=\"txt_quantity_" + item.productId + "\" value=\"" + item.quantity + "\" size=\"16\" type=\"text\">"
                        + "<button class=\"btn-minus\" data-id=\"" + item.productId + "\" type =\"button\"> <i class=\"fa fa-minus\"></i></button>"
                        + "<button class=\"btn-plus\" data-id=\"" + item.productId + "\" type=\"button\"><i class=\"fa fa-plus\"></i></button>"
                        + "</div>"
                        + "</td>"
                        + "<td>" + numberWithCommas(amount) + " <span>&#8363;</span>" + "</td>"
                        + "<td><div class=\"input-append text-center\">"
                        + "<a class=\"btn-remove\" type=\"button\" data-id=\"" + item.productId + "\"><i class=\"fa fa-trash-o\"></i></a>"
                        + "</div>"
                        + "</td>"
                        + "</tr>";
                    total += amount;
                });

                $('#cart_body').html(html);
                $('#lbl_number_of_items').text(cartItemsList.length);
                $('#lbl_total').text(numberWithCommas(total));

                if (promotion !== 0) {
                    var discountAmount = total - (total * ((100 - promotion) / 100));
                    $('#discount_amount_row').show();
                    $('#total_discounted_row').show();
                    $('#lbl_discount_amount').text(numberWithCommas(discountAmount));
                    $('#lbl_total_discounted').text(numberWithCommas(total * ((100 - promotion) / 100)));
                } else {
                    $('#discount_amount_row').hide();
                    $('#total_discounted_row').hide();
                }
            }
        });
    }

    function applyCoupon(code) {
        const culture = $('#hidCulture').val();
        $.ajax({
            type: "POST",
            url: "/" + culture + "/Coupon/ApplyCoupon",
            data: { code: code },
            success: function (res) {
                if (res === 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Một mã coupon chỉ được áp dụng cho 1 đơn hàng',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    return res;
                } else if (res === -1) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Mã coupon này đã hết lượt sử dụng',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    return res;
                } else if (res === -2) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Mã coupon không tồn tại',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    return res;
                }

                loadData();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Áp dụng coupon thành công',
                    showConfirmButton: false,
                    timer: 1500,
                })
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
}