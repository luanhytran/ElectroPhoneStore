// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
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
            console.log(res)
        },
        error: function (err) {
            console.log(err)
        }
    })
})