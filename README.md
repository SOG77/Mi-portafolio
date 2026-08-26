# Portafolio · Sebastian Ospina Guevara

Portafolio personal de **Sebastian Ospina**, desarrollador Full Stack en Atomo Gaming.
Sitio estático (HTML + CSS + JavaScript, sin dependencias ni build) con estética de
consola retro / HUD de videojuego, publicado automáticamente en GitHub Pages.

🔗 **En vivo:** https://sog77.github.io/Mi-portafolio/

---

## Estructura

```
Mi-portafolio/
├── index.html          Todo el contenido del sitio
├── 404.html            Pantalla GAME OVER
├── robots.txt          SEO
├── sitemap.xml         SEO
├── .nojekyll           Evita que Pages procese con Jekyll
├── README.md           Este archivo
├── .github/workflows/  Despliegue automático a GitHub Pages
└── assets/
    ├── css/styles.css  Estilos completos
    ├── js/script.js    Idioma, menú, reveal, contadores, typewriter, Konami
    ├── js/i18n.js      Diccionario ES/EN
    ├── img/proyectos/  Capturas reales de las plataformas (censuradas)
    ├── img/favicon.svg Icono de la pestaña
    ├── img/og.png      Vista previa al compartir (la que leen LinkedIn y WhatsApp)
    ├── img/og.svg      Fuente editable de og.png
    └── docs/           Hoja de vida en ES y EN
```

Los seis archivos de la raíz **tienen que quedarse ahí**: GitHub Pages busca
`index.html` y `404.html` en la raíz, los buscadores piden `/robots.txt`, y
GitHub renderiza el `README.md` en la portada del repositorio.

### Capturas de los proyectos

`assets/img/proyectos/` contiene capturas reales de Zenit Integrity y Zenit
Informes. **Los datos sensibles están difuminados**: nombres de partidos, casas
de apuestas, marcas y todas las cifras financieras. Al reemplazarlas, revisa que
no quede visible ningún dato de jugadores, cifras de operación ni marcas de
clientes.

---

### Regenerar `og.png`

`og.png` se genera desde `og.svg` (los formatos SVG no se ven en las vistas
previas de LinkedIn ni WhatsApp). Si editas el SVG, vuelve a exportarlo a
1200×630 px con cualquier herramienta y reemplaza el PNG.

---

## Diseño

Paleta neutra, sin colores saturados:

| Token | Color | Uso |
|---|---|---|
| `--bg` | `#0b0b0c` | Fondo |
| `--panel` | `#141416` | Tarjetas y paneles |
| `--line` | `#26262a` | Bordes |
| `--sand` | `#c9bfa7` | Acento principal (arena) |
| `--bone` | `#dedbd2` | Realces |
| `--text` | `#e9e7e2` | Texto |

Todo se cambia desde el bloque `:root` de `styles.css`.

Tipografías: **Chakra Petch** (títulos), **Inter** (texto),
**JetBrains Mono** (datos) y **Press Start 2P** (etiquetas pixel).

Detalles de videojuego: HUD fijo con barra de progreso, ficha de personaje con
barras de XP segmentadas, misiones con nivel de dificultad, inventario de
habilidades, scanlines de CRT y el código Konami como easter egg
(↑ ↑ ↓ ↓ ← → ← → B A).

---

## Idiomas (ES / EN)

El sitio es bilingüe con un solo archivo HTML:

- El **español vive en el HTML**, así que la página funciona aunque el JavaScript falle.
- El **inglés vive en `i18n.js`**, indexado por la misma clave `data-i18n`.
- El idioma se elige así, en orden: `?lang=en` en la URL → lo guardado en `localStorage` →
  el idioma del navegador.
- El botón de CV cambia solo al PDF del idioma activo.

**Al agregar texto nuevo**, ponle una clave y agrégala en los DOS diccionarios:

```html
<p data-i18n="mi.clave">Texto en español</p>
```

```js
es: { 'mi.clave': 'Texto en español' },
en: { 'mi.clave': 'Text in English' }
```

Para verificar que no falte ninguna traducción:

```bash
python -c "
import io,re
h=set(re.findall(r'data-i18n(?:-content)?=\"([^\"]+)\"',io.open('index.html',encoding='utf-8').read()))
js=io.open('i18n.js',encoding='utf-8').read()
k=lambda b:set(re.findall(r\"'([a-zA-Z0-9_.]+)':\s*['[]\",b))
es=k(js.split('  es: {')[1].split('  en: {')[0]); en=k(js.split('  en: {')[1])
print('faltantes:', sorted((h-es)|(h-en)) or 'ninguna')"
```

Enlace directo en inglés: `https://sog77.github.io/Mi-portafolio/?lang=en`

---

## Proyectos destacados

Los tres primeros son plataformas internas en producción (código privado, sin enlace):

| # | Proyecto | Stack |
|---|---|---|
| 01 | Zenit Integrity | Flask · WebSockets · SSE · React 19 · Recharts · Alembic · Kubernetes |
| 02 | Zenit | Flask · React 19 · TypeScript · PostgreSQL · JWT · ExcelJS |
| 03 | Zenit Informes | Flask · pandas · React 19 · PostgreSQL 16 · Docker · Nginx |
| 04–09 | Bot Aviator y proyectos públicos en GitHub | Python · Java · Spring Boot · React |

> **Nota sobre confidencialidad:** las descripciones son de alto nivel (qué resuelve
> y con qué está hecho). No incluyen endpoints, credenciales, nombres de sistemas
> internos ni fuentes de datos. Si algo debe salir del sitio, está todo en la
> sección `PROYECTOS` de `index.html`.

---

## Datos personales en el sitio

Ya están puestos los reales. Si alguno cambia, búscalo en `index.html`:

- **Nombre:** `Sebastian Ospina` / `Sebastian Ospina Guevara`
- **WhatsApp:** `573194384063` (enlace) y `+57 319 438 4063` (texto visible)
- **LinkedIn:** `sebasti%C3%A1n-ospina-guevara-773560245`
- **GitHub:** `github.com/SOG77`

---

## Cómo agregar un proyecto nuevo

**Misión secundaria** (tarjeta pequeña) — copia un bloque `<article class="side">`:

```html
<article class="side reveal">
  <span class="side-num">07</span>
  <h4>Nombre del proyecto</h4>
  <p>Qué problema resuelve y cómo.</p>
  <ul class="chips sm"><li>React</li><li>Node</li></ul>
  <a class="lnk" href="URL_DEL_REPO" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a>
</article>
```

**Misión principal** (tarjeta grande con mockup) — copia un `<article class="quest">`.
Agrega la clase `reverse` para que el mockup quede al otro lado.
La dificultad se marca con `<i class="on"></i>` (relleno) o `<i></i>` (vacío).

Para un proyecto privado, en vez del enlace usa:

```html
<span class="private"><span aria-hidden="true">🔒</span> Código privado · Atomo Gaming</span>
```

---

## Desarrollo local

No necesita instalación. Abre `index.html` en el navegador, o levanta un servidor:

```powershell
python -m http.server 8000
# http://localhost:8000
```

En VS Code también funciona la extensión **Live Server**.

---

## Publicar en GitHub Pages

El despliegue es automático: **cada `git push` a `main` publica el sitio.**

Configuración inicial (una sola vez):

1. Ve a `https://github.com/SOG77/Mi-portafolio/settings/pages`
2. En **Build and deployment → Source**, elige **GitHub Actions**.
3. Ve a la pestaña **Actions**, abre el último run y dale **Re-run all jobs**.

Para publicar cambios:

```bash
git add .
git commit -m "Actualizo proyectos"
git push
```

El progreso se ve en la pestaña **Actions**. En 1–2 minutos el sitio queda actualizado.

### Dominio propio (opcional)

Si compras un dominio, crea un archivo `CNAME` en la raíz con el dominio dentro
(ej. `sebastianospina.dev`) y configúralo en Settings → Pages → Custom domain.

---

## Actualizar el CV

Reemplaza `cv-sebastian-ospina-es.pdf` y `cv-sebastian-ospina-en.pdf` en la raíz.
Los botones del hero y de contacto ya apuntan ahí y cambian según el idioma activo.
