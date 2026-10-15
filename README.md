# Transformando el eje Z

Sitio web estático del proyecto de Técnica en Sistemas: enseña la combinación
de impresión 3D y electrónica con Arduino (kits, reloj, recursos y evidencias).

## Páginas

- `index.html` — Inicio
- `arduino.html` — Kits Arduino
- `impresion3d.html` — Impresión 3D
- `reloj.html` — El reloj (impresión 3D + electrónica)
- `recursos.html` — Recursos
- `evidencias.html` — Evidencias
- `equipo.html` — Equipo

## Vista previa local

```bash
cd ejez
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Notas técnicas

- Los archivos `assets/main-*.css` y `assets/main-*.js` son paquetes compilados
  (Vite + Tailwind). Las fuentes legibles están en `style_legible.css` y
  `main_revisado.js`.
- Modo oscuro: clase `dark` en `<html>`, persistida en `localStorage`.
