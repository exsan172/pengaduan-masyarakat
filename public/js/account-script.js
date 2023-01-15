$(document).ready(function() {
    setListDataAccount()
});

const createUser = () => {
    const nameUser = document.getElementById("nameUser")
    const emailUser = document.getElementById("emailUser")
    const passwordUser = document.getElementById("passwordUser")
    const roleUser = document.getElementById("roleUser")

    if(nameUser.value !== "" && emailUser.value !== "" && passwordUser.value !== "" && roleUser.value !== "") {
        $.ajax({
            url : "/api/internal/register",
            method: "POST",
            data : {
                name : nameUser.value,
                email : emailUser.value,
                password : passwordUser.value,
                role : roleUser.value
            },
            success : (res) => {
                if(res.statusCode === 200) {
                    $("#addUserModals").modal("hide")
                    Swal.fire({
                        icon: 'success',
                        title: 'Sukses',
                        text: "penguna baru di buat!"
                    })
                    setListDataAccount()
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "gagal membuat penguna baru!"
                    })
                }
            },
            error : (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message
                })
            }
        })
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'isi semua data yang di perlukan !'
        })
    }
}

const setListDataAccount = () => {
    $.ajax({
        url : "/api/internal/list-user",
        method: "GET",
        success : (res) => {
            if(res.statusCode === 200) {
                let html = ""
                for(const i in res.data) {
                    html +=
                    `<tr>
                        <td>${res.data[i].name}</td>
                        <td>${res.data[i].username}</td>
                        <td>${res.data[i].role}</td>
                        <td>
                            <div class="d-flex w-100 justify-content-center">
                                <div class="d-flex mr-2">
                                    <button class="btn btn-sm btn-primary" onclick="editUserModals('${[res.data[i].name+"|"+res.data[i].username+"|"+res.data[i].role+"|"+res.data[i]._id]}')">Ubah</button>
                                </div>
                                <div class="d-flex">
                                    <button class="btn btn-sm btn-danger" onclick="confirmDeleteUser('${res.data[i]._id}')">Hapus</button>
                                </div>
                            </div>
                        </td>
                    </tr>`
                }

                document.getElementById('listUser').innerHTML = html

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "gagal memuat penguna !"
                })
            }

            $('#dataTable').DataTable();
        },
        error : (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })

            $('#dataTable').DataTable();
        }
    })
}

const confirmDeleteUser = (id) => {
    $("#deleteUserModals").modal("show")
    document.getElementById("deleteUserBtn").setAttribute("onclick", `deleteUser('${id}')`)
}

const deleteUser = (id) => {
    $.ajax({
        url : "/api/internal/delete-user/"+id,
        method: "DELETE",
        success : (res) => {
            if(res.statusCode === 200) {
                $("#deleteUserModals").modal("hide")
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses',
                    text: "penguna di hapus!"
                })
                setListDataAccount()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "gagal meghapus penguna !"
                })
            }
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

const editUserModals = (data) => {
    const splitData = data.split("|")

    $("#editUserModels").modal("show")
    document.getElementById("updateUserBtn").setAttribute("onclick", `updateUser('${splitData[3]}')`)

    const name = document.getElementById("editNameUser")
    const email = document.getElementById("editEmailUser")
    const role = document.getElementById("editRoleUser")

    name.value = splitData[0]
    email.value = splitData[1]
    role.value = splitData[2]
}

const updateUser = (id) => {
    const name = document.getElementById("editNameUser")
    const email = document.getElementById("editEmailUser")
    const role = document.getElementById("editRoleUser")

    $.ajax({
        url : "/api/internal/update-user",
        method: "PUT",
        data : {
            id:id,
            name :name.value,
            email : email.value,
            role : role.value
        },
        success : (res) => {
            if(res.statusCode === 200) {
                $("#editUserModels").modal("hide")
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses',
                    text: "penguna di perbarui !"
                })
                setListDataAccount()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "gagal perbarui penguna !"
                })
            }
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