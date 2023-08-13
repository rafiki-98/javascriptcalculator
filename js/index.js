//Calcular el interés compuesto para una empresa que realiza inversiones en la bolsa de valores de NY.

document.addEventListener("DOMContentLoaded", function () {
    const creditForm = document.getElementById("creditForm");
    const fullNameInput = document.getElementById("fullName");
    const cedulaInput = document.getElementById("cedula");
    const workTypeInput = document.getElementById("workType");
    const birthDateInput = document.getElementById("birthDate");

    creditForm.addEventListener("submit", function (event) {
        if (!fullNameInput.value || !cedulaInput.value || !workTypeInput.value || !birthDateInput.value) {
            event.preventDefault();
            alert("Por favor complete todos los campos del formulario.");
        } else if (!/^[0-9]{9}$/.test(cedulaInput.value) || cedulaInput.value[0] === "0") {
            event.preventDefault();
            alert("Número de cédula inválido. Ingrese los 9 números de cédula sin puntos ni guiones.");
        } else if (new Date().getFullYear() - new Date(birthDateInput.value).getFullYear() < 21) {
            event.preventDefault();
            alert("Debes ser mayor de 21 años para acceder a cualquiera de nuestros servicios.");
        } else {
            window.location.href = "./pages/nosotros.html";
        }
    });
});

function interesSimpleMensual(inversionInicial, tasaInteresMensual, meses) {
    return inversionInicial + inversionInicial * tasaInteresMensual * meses;
}

function interesCompuestoMensual(inversionInicial, tasaInteresMensual, meses) {
    return inversionInicial * tasaInteresMensual;
}

function calcularInteresCompuesto(inversionInicial, meses, tipoInteres) {
    let tasaInteresMensual;
    let saldoFinal;

    if (tipoInteres === "1") {
        tasaInteresMensual = 0.20;
        saldoFinal = interesSimpleMensual(inversionInicial, tasaInteresMensual, meses);
    } else if (tipoInteres === "2") {
        tasaInteresMensual = 0.15;
        let inversionTemporal = inversionInicial; 
        const saldosPorMes = Array.from({ length: meses }, () => {
            const interes = interesCompuestoMensual(inversionTemporal, tasaInteresMensual, meses);
            inversionTemporal += interes;
            return inversionTemporal;
        });
        saldoFinal = saldosPorMes[meses - 1];
    } else {
        alert("Usted ha ingresado una opción incorrecta, se procede a una tasa de interés simple");
        tasaInteresMensual = 0.20;
        saldoFinal = interesSimpleMensual(inversionInicial, tasaInteresMensual, meses);
    }

    const resultado = `Después de ${meses} meses, su inversión inicial de $${(inversionInicial).toFixed(2)} ha crecido a $${(saldoFinal).toFixed(2)}.`;
    alert(resultado);
}

window.addEventListener('load', function () {
    const form = document.querySelector('#inversionForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const inversionInicial = parseFloat(document.querySelector('#inversionInicial').value);
        const meses = parseInt(document.querySelector('#meses').value);
        const tipoInteres = document.querySelector('#tipoInteres').value;
        
        calcularInteresCompuesto(inversionInicial, meses, tipoInteres);
    });
});
