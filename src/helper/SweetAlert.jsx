import Swal from 'sweetalert2';
const SweetAlert = (value) => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: value,
        showConfirmButton: false,
        timer: 1000
    });
}

const SweetAlertError = (messsage) => {
    Swal.fire({
        position: "center",
        icon: "warning",
        title: messsage,
        showConfirmButton: false,
        timer: 1000
    });
}

export { SweetAlert, SweetAlertError };