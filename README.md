# JH Studio Photography

Portafolio fotográfico estático para mostrar el trabajo visual de **JH Studio Photography** con una experiencia elegante, responsive y centrada en galería.

## Descripción

Este proyecto es una landing page de una sola página construida con **HTML, CSS y JavaScript vanilla**. Incluye:

- Hero principal con identidad visual de la marca.
- Sección "Sobre JH Studio".
- Galería dinámica de imágenes.
- Lightbox con navegación por teclado y gestos táctiles.
- Sección de contacto con enlaces directos a Instagram y WhatsApp.
- Mejoras de accesibilidad, SEO básico y optimización inicial de carga.

## Estructura del proyecto

```text
Portafolio_JHStudioPhotography/
|-- index.html
|-- README.md
|-- img/
|   |-- logotipo.png
|   |-- foto1.jpg
|   |-- foto2.jpg
|   |-- ...
|   -- foto61.jpg / foto33.png / foto46.png
```

## Requisitos

No necesita instalación de dependencias ni framework.

Solo necesitas:

- Un navegador web moderno.
- Un servidor estático opcional para pruebas locales.

## Cómo ejecutar el proyecto

### Opción 1: abrir directamente

Abre `index.html` en tu navegador.

### Opción 2: usar un servidor local

Si prefieres evitar restricciones del navegador con archivos locales, puedes servir el proyecto con cualquier servidor estático.

Ejemplo con VS Code Live Server o con una herramienta similar.

## Personalización

### Cambiar textos

Edita los contenidos directamente dentro de `index.html`:

- Título y metadatos SEO en la sección `<head>`.
- Hero principal.
- Texto de "Sobre JH Studio".
- Información de contacto.

### Cambiar imágenes del portafolio

Las imágenes se cargan desde la carpeta `img/` y se listan manualmente en el arreglo `galleryImages` dentro de `index.html`.

Si agregas o eliminas imágenes:

1. Coloca los archivos dentro de `img/`.
2. Actualiza el arreglo `galleryImages` en el script.
3. Mantén un orden consistente para la navegación del lightbox.

### Cambiar logo

Reemplaza el archivo:

```text
img/logotipo.png
```

Si el nuevo logo tiene otras dimensiones, puede que necesites ajustar la clase `.logo` en `index.html`.

## Características técnicas

- HTML semántico.
- CSS embebido con diseño responsive.
- JavaScript sin librerías externas.
- `lazy loading` para la galería.
- `decoding="async"` en imágenes.
- Lightbox accesible con cierre, navegación lateral y swipe.
- Soporte para `prefers-reduced-motion`.
- `skip link` para accesibilidad.
- Metadatos Open Graph básicos.

## Optimización actual

El proyecto ya incluye mejoras de estructura y carga, pero la carpeta de imágenes sigue siendo el mayor punto de optimización.

Recomendaciones futuras:

- Generar miniaturas para la grilla.
- Convertir imágenes a formatos modernos como WebP o AVIF.
- Reducir el peso de las fotos originales.
- Separar estilos y scripts en archivos propios si el proyecto crece.

## Publicación

Este proyecto puede publicarse fácilmente en:

- GitHub Pages
- Netlify
- Vercel
- Cualquier hosting estático

## Autor

**JhoysTV/JH Studio Photography**

Instagram: [@jhstudiophotography](https://www.instagram.com/jhstudiophotography/)
