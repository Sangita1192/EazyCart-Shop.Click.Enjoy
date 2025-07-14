import Swal from 'sweetalert2';

export const confirmDelete = async () => {
  return Swal.fire({
    title: 'Are you sure?',
    text: "This action can't be undone!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });
};
