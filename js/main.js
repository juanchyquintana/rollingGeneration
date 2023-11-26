class Persona {
  constructor(nombre, edad, dni, sexo, anoNacimiento) {
    this.nombre = nombre;
    this.edad = edad;
    this.dni = dni;
    this.sexo = sexo;
    this.anoNacimiento = anoNacimiento;
  }

  // Metodos
  mostrarGeneracion() {
    const anio = this.anoNacimiento;
    let generacion = "";
    let rasgos = "";

    if (anio >= 1994) {
      generacion = "Generación Z";
      rasgos = "Irrevencia";
    } else if (anio >= 1981) {
      generacion = "Generación Y";
      rasgos = "Frustración";
    } else if (anio >= 1969) {
      generacion = "Generación X";
      rasgos = "Obsesión por el éxito";
    } else if (anio >= 1949) {
      generacion = "Generación Baby Boom";
      rasgos = "Ambición";
    } else {
      generacion = "Generación Silent Generation";
      rasgos = "Austeridad";
    }

    const seccionPrincipal = document.querySelector("#seccionPrincipal");
    const mostrarGeneracion = document.createElement("div");
    mostrarGeneracion.className = "d-flex flex-column justify-content-center";
    mostrarGeneracion.innerHTML = `
        <div class="d-flex flex-column justify-content-center" id="mostrarGeneracion">
          <h2 class="fw-bold text-uppercase text-center">Rolling Prediction - Conozca su Generación</h2>

          <div class="border border-bottom border-black my-2"></div>

            <div class="container text-center">
              <p class="fs-4 fw-bold text-uppercase text-success">- Hola ${this.nombre} -</p>
              <p class="text-uppercase fw-bold ">Te queriamos informar que perteneces a la <span class="text-danger">${generacion}</span> y su rasgo caracteristico es <span class="text-danger">${rasgos}</span></p>
          </div>

          <div class="d-flex flex-column justify-content-center gap-2">
            <button id="consultarDatos" class="btn btn-primary mt-2">Ver datos</button>

            <button id="consultarEdad" class="btn btn-warning mt-2">¿Soy mayor de edad?</button>
          </div>
        </div>
      `;
    seccionPrincipal.appendChild(mostrarGeneracion);
  }

  esMayorDeEdad() {
    if (this.edad >= 18) {
      const seccionPrincipal = document.querySelector("#seccionPrincipal");
      const mayorEdad = document.createElement("div");
      mayorEdad.className = "d-flex flex-column justify-content-center";
      mayorEdad.innerHTML = `
          <div class="d-flex flex-column justify-content-center">
            <h2 class="fw-bold text-uppercase text-center">Rolling Prediction - Conozca su Generación</h2>

            <div class="border border-bottom border-black my-2"></div>

              <div class="container text-center">
                <p class="fs-4 fw-bold text-uppercase text-success">- Hola ${this.nombre} -</p>
                <p class="text-uppercase fw-bold ">Eres mayor de edad (${this.edad})</p>
            </div>

            <a class="btn btn-success mt-2 text-uppercase lead" href="../index.html">Volver al Inicio</a>
          </div>
        `;
      seccionPrincipal.appendChild(mayorEdad);
    } else {
      const seccionPrincipal = document.querySelector("#seccionPrincipal");
      const menorEdad = document.createElement("div");
      menorEdad.className = "d-flex flex-column justify-content-center";
      menorEdad.innerHTML = `
          <div class="d-flex flex-column justify-content-center">
            <h2 class="fw-bold text-uppercase text-center">Rolling Prediction - Conozca su Generación</h2>

              <div class="container text-center">
                <p class="fs-4 fw-bold text-uppercase text-success">- Hola ${this.nombre} -</p>
                <p class="text-uppercase fw-bold ">Eres menor de edad (${this.edad})</p>
            </div>
          </div>
        `;
      seccionPrincipal.appendChild(menorEdad);
    }
  }

  mostrarDatos() {
    const seccionPrincipal = document.querySelector("#seccionPrincipal");
    const divResultado = document.createElement("div");
    divResultado.className = "d-flex flex-column justify-content-center";
    divResultado.innerHTML = `
          <div class="d-flex flex-column justify-content-center">
            <h2 class="fw-bold text-uppercase text-center">Rolling Prediction - Conozca su Generación</h2>

            <div class="border border-bottom border-black my-2"></div>

              <div class="container text-center">
                <p class="fs-4 fw-bold text-uppercase text-success">- Hola ${this.nombre} -</p>
                <p class="text-uppercase fw-bold ">Estos son sus datos:</p>

                <ul class="list-unstyled">
                  <li><span class="fw-bolder">Nombre:</span> ${this.nombre}</li>
                  <li><span class="fw-bolder">Edad:</span> ${this.edad}</li>
                  <li><span class="fw-bolder">D.N.I:</span> ${this.dni}</li>
                  <li><span class="fw-bolder">Sexo:</span> ${this.sexo}</li>
                  <li><span class="fw-bolder">Fecha:</span> ${this.anoNacimiento}</li>
                </ul>
            </div>

            <a class="btn btn-success mt-2 text-uppercase lead" href="../index.html">Volver al Inicio</a>
          </div>
        `;
    seccionPrincipal.appendChild(divResultado);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Seleccionamos los inputs del interfaz para obtener el valor
  const nombre = document.querySelector("#nombre");
  const edad = document.querySelector("#edadPersona");
  const dni = document.querySelector("#dni");
  const sexo = document.querySelector("#sexo");
  const nacimiento = document.querySelector("#fechaNacimiento");

  // Seleccionamos los elementos del DOM
  const formulario = document.querySelector("#formGeneracion");
  const zonaAlerta = document.querySelector("#zoneAlerta");
  const btnSubmit = document.querySelector('#formGeneracion button[type="submit"]');

  // Eventos del Formulario
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const fechaNacimiento = new Date(nacimiento.value);
    const anoNacimiento = fechaNacimiento.getFullYear();

    const consultor = new Persona(
      nombre.value,
      edad.value,
      dni.value,
      sexo.value,
      anoNacimiento
    );

    const restriccionEdad = /^\d+$/;
    const restriccionDNI = /^\d{8}$/;


    if(!restriccionEdad.test(edad.value) || !restriccionDNI.test(dni.value) ) {
      alertaDniEdad()
    } else {
      eliminarAlertaDniEdad()
    }

    if (
      nombre.value.trim() === "" ||
      sexo.value.trim() === "" ||
      nacimiento.value.trim() === ""
    ) {
      mostrarAlerta();
    }else if (btnSubmit.innerHTML.includes("Mostrar Generación")) {
      const persona = consultor

      formulario.className = "d-none";

      persona.mostrarGeneracion();
    } else {
      const alert = document.querySelector("#alertaFormulario");
      alert.className = "d-none";
      alert.innerHTML = "";
    }

    const esMayorMenor = () => {
      const mostrarGene = document.querySelector('#mostrarGeneracion')
      mostrarGene.className = "d-none"
      consultor.esMayorDeEdad()
    }

    const datosMostrar = () => {
      const mostrarGene = document.querySelector('#mostrarGeneracion')
      mostrarGene.className = "d-none"
      consultor.mostrarDatos()
    }

    const btnEdad = document.querySelector('#consultarEdad')
    btnEdad.addEventListener("click", esMayorMenor)

    const btnDatos = document.querySelector('#consultarDatos')
    btnDatos.addEventListener("click", datosMostrar)
  });

  // Funciones
  let alertaMostrada = false;
  let alertaDni = false

  const mostrarAlerta = () => {
    if (!alertaMostrada) {
      const alert = document.createElement("div");
      alert.id = "alertaFormulario";
      alert.className = "d-flex flex-column justify-content-center";
      alert.innerHTML = `        
      <div class="d-flex flex-column justify-content-center">
          <p class="text-white text-center fw-bold bg-danger rounded mt-2 shadow ">Hay campos vacíos. Complete todo, por favor.</p>
      </div>
  
      `;
      zonaAlerta.appendChild(alert);
      alertaMostrada = true;
    }
  };

  const alertaDniEdad = () => {
    if(!alertaDni) {
      const alertDniEdad = document.createElement("div");
      alertDniEdad.id = "alertaFormulario";
      alertDniEdad.className = "d-flex flex-column justify-content-center";
      alertDniEdad.innerHTML = `        
      <div class="d-flex flex-column justify-content-center">
          <p class="text-white text-center fw-bold bg-danger rounded mt-2 shadow"
            id="dniAlert"
          >El DNI o su Edad es erronea. Complete todo, por favor.</p>
      </div>
  
      `;
      zonaAlerta.appendChild(alertDniEdad);
      alertaDni = true;
    }
  }

  const eliminarAlertaDniEdad = () => {
    const alertaFormulario = document.getElementById("alertaFormulario");
  
    if (alertaFormulario) {
      alertaFormulario.remove();
      alertaDni = false; 
    }
  };
});
