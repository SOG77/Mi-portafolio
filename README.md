# Portafolio · SOG77

Portafolio personal de **Sebastián**, desarrollador Full Stack.
Sitio estático (HTML + CSS + JavaScript, sin dependencias ni build) publicado automáticamente en GitHub Pages.

🔗 **En vivo:** https://sog77.github.io/Mi-portafolio/

---

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` | Todo el contenido del sitio (hero, stack, proyectos, sobre mí, contacto) |
| `styles.css` | Estilos completos, tema oscuro, responsive y accesible |
| `script.js` | Menú móvil, reveal al scroll, contadores, barras de nivel, typewriter |
| `favicon.svg` | Icono de la pestaña |
| `og.svg` | Imagen de vista previa al compartir el enlace |
| `404.html` | Página de error con el mismo diseño |
| `.nojekyll` | Evita que GitHub Pages procese el sitio con Jekyll |
| `robots.txt` / `sitemap.xml` | SEO básico |
| `.github/workflows/deploy.yml` | Despliegue automático a GitHub Pages |

---

## ⚠️ Datos pendientes de reemplazar

Estos valores están puestos como marcador y **hay que cambiarlos antes de compartir el enlace**:

1. **Nombre completo** — busca `Sebastián` en `index.html` (aparece en el título, el hero, el pie y los metadatos).
2. **WhatsApp** — busca `573000000000` (enlace `wa.me`) y `+57 300 000 0000` (texto visible).
3. **LinkedIn** — busca `linkedin.com/in/tu-usuario` (aparece 2 veces: contacto y footer).
4. **Proyectos** — sección `<!-- PROYECTOS -->`: cada `<article class="project">` (destacados) y `<article class="mini">` (secundarios).

Buscar y reemplazar en VS Code: `Ctrl + Shift + H`.

---

## Cómo agregar un proyecto nuevo

Copia un bloque `<article class="mini">` completo y cambia:

```html
<article class="mini reveal">
  <span class="mini-num">07</span>              <!-- número -->
  <h4>Nombre del proyecto</h4>                  <!-- título -->
  <p>Qué problema resuelve y cómo.</p>          <!-- descripción -->
  <ul class="chips sm"><li>React</li><li>Node</li></ul>   <!-- tecnologías -->
  <a class="lnk" href="URL_DEL_REPO" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a>
</article>
```

Para un proyecto **destacado** (con mockup grande), copia un `<article class="project">`.
Agrega la clase `reverse` para invertir la imagen al otro lado.

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
3. Listo. Cada push corre el workflow `.github/workflows/deploy.yml`.

Para publicar cambios:

```bash
git add .
git commit -m "Actualizo proyectos"
git push
```

El progreso se ve en la pestaña **Actions** del repositorio. En 1–2 minutos el sitio queda actualizado.

### Dominio propio (opcional)

Si compras un dominio, crea un archivo `CNAME` en la raíz con el dominio dentro
(ej. `sebastian.dev`) y configúralo en Settings → Pages → Custom domain.

---

## Añadir tu CV

Coloca `cv.pdf` en la raíz del repositorio y agrega el botón en el hero de `index.html`:

```html
<a class="btn btn-ghost" href="cv.pdf" download>Descargar CV</a>
```
