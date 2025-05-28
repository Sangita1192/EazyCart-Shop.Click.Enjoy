import Swal from 'sweetalert2';

export const showSuccessAlert = (title = 'Success', text = 'Operation completed successfully.') => {
  return Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonColor: '#2563eb', 
    confirmButtonText: 'OK',
  });
};
