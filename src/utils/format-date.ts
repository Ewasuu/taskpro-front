function formatDate(date: string) {
    let newDate = new Date(date ?? "");
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1; // Los monthes en JavaScript empiezan en 0
    let year = newDate.getFullYear();
  
    const fechaFormateada = `${day}/${month}/${year}`;
  
    return fechaFormateada;
  }

export default formatDate;