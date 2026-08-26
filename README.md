# Portafolio · Sebastian Ospina Guevara

Portafolio personal de **Sebastian Ospina**, desarrollador Full Stack en Atomo Gaming.
Sitio estático (HTML + CSS + JavaScript, sin dependencias ni build) con estética de
consola retro / HUD de videojuego, publicado automáticamente en GitHub Pages.

🔗 **En vivo:** https://sog77.github.io/Mi-portafolio/

---

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` | Todo el contenido (hero, inventario, misiones, perfil, contacto) |
| `styles.css` | Estilos completos: paleta neutra, responsive y accesible |
| `script.js` | Menú móvil, reveal al scroll, contadores, barras de XP, typewriter, Konami |
| `favicon.svg` | Icono de la pestaña (pixel art) |
| `og.svg` | Imagen de vista previa al compartir el enlace |
| `404.html` | Pantalla "GAME OVER" con el mismo diseño |
| `.nojekyll` | Evita que GitHub Pages procese el sitio con Jekyll |
| `robots.txt` / `sitemap.xml` | SEO básico |
| `.github/workflows/deploy.yml` | Despliegue automático a GitHub Pages |

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

## Proyectos destacados

Los tres primeros son plataformas internas en producción (código privado, sin enlace):

| # | Proyecto | Stack |
|---|---|---|
| 01 | Plataforma Unificada de Gestión | Flask · React 19 · TypeScript · PostgreSQL · JWT |
| 02 | Zenit Integrity | Flask · WebSockets · SSE · React · Recharts · Docker |
| 03 | Zenit Informes | Flask · pandas · React · PostgreSQL 16 · Docker · Nginx |
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

## Añadir tu CV

Coloca `cv.pdf` en la raíz del repositorio y agrega el botón en el hero de `index.html`:

```html
<a class="btn btn-ghost" href="cv.pdf" download>Descargar CV</a>
```
