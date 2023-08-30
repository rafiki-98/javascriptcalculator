//Agrego este código aparte porque me genera un inconveniente con mi código de inversiones, sin embargo agregué el API para convertir
//la inversion a otra moneda.

    // Manejo del formulario de crédito
    const creditForm = document.getElementById("creditForm");
    creditForm.addEventListener("submit", function (event) {
        event.preventDefault();
        // Obtén los valores de los campos
        const fullName = document.getElementById("fullName").value;
        const cedula = document.getElementById("cedula").value;
        const birthDate = document.getElementById("birthDate").value;
        const workType = document.getElementById("workType").value;
        const incomeRange = document.getElementById("incomeRange").value;

        // Validación de campos vacíos
        if (!fullName || !cedula || !birthDate || !workType || !incomeRange) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Validación de edad (mayor de 21 años)
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        const age = today.getFullYear() - birthDateObj.getFullYear();
        if (age < 21) {
            alert("Debes ser mayor de 21 años para adquirir nuestros préstamos.");
            return;
        }

        // Validación de número de cédula (9 dígitos, no empieza con 0)
        if (!/^[1-9]\d{8}$/.test(cedula)) {
            alert("Por favor, ingresa un número de cédula válido sin puntos ni guiones.");
            return;
        }

        // Validación de salario (menor a 500-600)
        if (incomeRange === "menos300" || incomeRange === "300-400") {
            alert("Lo sentimos, tu solicitud de préstamo ha sido denegada. Por favor, inténtalo nuevamente en 6 meses.");
            return;
        }

        fetch('https://openexchangerates.org/api/latest.json?app_id=b19ca0c0171d457da7a6933f5b80380d') 
            .then(response => response.json())
            .then(data => {
                alert(`Tu solicitud de préstamo ha sido recibida. Un miembro de nuestro equipo se pondrá en contacto contigo. Datos de préstamo: ${JSON.stringify(data)}`);
            })
            .catch(error => {
                console.error('Error al cargar datos de la API:', error);
            });
});
