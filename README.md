# Portafolio · Sebastian Ospina Guevara

Mi portafolio personal. Sitio estático en HTML, CSS y JavaScript, sin
dependencias ni build, con estética de consola retro.

**En vivo:** https://sog77.github.io/Mi-portafolio/

## Dónde está cada cosa

```
index.html          todo el contenido del sitio
assets/css/         estilos
assets/js/          script.js (interacciones) · i18n.js (traducciones al inglés)
assets/img/         capturas de proyectos, favicon e imagen de vista previa
assets/docs/        hoja de vida en español e inglés
```

## Verlo en local

```bash
python -m http.server 8000
```

Y abrir http://localhost:8000

## Publicarlo

Cada `git push` a `main` publica el sitio. No hay que hacer nada más.

## Notas para el yo del futuro

**Texto nuevo:** el español va en el HTML y el inglés en `i18n.js`, con la misma
clave `data-i18n`. Si agrego texto y no le pongo su traducción, en inglés se
queda en español.

**Capturas:** las de `assets/img/proyectos/` son reales, con los datos sensibles
difuminados. Si reemplazo alguna, revisar que no quede visible nada de jugadores
ni cifras de operación.

**Hoja de vida:** los PDF de `assets/docs/` son copias. El original está en
`Documentos SOG/Hoja de vida/` — si lo actualizo, hay que copiarlo aquí también.
