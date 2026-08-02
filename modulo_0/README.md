# Módulo 0 · Laboratorio de UX — HBO Max móvil

Entrega del laboratorio del Módulo 0 del Máster en Desarrollo Frontend.

**Producto analizado:** HBO Max, aplicación móvil.
**Flujo:** descubrir contenido → decidir → reproducir.
**Pantalla rediseñada:** ficha de detalle de una serie.

## Entrega

- **Figma (entregable principal):**
  [Módulo 0 — HBO Max móvil](https://www.figma.com/design/wuFygMOQ8O29sAz5sT9qt3/Modulo-0---HBO-Max-movil)
- **Dossier completo:** [`index.html`](./index.html) — las tres partes en un
  único documento. Clonar el repositorio y abrirlo en el navegador.
- **Versión imprimible:** [`entrega.pdf`](./entrega.pdf)
- **Vista rápida:** [`entrega-preview.png`](./entrega-preview.png)

## Contenido

### Parte 1 · Evaluación heurística

Las 10 heurísticas de Nielsen aplicadas al flujo, cada una con evidencia
localizada en la aplicación, una puntuación de severidad (escala 0–4 de
Nielsen) y una propuesta de mejora. Cierra con una síntesis que prioriza los
tres problemas de mayor impacto y justifica cuál de ellos se ataca en la
Parte 3.

### Parte 2 · Gestalt y prototipo de baja fidelidad

Ocho principios de Gestalt —proximidad, similitud, región común, cierre,
continuidad, figura y fondo, destino común y conexión uniforme— demostrados en
abstracto y localizados en la interfaz real. Después, el flujo principal en
cinco pantallas de baja fidelidad con las transiciones anotadas y una tabla que
relaciona cada decisión de diseño con la heurística que resuelve.

### Parte 3 · Rediseño de alta fidelidad

Comparativa antes/después de la ficha de detalle, foundations completas (tokens
de color con ratios de contraste calculados, escala tipográfica, espaciado y
radios), librería de cuatro componentes con todas sus variantes, especificaciones
de handoff con marcadores sobre la pantalla y comprobaciones de accesibilidad.

## Estructura del repositorio

```
modulo_0/
├── index.html            Dossier completo de la entrega
├── assets/styles.css     Estilos del dossier
├── GUIA-FIGMA.md         Guía paso a paso para montar el archivo de Figma
├── entrega.pdf           Exportación imprimible
├── entrega-preview.png   Captura completa del dossier
└── task.md               Enunciado del laboratorio
```

## Construcción del archivo de Figma

[`GUIA-FIGMA.md`](./GUIA-FIGMA.md) contiene el orden de ejecución (variables →
estilos de texto → componentes → pantallas), la especificación exacta de cada
componente con sus variantes y propiedades, el desglose de la pantalla de alta
fidelidad bloque a bloque, la checklist previa a la entrega y todos los textos
listos para copiar y pegar.

## Regenerar las exportaciones

```bash
./export.sh
```

Requiere Google Chrome instalado. Regenera `entrega.pdf` y
`entrega-preview.png` a partir de `index.html`.
