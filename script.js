// Cambiar de sección y actualizar botón activo
function mostrarSeccion(id, botonElemento) {
  const secciones = document.querySelectorAll(".seccion");
  secciones.forEach(seccion => seccion.classList.remove("activa"));

  const botones = document.querySelectorAll("nav button");
  botones.forEach(boton => boton.classList.remove("activo"));

  document.getElementById(id).classList.add("activa");
  
  if (botonElemento) {
    botonElemento.classList.add("activo");
  }
}

// 1. Cálculo de RPM (Mecanizado)
function calcularRPM() {
  const diametro = parseFloat(document.getElementById("diametro").value);
  const velocidadCorte = parseFloat(document.getElementById("velocidadCorte").value);
  const resultado = document.getElementById("resultadoRPM");

  if (isNaN(diametro) || isNaN(velocidadCorte) || diametro <= 0 || velocidadCorte <= 0) {
    resultado.textContent = "⚠️ Introduce valores válidos mayores a cero.";
    return;
  }

  const rpm = (velocidadCorte * 1000) / (Math.PI * diametro);
  resultado.innerHTML = `⚙️ Velocidad recomendada: <strong>${rpm.toFixed(0)} RPM</strong>`;
}

// 2. Conversor de Pulgadas a mm
function convertirPulgadas() {
  const pulg = parseFloat(document.getElementById("pulgadas").value);
  const resultado = document.getElementById("resultadoPulgadas");

  if (isNaN(pulg) || pulg < 0) {
    resultado.textContent = "Introduce un valor numérico válido.";
    return;
  }

  const mm = pulg * 25.4;
  resultado.innerHTML = `📏 ${pulg} pulgadas = <strong>${mm.toFixed(3)} mm</strong>`;
}

// 3. Cálculo aproximado de broca para rosca métrica (Diámetro - Paso)
function calcularBroca() {
  const nominal = parseFloat(document.getElementById("nominalRosca").value);
  const paso = parseFloat(document.getElementById("pasoRosca").value);
  const resultado = document.getElementById("resultadoGeometria");

  if (isNaN(nominal) || isNaN(paso) || nominal <= 0 || paso <= 0) {
    resultado.textContent = "⚠️ Introduce valores válidos para diámetro y paso.";
    return;
  }

  const diametroBroca = nominal - paso;
  resultado.innerHTML = `🔩 Diámetro de broca sugerido para taladrar: <strong>${diametroBroca.toFixed(2)} mm</strong>`;
}

// Base de datos interna con las 10 herramientas principales de cada categoría
const datosHerramientas = {
  plaquitas: {
    titulo: "🔪 Las 10 Plaquitas de Metal Duro Esenciales",
    items: [
      "<strong>CNMG:</strong> Plaquita romboide de 80° ideal para desbaste y acabado general en aceros.",
      "<strong>DNMG:</strong> Plaquita romboide de 55° perfecta para perfilado y cortes con ángulos cerrados.",
      "<strong>WNMG:</strong> Plaquita trigonal de 80° con gran estabilidad y múltiples aristas de corte.",
      "<strong>SNMG:</strong> Plaquita cuadrada con excelente resistencia para operaciones pesadas de desbaste.",
      "<strong>VNMG:</strong> Plaquita rómbica de 35°, muy utilizada en acabados finos y copiado.",
      "<strong>CCMT:</strong> Plaquita romboide positiva de 7/8° para torneado interior (mandrinos) y exterior liviano.",
      "<strong>DCMT:</strong> Plaquita romboide positiva de 55° para acabados de precisión en aceros e inoxidables.",
      "<strong>APKT / APMT:</strong> Plaquitas rectangulares diseñadas específicamente para fresado de escuadras y ranuras.",
      "<strong>RPMT / RCGT:</strong> Plaquitas redondas ideales para moldes, matrices y fresado de perfiles 3D complejos.",
      "<strong>TPKN / TCGT:</strong> Plaquitas triangulares clásicas empleadas tanto en fresado frontal como en soportes específicos."
    ]
  },
  portaherramientas: {
    titulo: "🔩 Los 10 Portaherramientas y Sistemas Principales",
    items: [
      "<strong>Portaherramientas Exterior SCLCR/L:</strong> Empleado con plaquitas CCMT para torneado longitudinal y refrentado a 95°.",
      "<strong>Portaherramientas Exterior MWLNR/L:</strong> Utilizado con plaquitas WNMG para desbastes pesados y escuadras.",
      "<strong>Portaherramientas Exterior PCLNR/L:</strong> Configurado con plaquitas CNMG para operaciones generales de cilindrado.",
      "<strong>Mandrino de Torneado Interior (Boring Bar):</strong> Portaherramientas cilíndrico para mecanizar diámetros interiores y cajeras.",
      "<strong>Portaherramientas de Tronzado y Ranurado:</strong> Diseñado para cortar piezas o generar gargantas profundas.",
      "<strong>Portaherramientas de Roscado (Externo/Interno):</strong> Sistema para plaquitas perfiladas de rosca métrica, Whitworth, etc.",
      "<strong>Porta-pinzas ER (Collet Chuck):</strong> Sistema cónico de alta precisión para sujetar brocas y fresas cilíndricas.",
      "<strong>Porta-fresas de Planear (Shell Mill Holder):</strong> Eje de acoplamiento directo para fresas de diámetro grande.",
      "<strong>Portabrocas de apriete rápido:</strong> Utilizado en el contrapunto del torno o taladro para brocas de mango cilíndrico.",
      "<strong>Cabezal Portacuchillas orientable:</strong> Permite ajuste milimétrico para mandrinado y refrentado en fresadoras o alesadoras."
    ]
  },
  medicion: {
    titulo: "📏 Los 10 Instrumentos de Medición Metrológica Principales",
    items: [
      "<strong>Pie de Rey (Calibrador Vernier / Digital):</strong> Instrumento versátil para medir exteriores, interiores y profundidades con resolución de 0.02mm o 0.01mm.",
      "<strong>Micrómetro de Exteriores:</strong> Herramienta de alta precisión (hasta milésimas de milímetro) para diámetros de ejes y piezas cilíndricas.",
      "<strong>Micrómetro de Interiores:</strong> Empleado para control dimensional estricto de agujeros y alojamientos cilíndricos.",
      "<strong>Reloj Comparador (Dial Indicator):</strong> Mide desviaciones infinitesimales, clave para centrar piezas en el plato del torno o verificar planitud.",
      "<strong>Calibre de Roscas (Peines de rosca):</strong> Plantillas con los pasos métricos o Whitworth para identificar rápidamente el paso de una rosca.",
      "<strong>Galgas de Espesores (Láminas calibradas):</strong> Usadas para medir holguras, tolerancias estrechas o separación entre componentes.",
      "<strong>Granete:</strong> Punzón de acero endurecido para marcar el centro exacto antes de realizar una perforación con broca.",
      "<strong>Escuadra de Acero de Precisión:</strong> Verifica la perpendicularidad a 90° entre caras de piezas mecanizadas.",
      "<strong>Alexómetro (Calibrador de cilindros):</strong> Reloj comparador especial acoplado a un palpador para medir cotas internas profundas y conicidad.",
      "<strong>Bloques Patrón (Calas Johansson):</strong> Bloques patrón de acero ultraprecisos utilizados como referencia estándar para calibración."
    ]
  }
};

// Funciones para abrir y cerrar el modal
function abrirModal(categoria) {
  const modal = document.getElementById("modalHerramientas");
  const tituloModal = document.getElementById("tituloModal");
  const listaHerramientas = document.getElementById("listaHerramientas");

  const datos = datosHerramientas[categoria];
  if (!datos) return;

  tituloModal.textContent = datos.titulo;
  
  let htmlList = "<ol>";
  datos.items.forEach(item => {
    htmlList += `<li>${item}</li>`;
  });
  htmlList += "</ol>";

  listaHerramientas.innerHTML = htmlList;
  modal.style.display = "flex";
}

function cerrarModal() {
  const modal = document.getElementById("modalHerramientas");
  modal.style.display = "none";
}

// Cerrar el modal si se hace clic fuera de la caja de contenido
window.onclick = function(event) {
  const modal = document.getElementById("modalHerramientas");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

// Verificar si el usuario ya visitó la página al cargar
window.addEventListener("DOMContentLoaded", () => {
  const yaVisitado = localStorage.getItem("laboratorio_visitado");
  
  if (yaVisitado) {
    // Si ya entró antes, ocultamos el modal de bienvenida de inmediato
    document.getElementById("modalBienvenida").style.display = "none";
  }
});

// Función para cerrar el modal de bienvenida y guardarlo en la memoria del navegador
function cerrarBienvenida() {
  const modal = document.getElementById("modalBienvenida");
  modal.style.display = "none";
  
  // Guardamos el registro para que no vuelva a salir en futuras visitas
  localStorage.setItem("laboratorio_visitado", "true");
}
