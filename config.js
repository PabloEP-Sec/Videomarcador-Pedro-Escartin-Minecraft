/* ============================================================================
   VIDEOMARCADOR · ESTADIO PEDRO ESCARTÍN — ARCHIVO DE CONFIGURACIÓN
   ----------------------------------------------------------------------------
   Este es el ÚNICO archivo que necesitas editar para cambiar de partido.

   1. Copia los escudos en la carpeta  escudos/  (PNG con fondo transparente
      o SVG recomendados; también valen JPG/WebP de cualquier tamaño).
   2. Cambia aquí los nombres, el escudo y las alineaciones de cada equipo.
   3. Guarda. Las pantallas y el panel abiertos detectan el cambio solos
      (en unos segundos) y actualizan TODO: marcador, celebraciones,
      alineaciones, tarjetas, textos y panel. No hay que tocar nada más.

   Los textos de las pantallas usan plantillas que se rellenan solas:
     {estadio}            → nombre del estadio
     {local.nombre}       → nombre completo del local      (CD GUADALAJARA)
     {local.corto}        → nombre corto del local         (DÉPOR)
     {local.abrev}        → abreviatura del local          (GUA)
     {local.del}          → "DEL DÉPOR" / "DE LA …" / "DE …" según el artículo
     {local.al}           → "AL DÉPOR" / "A LA …" / "A …"
     (y lo mismo con {visitante.nombre}, {visitante.corto}, …)
   ============================================================================ */

window.VIDEOMARCADOR_CONFIG = {

  estadio: "PEDRO ESCARTÍN",
  competicion: "",                       // opcional, p. ej. "SEGUNDA FEDERACIÓN · JORNADA 12"

  equipos: {

    /* ----------------------------- EQUIPO LOCAL ----------------------------- */
    local: {
      nombre: "CD GUADALAJARA",          // nombre completo
      nombreCorto: "DÉPOR",              // se usa en marcadores estrechos y celebraciones
      abreviatura: "GUA",                // 3 letras para pantallas muy pequeñas
      articulo: "el",                    // "el", "la", "los", "las" o "" → genera "DEL DÉPOR"
      escudo: "escudos/local.png",
      colores: { principal: "#5c388d", secundario: "#ffffff" },
      entrenador: "",
      // Formato: { dorsal, nombre, posicion }  (posicion: POR, DEF, MED, DEL — opcional)
      titulares: [
        { dorsal: 1,  nombre: "Jugador 1",  posicion: "POR" },
        { dorsal: 2,  nombre: "Jugador 2",  posicion: "DEF" },
        { dorsal: 3,  nombre: "Jugador 3",  posicion: "DEF" },
        { dorsal: 4,  nombre: "Jugador 4",  posicion: "DEF" },
        { dorsal: 5,  nombre: "Jugador 5",  posicion: "DEF" },
        { dorsal: 6,  nombre: "Jugador 6",  posicion: "MED" },
        { dorsal: 8,  nombre: "Jugador 8",  posicion: "MED" },
        { dorsal: 10, nombre: "Jugador 10", posicion: "MED" },
        { dorsal: 7,  nombre: "Jugador 7",  posicion: "DEL" },
        { dorsal: 9,  nombre: "Jugador 9",  posicion: "DEL" },
        { dorsal: 11, nombre: "Jugador 11", posicion: "DEL" }
      ],
      suplentes: [
        { dorsal: 13, nombre: "Jugador 13", posicion: "POR" },
        { dorsal: 14, nombre: "Jugador 14" },
        { dorsal: 15, nombre: "Jugador 15" },
        { dorsal: 16, nombre: "Jugador 16" },
        { dorsal: 17, nombre: "Jugador 17" },
        { dorsal: 18, nombre: "Jugador 18" },
        { dorsal: 19, nombre: "Jugador 19" }
      ]
    },

    /* --------------------------- EQUIPO VISITANTE --------------------------- */
    visitante: {
      nombre: "EQUIPO VISITANTE",
      nombreCorto: "VISITANTE",
      abreviatura: "VIS",
      articulo: "el",
      escudo: "escudos/visitante.svg",
      colores: { principal: "#1f5fa8", secundario: "#ffffff" },
      entrenador: "",
      titulares: [
        { dorsal: 1,  nombre: "Jugador 1",  posicion: "POR" },
        { dorsal: 2,  nombre: "Jugador 2",  posicion: "DEF" },
        { dorsal: 3,  nombre: "Jugador 3",  posicion: "DEF" },
        { dorsal: 4,  nombre: "Jugador 4",  posicion: "DEF" },
        { dorsal: 5,  nombre: "Jugador 5",  posicion: "DEF" },
        { dorsal: 6,  nombre: "Jugador 6",  posicion: "MED" },
        { dorsal: 8,  nombre: "Jugador 8",  posicion: "MED" },
        { dorsal: 10, nombre: "Jugador 10", posicion: "MED" },
        { dorsal: 7,  nombre: "Jugador 7",  posicion: "DEL" },
        { dorsal: 9,  nombre: "Jugador 9",  posicion: "DEL" },
        { dorsal: 11, nombre: "Jugador 11", posicion: "DEL" }
      ],
      suplentes: [
        { dorsal: 13, nombre: "Jugador 13", posicion: "POR" },
        { dorsal: 14, nombre: "Jugador 14" },
        { dorsal: 15, nombre: "Jugador 15" },
        { dorsal: 16, nombre: "Jugador 16" },
        { dorsal: 17, nombre: "Jugador 17" }
      ]
    }
  },

  /* Textos de las pantallas (plantillas). Normalmente no hace falta tocarlos. */
  textos: {
    bienvenida:     ["BIENVENIDOS AL", "ESTADIO {estadio}"],
    tour:           "{local.corto} TOUR",
    tourSubtitulo:  "ESTADIO {estadio}",
    golLocal:       "{local.del}",            // la animación muestra GOL… y después «DEL DÉPOR»
    penaltiTitulo:  "PENALTI",
    penaltiLocal:   "A FAVOR {local.del}",
    alineacion:     "ONCE INICIAL",
    pie:            "ESTADIO {estadio}"
  },

  partido: {
    minutosPorParte: 45,                 // 45 → la 2ª parte empieza en 45:00
    minutosProrroga: 15,
    relojEnDescuento: "continuo",        // "continuo" → 46:12…  ·  "detenido" → 45:00 +01:12
    celebrarGolLocal: true               // al sumar un gol local se lanza la animación GOL
  },

  /* Duración (segundos) de cada pantalla antes de volver sola al marcador.
     0 = se queda fija hasta que la quites desde el panel.                    */
  duraciones: {
    gol: 11,
    amarilla: 7,
    roja: 8,
    penalti: 9,
    var: 30,
    varDecision: 8,
    alineacionPorEquipo: 16,
    bienvenida: 0,
    tour: 0
  },

  /* Rendimiento de las pantallas:
       "normal" → todo a máxima fluidez.
       "bajo"   → modo bajos recursos para navegadores poco potentes (TV,
                  equipos antiguos): mismas animaciones y diseño, menos carga.
       "minecraft" → máximo ahorro para pantallas dentro de Minecraft (MCEF):
                  todas las animaciones a 20 imágenes/s y cambios de escena por paneles.
       "auto"   → mide la fluidez y sube de nivel por sí solo si hace falta.
     También se cambia en directo desde el panel (Ajustes → Rendimiento) o por
     pantalla añadiendo ?rendimiento=minecraft (o =bajo) a su dirección.                    */
  rendimiento: "normal",

  /* Sincronización en tiempo real entre el panel y todas las pantallas.
       "auto"     → misma máquina (instantáneo) + brokers MQTT públicos gratuitos.
                    No necesita cuentas ni instalar nada. Recomendado.
       "local"    → solo pestañas del mismo navegador/equipo (sin Internet).
       "firebase" → Firebase Realtime Database (gratuito, privado). Rellena firebase.url.
     La «sala» identifica tu marcador: panel y pantallas deben usar la misma.
     Todo el tráfico va cifrado (AES-GCM) con una clave derivada de sala + clave.  */
  conexion: {
    modo: "auto",
    sala: "pedroescartin-8lsvs5dnjt",
    clave: "",
    cifrado: true,
    brokers: [
      "wss://broker.emqx.io:8084/mqtt",
      "wss://broker.hivemq.com:8884/mqtt"
    ],
    firebase: { url: "", auth: "" },
    recargaConfigSegundos: 15            // cada cuánto se comprueba si este archivo ha cambiado
  }
};
