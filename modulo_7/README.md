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

## Opcional - Render con Docker

La app tambien queda preparada para desplegarse en Render usando Docker:

- `modulo_7/Dockerfile` genera la app con Vite y la sirve con Nginx.
- `modulo_7/nginx.conf` expone el servicio en el puerto `10000`, que es el
  puerto por defecto esperado por Render para web services.
- `render.yaml` define un Blueprint de Render con runtime Docker y auto deploy
  desde `main`.
- `.github/workflows/modulo-7-render.yml` valida la imagen Docker en GitHub
  Actions y dispara un deploy hook de Render si existe el secret
  `RENDER_DEPLOY_HOOK_URL`.

### Despliegue manual en Render

1. En Render, crea un nuevo Web Service desde este repositorio.
2. Selecciona runtime Docker.
3. Usa `modulo_7/Dockerfile` como Dockerfile path.
4. Usa `modulo_7` como Docker context.
5. Deja el comando de arranque del Dockerfile.

### Despliegue automatico en Render

Opcion A: crea un Blueprint en Render usando `render.yaml`; Render desplegara
automaticamente cada commit en `main`.

Opcion B: crea un Web Service en Render y copia su Deploy Hook URL en el secret
de GitHub `RENDER_DEPLOY_HOOK_URL`; el workflow `modulo-7-render.yml` construira
la imagen Docker y disparara ese deploy hook.
