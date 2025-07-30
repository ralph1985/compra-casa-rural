# Compra Casa Rural

**Compra Casa Rural** es una aplicación web sencilla que gestiona la lista de la compra de nuestra casa rural. Los productos se cargan desde una hoja de cálculo de Google y pueden filtrarse por grupo o categoría. Cada elemento puede marcarse como comprado y el estado se guarda en tu navegador para funcionar incluso sin conexión.

## Cómo usar la aplicación

1. Visita la versión publicada en [https://ralph1985.github.io/compra-casa-rural/](https://ralph1985.github.io/compra-casa-rural/). Si clonas el proyecto y quieres usarlo de forma local, tendrás que servir los archivos con un servidor web (por ejemplo `npx serve`) para evitar errores de CORS.
2. Usa los filtros (grupo, categoría y búsqueda) para acotar la lista de productos.
3. Marca los artículos comprados para moverlos al final. Esta información se almacena localmente.
4. Desliza hacia abajo para recargar la lista cuando quieras.

## Personalización y desarrollo

1. Clona este repositorio o descarga sus archivos.
2. Modifica la constante `CSV_URL` en `index.html` para enlazar tu propia hoja de cálculo.
3. Publica los archivos en cualquier hosting estático (por ejemplo, GitHub Pages) si deseas compartir tu copia online.

## Dónde está publicado

La versión de producción se encuentra en [https://ralph1985.github.io/compra-casa-rural/](https://ralph1985.github.io/compra-casa-rural/).

## Licencia

Este proyecto está bajo la [MIT License](LICENSE).
