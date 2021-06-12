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
                $('#lbl_number_of_items_header').text(res.length);
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
                if (res.length === 0) {
                    $('#checkout-button-modal').attr("href", "/")
                    $('.checkout-btn').hide();
                    $('#tbl_cart').hide();
                }

                var html = '';
                var total = 0;

                $.each(res, function (i, item) {
                    var amount = item.price * item.quantity;
                    html += "<tr>"
                        + "<td> <img width=\"60\" src=\"" + $('#hidBaseAddress').val() + item.image + "\" alt=\"\" /></td>"
                        + "<td>" + item.name + "</td>"
                        + "<td class=\"availability in-stock text-center\"><span class=\"label\">In stock</span></td>"
                        + "<td>" + numberWithCommas(item.price) + " <span>&#8363;</span>" + "</td>"
                        + "<td><div class=\"input-append\"><input class=\"span1\" style=\"max-width: 34px\" placeholder=\"1\" id=\"txt_quantity_" + item.productId + "\" value=\"" + item.quantity + "\" size=\"16\" type=\"text\">"
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
                $('#lbl_number_of_items').text(res.length);
                $('#lbl_total').text(numberWithCommas(total));
            }
        });
    }
}