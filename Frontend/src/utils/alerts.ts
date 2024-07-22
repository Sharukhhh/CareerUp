import Swal from 'sweetalert2';



export const errorPopAlert = (message: string) => {
    Swal.fire({
        icon: 'error',
        text: message,
    });
}


export const passwordValidationAlert = () => {
    const requirements  = `Password must be at least 5 characters long,
    contain at least one uppercase letter, one lowercase letter, one number, and one special character.`

    errorPopAlert(requirements);
}


export const confirmationBox = (message: string, btnText: string, callback: () => void) => {
    Swal.fire({
        title: message,
        showCancelButton: true,
        confirmButtonText: btnText,
    }).then((result) => {
        if(result.isConfirmed) {
            callback();
        }
    })
}