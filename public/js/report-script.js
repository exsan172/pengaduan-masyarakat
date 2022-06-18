$(document).ready(function() {
    setListData()
});

const setListData = () => {
    $.ajax({
        url : "/api/internal/list-pengaduan",
        method: "GET",
        success : (res) => {
            if(res.statusCode === 200) {
                let html = ""
                for(const i in res.data) {
                    html +=
                    `<tr>
                        <td>${res.data[i].reported}</td>
                        <td>${res.data[i].deed}</td>
                        <td>${res.data[i].seeByadmin === false ? `<span class="text-danger font-weight-bold">Belum di lihat<span>` : `<span class="text-success font-weight-bold">Sudah di lihat</span>`}</td>
                        <td>
                            <div class="d-flex w-100 justify-content-center">
                                <div class="d-flex mr-2">
                                    <button class="btn btn-sm btn-primary" onclick="detailPengaduan('${res.data[i]._id}')">Lihat</button>
                                </div>
                            </div>
                        </td>
                    </tr>`
                }

                document.getElementById('listPengaduan').innerHTML = html

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "gagal memuat pengaduan !"
                })
            }

            $('#dataPengaduan').DataTable();
        },
        error : (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })

            $('#dataPengaduan').DataTable();
        }
    })
}

const detailPengaduan = (id) => {
    $("#pengaduanModals").modal("show")
    $.ajax({
        url : "/api/internal/detail-pengaduan/"+id,
        method: "GET",
        success : (res) => {
            const proofPhoto = document.getElementById("proofPhoto")
            const terlapor = document.getElementById("terlapor")
            const perbuatan = document.getElementById("perbuatan")
            const satuan_kerja = document.getElementById("satuan_kerja")
            const nama_pelapor = document.getElementById("nama_pelapor")
            const hp_pelapor = document.getElementById("hp_pelapor")
            const alamat_pelapor = document.getElementById("alamat_pelapor")

            if(res.statusCode === 200) {
                proofPhoto.setAttribute("src", res.data.incident_photo)
                terlapor.innerHTML = res.data.reported
                perbuatan.innerHTML = res.data.deed
                satuan_kerja.innerHTML = res.data.work_unit
                nama_pelapor.innerHTML = res.data.name
                hp_pelapor.innerHTML = res.data.phone
                alamat_pelapor.innerHTML = res.data.address
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "gagal memuat pengaduan !"
                })
            }

            setListData()
        },
        error : (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })
        }
    })
}