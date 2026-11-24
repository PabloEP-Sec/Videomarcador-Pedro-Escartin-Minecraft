# Videomarcador · Estadio Pedro Escartín

Videomarcador profesional para el estadio, con pantalla, panel de control en tiempo real,
animaciones (gol, tarjetas, VAR, penalti, bienvenida, tour, alineaciones) y sincronización
entre dispositivos. No necesita instalar nada.

```
videomarcador/
├── index.html        ← la aplicación completa (pantalla + panel). No hace falta tocarlo.
├── config.js         ← EL ARCHIVO QUE SE EDITA: equipos, alineaciones, textos, tiempos, conexión
├── escudos/
│   ├── local.png     ← escudo del CD Guadalajara
│   └── visitante.svg ← escudo de ejemplo del visitante (sustitúyelo)
├── fuentes/          ← licencias de las tipografías (van incrustadas en index.html)
└── LEEME.md
```

---

## 1. Puesta en marcha en 1 minuto

| Qué | Dirección |
|---|---|
| **Pantalla** del videomarcador | `index.html` |
| **Panel de control** | `index.html?panel` |

- Abre la pantalla en el navegador del videomarcador (o en la pantalla de Minecraft).
- Abre el panel en otro navegador, móvil, tablet u ordenador.
- Todo lo que hagas en el panel aparece al instante en todas las pantallas abiertas.

También funciona haciendo doble clic en `index.html` desde la carpeta (sin servidor):
en ese caso panel y pantallas se sincronizan entre pestañas del mismo ordenador y, si hay
Internet, también con otros dispositivos.

---

## 2. Cambiar de partido (equipos, escudos, alineaciones)

1. Copia los escudos en `escudos/` (PNG con fondo transparente o SVG recomendados; también
   valen JPG o WebP de cualquier tamaño y proporción).
2. Edita `config.js`: `nombre`, `nombreCorto`, `abreviatura`, `articulo`, `escudo`, `colores`,
   `titulares`, `suplentes`.
3. Guarda (y súbelo al alojamiento si lo tienes publicado).

**No hay que hacer nada más.** Pantallas y panel comprueban `config.js` cada 15 s y se
actualizan solos: marcador, celebraciones, alineaciones, tarjetas, textos y botones del panel.
Si sustituyes un escudo manteniendo el mismo nombre de archivo, también se detecta.
Si `config.js` tiene un error de escritura, se mantiene la última configuración válida y el
panel muestra un aviso con el error.

Los textos usan plantillas que se rellenan solas, por eso nunca quedan nombres antiguos:

| Plantilla | Resultado con la configuración incluida |
|---|---|
| `{local.del}` | DEL DÉPOR |
| `{local.corto} TOUR` | DÉPOR TOUR |
| `A FAVOR {local.del}` | A FAVOR DEL DÉPOR |
| `ESTADIO {estadio}` | ESTADIO PEDRO ESCARTÍN |

`articulo` controla la gramática: `"el"` → «DEL DÉPOR», `"la"` → «DE LA …», `""` → «DE …».

**Escudos:** el sistema analiza cada imagen (contenido real, márgenes vacíos, densidad, fondo)
y los muestra siempre con el mismo tamaño visual, sin deformar ni recortar. Si un JPG trae
fondo blanco, se elimina solo (al servirlo por http/https). Si falta el archivo, se dibuja un
escudo provisional con las iniciales y el panel avisa.

**Nombres largos:** se elige automáticamente la versión que mejor cabe (nombre completo →
nombre corto → abreviatura), con el mismo tamaño para ambos equipos.

También puedes editar nombres y alineaciones en directo desde el panel («Equipos y
alineaciones» → «Aplicar en directo»). Esos cambios se descartan solos cuando cambia
`config.js`, para que nunca se mezclen datos de partidos distintos.

---

## 3. Publicarlo gratis en Internet

### GitHub Pages
1. Crea un repositorio (p. ej. `videomarcador`) y sube **todo el contenido de la carpeta**.
2. *Settings → Pages → Build and deployment → Deploy from a branch →* rama `main`, carpeta `/ (root)`.
3. En 1–2 minutos estará en `https://TU-USUARIO.github.io/videomarcador/`.
   - Pantalla: `https://TU-USUARIO.github.io/videomarcador/`
   - Panel: `https://TU-USUARIO.github.io/videomarcador/?panel`

### Cloudflare Pages
1. *Workers & Pages → Create → Pages → Upload assets* (o conecta el repositorio de GitHub).
2. Arrastra la carpeta completa y publica. Obtendrás `https://videomarcador.pages.dev`.

Para cambiar de partido: edita `config.js` y vuelve a subirlo. Las pantallas abiertas se
actualizan solas.

---

## 4. Sincronización en tiempo real

Panel y pantallas comparten el estado completo del partido (marcador, cronómetro, periodo,
descuento, pantalla activa y ajustes). Es bidireccional: puede haber varios paneles a la vez
(PC + móvil) y todos ven lo mismo; el panel ve qué pantallas están conectadas y su resolución.

| Modo (`conexion.modo`) | Cómo funciona | Requisitos |
|---|---|---|
| `"auto"` *(por defecto)* | Mismo ordenador al instante + dos servidores MQTT públicos y gratuitos (EMQX y HiveMQ) **a la vez**, por redundancia. | Ninguno |
| `"local"` | Solo pestañas del mismo navegador/ordenador. Sin Internet. | Ninguno |
| `"firebase"` | Firebase Realtime Database (plan gratuito Spark). Privado y muy estable. | Crear un proyecto |

Fiabilidad incluida:
- **Estado retenido:** una pantalla que se abre o se reconecta recibe al momento el último estado.
- **Reconexión automática** con reintentos progresivos, al recuperar la red o al volver a la pestaña.
- Si se cae un servidor, sigue por el otro. Si se caen todos, al volver se envía el estado más reciente.
- Cada pantalla guarda el último estado: si se recarga sin conexión, arranca con el marcador correcto.
- **Cifrado AES-256-GCM** de todos los mensajes con una clave derivada de `sala` + `clave`:
  en los servidores públicos nadie puede leer ni falsificar las órdenes.

**La sala:** panel y pantallas deben usar la misma `sala`. Se puede fijar en `config.js` o en la
dirección: `index.html?sala=MI-SALA` y `index.html?panel&sala=MI-SALA`. Para más privacidad añade
una clave solo en las direcciones (no en `config.js`, que es público si publicas la web):
`?sala=MI-SALA&clave=MI-CLAVE`. El panel muestra (y copia) las direcciones exactas en
«Conexión y pantallas».

### Firebase (opcional)
1. Entra en `console.firebase.google.com` → crea un proyecto → *Build → Realtime Database → Create database*.
2. En *Rules* pega:
   ```json
   { "rules": { "vmpe1": { "$sala": { ".read": true, ".write": true } } } }
   ```
   (el contenido viaja cifrado; nadie sin la sala y la clave puede leerlo).
3. Copia la URL de la base (p. ej. `https://mi-proyecto-default-rtdb.europe-west1.firebasedatabase.app`)
   en `config.js` → `conexion.firebase.url` y pon `conexion.modo: "firebase"`.

---

## 5. Cronómetro

- Nunca "cuenta" localmente: se calcula siempre a partir del instante de inicio, así es preciso,
  continuo, igual en todas las pantallas y no se ve afectado por animaciones ni cambios de pantalla.
- **Solo se detiene cuando se pulsa Pausar** (o «Descanso» / «Final», que son órdenes explícitas).
- Compensa automáticamente diferencias de hora entre dispositivos.
- «Iniciar 2ª parte · 45:00» arranca directamente desde el minuto 45.
- «Fijar tiempo» (mm:ss), ajustes de ±1 s / ±1 min, reinicio, prórrogas.
- Descuento: elige minutos y pulsa «Mostrar» / «Ocultar» (en cada parte).
- `partido.relojEnDescuento`: `"continuo"` (46:12…) o `"detenido"` (45:00 +01:12).

---

## 6. Pantallas y animaciones

| Pantalla | Se quita sola | Duración por defecto |
|---|---|---|
| GOL (local) — «GOL» repetido y «DEL DÉPOR» | Sí | 11 s |
| Tarjeta amarilla / roja / doble amarilla | Sí | 7 s / 8 s |
| Revisión VAR → decisión final | Sí | 30 s / 8 s |
| Penalti a favor del local | Sí | 9 s |
| Alineaciones (visitante y después local) | Sí | 16 s por equipo |
| Bienvenida «BIENVENIDOS AL ESTADIO PEDRO ESCARTÍN» | No (fija) | 0 = manual |
| DÉPOR TOUR | No (fija) | 0 = manual |

- Las duraciones se cambian en `config.js` o directamente en el panel junto a cada botón.
- Con una pantalla activa: «+10 s», «Fijar» (no se quita sola) o «Volver al marcador».
- Al sumar un gol local se lanza la animación automáticamente (desactivable en el panel).
  El gol del visitante solo anima el número, sin celebración.
- Ninguna pantalla detiene ni altera el cronómetro. Al terminar, el marcador vuelve con los
  datos actualizados.
- Solo hay una pantalla a la vez; los cambios entre ellas usan una cortinilla que evita mezclas.
- Las animaciones arrancan sincronizadas en todas las pantallas; una pantalla que se conecta
  tarde se incorpora en el punto exacto de la animación.

**Atajos del panel (teclado):** `Espacio` iniciar/pausar · `L` gol local · `V` gol visitante ·
`Esc` volver al marcador · `Ctrl+Z` deshacer. En el móvil hay una barra fija con lo esencial.

---

## 7. Resoluciones y pantallas de Minecraft

Se adapta solo a cualquier tamaño, sin deformar ni recortar. Comprobado en:
4,71:1 · 4,714:1 · 4,67:1 · 4,75:1 · 4,70:1 · 5:1 · 3,6:1 · 16:9 · 21:9 · 4:3 · vertical, y en
pantallas Minecraft de **35×7, 25×5, 30×6 y 45×9 bloques** (todas 5:1), incluso a resoluciones
muy bajas (560×112 px).

En Minecraft (mods de navegador como WebDisplays / MCEF) basta con poner en la pantalla la URL
publicada, por ejemplo `https://TU-USUARIO.github.io/videomarcador/?sala=MI-SALA`. El código es
compatible con navegadores integrados antiguos (JavaScript ES2017, sin dependencias externas).

En el panel, «En pantalla» permite previsualizar cómo se ve en cada formato (incluidos los
tamaños de bloques de Minecraft).

---

## 8. Parámetros de dirección

| Parámetro | Ejemplo | Uso |
|---|---|---|
| `panel` | `?panel` | Abre el panel de control |
| `sala` | `?sala=final-copa` | Sala de sincronización |
| `clave` | `&clave=xyz` | Clave adicional de cifrado |
| `modo` | `&modo=local` | `auto`, `local` o `firebase` |
| `broker` | `&broker=wss://mi-broker:8084/mqtt` | Servidor MQTT propio (separa varios con comas) |
| `firebase` | `&firebase=https://…firebasedatabase.app` | URL de Firebase |
| `debug` | `&debug=1` | Muestra datos técnicos en la pantalla |

---

## 9. Ampliar el proyecto

`index.html` está organizado por módulos comentados (`VM.config`, `VM.time`, `VM.sync`,
`VM.transports`, `VM.crest`, `VM.board`, `VM.overlays`, `VM.panel`…).
Para añadir una pantalla nueva basta con registrarla:

```js
VM.overlays.register('cambio', {
  label: 'Cambio',
  dur: function (cfg) { return 8; },
  build: function (ctx) {            // ctx.teams.local / ctx.teams.visitante, ctx.data, ctx.cfg
    return VM.util.el('div', {}, [ /* contenido */ ]);
  }
});
```

y lanzarla desde el panel con `VM.panel.actions.show('cambio', { … })`. Todo lo demás
(sincronización, duración, cortinilla, incorporación tardía, ajuste a la resolución) ya funciona.
Para otro sistema de tiempo real (Supabase, servidor propio…) se añade un transporte con la
misma interfaz que los de `VM.transports`.

---

## 10. Solución de problemas

- **Una pantalla no se actualiza:** comprueba que usa la misma `sala` (y `clave`) que el panel.
  En el panel, «Conexión y pantallas» lista las pantallas conectadas.
- **El panel dice «Sin conexión»:** la red bloquea los servidores públicos; las pantallas del
  mismo ordenador siguen funcionando. Usa Firebase o otra red.
- **Cambié config.js y no veo cambios:** espera 15 s o pulsa «Recargar config.js y escudos» y
  después «Recargar pantallas».
- **Escudo con recuadro blanco:** usa PNG transparente o publica la web (en `file://` el
  navegador no permite analizar la imagen para quitar el fondo).

Tipografías: Big Shoulders Display y Barlow Condensed (licencia SIL Open Font License, en `fuentes/`).
