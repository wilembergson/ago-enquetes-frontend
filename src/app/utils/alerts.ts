import Swal from "sweetalert2"

const ConfirmarAlert = (funcao:any, titulo:string, mensagem:string) => {
    Swal.fire({
      title: titulo,
      text: mensagem,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        funcao();
      }
    });
  };


const ErrorAlert = async (mensagem: string) => {
    Swal.fire({
        position: "center",
        icon: "error",
        title: mensagem,
        showConfirmButton: true
      });
};

const SucessoAlert = async (mensagem: string) => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: mensagem,
        showConfirmButton: true
      });
};

const alerts = {
    ConfirmarAlert,
    ErrorAlert,
    SucessoAlert
}

export default alerts