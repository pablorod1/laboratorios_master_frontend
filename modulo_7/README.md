# Modulo 7 - Cloud

Aplicacion del modulo 6 adaptada para GitHub Pages.

## Desarrollo local

```bash
npm install
npm run start
```

La app usa la API publica de Rick & Morty para lecturas y guarda `bestSentence`
en `localStorage`, porque GitHub Pages no puede ejecutar el mock server local.

## Despliegue manual

```bash
npm install
npm run deploy:github-pages
```

Este script genera `dist` con `BASE_PATH=/laboratorios_master_frontend/` y lo
publica en la rama `gh-pages`.

## Despliegue automatico

El workflow `.github/workflows/modulo-7-github-pages.yml` se ejecuta al hacer
push o merge a `main` con cambios en `modulo_7`.

En GitHub, configura Pages con source `Deploy from a branch`, rama `gh-pages`,
carpeta `/ (root)`.
