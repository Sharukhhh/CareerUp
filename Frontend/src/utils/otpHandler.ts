import Swal from 'sweetalert2';
import { useState } from 'react';

export const otpHandler = () => {

    const [otp ,setOtp] = useState<string>('');
    console.log(otp)

    const showOtpModal = async () => {
        const { value: userOtp } = await Swal.fire({
            title: 'Enter OTP',
            input: 'text',
            inputLabel: 'OTP',
            showCancelButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            inputPlaceholder: 'Enter your OTP',
            confirmButtonText: 'Submit',
            preConfirm: (otp) => {
                if (!otp) {
                Swal.showValidationMessage('Please enter OTP');
                }
                return otp;
            },
        });

        if(userOtp) {
            setOtp(userOtp);
        }
        return userOtp;
    }

    return {
        showOtpModal
    }
}


