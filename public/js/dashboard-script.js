document.addEventListener("DOMContentLoaded", function(event) {
    $.ajax({
        url : "/api/internal/count-dashboard",
        method : "get",
        success : (res) => {
            if(res.statusCode === 200) {
                const pengaduanCount = document.getElementById("pengaduanCount")
                const accountCount = document.getElementById("accountCount")
    
                pengaduanCount.innerHTML = res.data.pengaduan
                
                if(accountCount !== null) {
                    accountCount.innerHTML = res.data.akun
                }
            }
        },
        error : () => {
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    })
});