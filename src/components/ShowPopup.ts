import Swal, { SweetAlertIcon } from 'sweetalert2';

export function showPopup(title: string, text: string, icon: SweetAlertIcon, showDenyButton: boolean, denyButtonText?:string) {
    return Swal.fire({
        title:title,
      text: text,
      icon: icon,
      showDenyButton: showDenyButton,
      denyButtonText:denyButtonText,
      confirmButtonText: 'Yes',
      confirmButtonColor:"#2196f3"
    });
}
