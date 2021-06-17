var OrderController = function () {
    this.initialize = function () {
        registerEvent();
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    function registerEvent() {
        // Confirm order
        $('body').on('click', '.btn-update-status', function (e) {
            e.preventDefault();
            const id = $(this).data('id');
            updateOrder(id);
        });

        // Cancel order button
        $('body').on('click', '.btn-cancel', function (e) {
            swalWithBootstrapButtons.fire({
                title: 'Bạn chắc chắn muốn hủy đơn hàng?',
                text: "Bạn sẽ không thể khôi phục đơn hàng!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText:'Xác nhận',
                cancelButtonText: 'Hủy',
                reverseButtons: false
            }).then((result) => {
                if (result.isConfirmed) {
                    e.preventDefault();
                    const id = $(this).data('id');
                    cancelOrder(id);
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Bỏ hủy',
                        'Không hủy đơn hàng nữa',
                        'error'
                    )
                }
            })
            
        });
    }

    function cancelOrder(id) {
        $.ajax({
            type: 'POST',
            url: '/Order/CancelOrderStatus',
            data: {
                orderId: id
            },
            success: function (res) {
                localStorage.setItem("canceledOrder", true);
                location.reload();
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    function updateOrder(id) {
        $.ajax({
            type: 'POST',
            url: '/Order/UpdateOrderStatus',
            data: {
                orderId: id
            },
            success: function (res) {
                localStorage.setItem("updatedOrder", true);
                location.reload();
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    $(document).ready(function () {
        // This function will run on every page reload, but the alert will only 
        // happen on if the buttonClicked variable in localStorage == true
        if (localStorage.getItem("canceledOrder")) {
            localStorage.removeItem("canceledOrder");
            swalWithBootstrapButtons.fire(
                'Hủy đơn thành công!',
                'Đơn hàng đã được hủy',
                'success'
            )
        } else if (localStorage.getItem("updatedOrder")) {
            localStorage.removeItem("updatedOrder");
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cập nhật trạng thái đơn hàng thành công',
                showConfirmButton: false,
                timer: 1500,
            })
        }
    });
}


