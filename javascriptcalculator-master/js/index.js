// Funciones para cálculos de interés
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
    // Manejo del formulario de inversión
    const inversionForm = document.querySelector('#inversionForm');
    inversionForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const inversionInicial = parseFloat(document.querySelector('#inversionInicial').value);
        const meses = parseInt(document.querySelector('#meses').value);
        const tipoInteres = document.querySelector('#tipoInteres').value;

        calcularInteresCompuesto(inversionInicial, meses, tipoInteres);

        const targetCurrencyCode = 'CRC';

        fetch('https://openexchangerates.org/api/latest.json?app_id=b19ca0c0171d457da7a6933f5b80380d', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const baseCurrencyRate = data.rates['USD']; 
            const targetCurrencyRate = data.rates[targetCurrencyCode]; 
        
            if (baseCurrencyRate && targetCurrencyRate) {
                const convertedAmount = (inversionInicial * targetCurrencyRate) / baseCurrencyRate;
        
                alert(`Después de ${meses} meses, su inversión inicial de $${inversionInicial.toFixed(2)} ha crecido a ${convertedAmount.toFixed(2)} ${targetCurrencyCode}.`);
            } else {
                alert(`La moneda objetivo ${targetCurrencyCode} no está disponible en el API.`);
            }
        })
        .catch(error => {
            console.error('Error al cargar datos de la API:', error);
        });
    });
}); 
