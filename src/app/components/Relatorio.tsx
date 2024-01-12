import jsPDF from "jspdf";

type Props = {
    lista: any[]
}

const Relatorio = ({lista}:Props) => {
    const pdf = new jsPDF();
  
    // Título do PDF
    pdf.text('Relatório', 10, 10);
  
    // Loop através do array de objetos e adiciona as informações ao PDF
    lista.forEach((item, index) => {
      const yPos = 20 + index * 10;
      pdf.text(`${item.nome}: ${item.crm}`, 10, yPos);
    });
  
    // Salva o PDF ou exibe no navegador
    pdf.save('relatorio.pdf');
  };
  