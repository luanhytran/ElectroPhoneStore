var SiteController = function () {
    this.initialize = function () {
        registerEvents();
        loadCart();
    }

    function loadCart() {
        const culture = $('#hidCulture').val();
        $.ajax({  // xử lý khi click thêm Product vào Cart
            type: "GET",
            url: "/" + culture + '/Cart/GetListItems',
            success: function (res) {
                $('#lbl_number_of_items_header').text(res.length);
            }
        });
    }

    function registerEvents() {
        // Chức năng thêm vào giỏ hàng
        $('body').on('click', '.btn-add-cart', function (e) {
            e.preventDefault(); // line này để khi bấm ok (alert) thì không bị nhảy lên top website

            const culture = $('#hidCulture').val();
            const id = $(this).data('id');

            $.ajax({  // xử lý khi click thêm Product vào Cart
                type: "POST",
                url: '/' + culture + '/Cart/AddToCart',
                data: {
                    id: id,
                    languageId: culture
                },
                success: function (res) {
                    $('#lbl_number_of_items_header').text(res.length);
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}