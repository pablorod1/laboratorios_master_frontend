# Guía de construcción del archivo de Figma

Todo lo necesario para montar el entregable en Figma, en orden de ejecución.
Los textos de las Partes 1 y 2 están al final, listos para copiar y pegar.

> **Orden recomendado.** Variables → estilos de texto → componentes → pantallas
> → frames de texto de las Partes 1 y 2. Si se hace al revés hay que volver a
> aplicar tokens a mano en cada capa.

---

## Estado actual del archivo

Buena parte ya está construida directamente en Figma. Esto es lo que hay y lo
que falta:

| Bloque | Estado |
| ------ | ------ |
| Página `01 - Evaluacion heuristica` | ✅ Contenido de la Parte 1 |
| Variables `color` (12), `spacing` (7), `radius` (4) | ✅ Creadas, con *scopes* y *code syntax* |
| Estilos de texto (5) | ✅ Creados y alineados al dossier |
| Componente `Button` | ✅ 9 variantes · props `Label`, `Icon` |
| Componente `Metadata Pill` | ✅ 3 tonos · prop `Label` |
| Componente `Icon` | ✅ 5 glifos, para INSTANCE_SWAP |
| Componente `Icon Action` | ✅ 2 estados · área táctil 44 px · prop de icono INSTANCE_SWAP |
| Componente `Content Card` | ✅ 6 variantes (Type × Progress) · props `Title`, `Meta` |
| Sección `Foundations` (página 03) | ✅ 12 muestras de color con ratios, escala tipográfica, espaciado y radios |
| **Pantallas high-fi** (página 03) | ❌ **Pendiente** — apartado 4 de esta guía |
| **Página `02 - Gestalt + Low-fi`** | ❌ **Pendiente** — solo tiene la cabecera |
| Permisos de compartición | ❌ **Pendiente** |

> **Nota sobre el plan de Figma.** La construcción automatizada se detuvo al
> alcanzar el límite de llamadas del plan Starter. Lo que falta se puede montar
> a mano siguiendo esta guía, o automatizar de nuevo cuando el límite se
> reponga.

---

## 0. Estructura del archivo

Tres páginas, una por parte. El enunciado exige que las tres se distingan con
claridad.

| Página                          | Contenido                                            |
| ------------------------------- | ---------------------------------------------------- |
| `01 · Evaluación heurística`    | Portada, alcance, método y las 10 heurísticas         |
| `02 · Gestalt + Low-fi`         | 8 principios y el flujo de 5 pantallas con conectores |
| `03 · High-fi + Design system`  | Foundations, componentes, antes/después y handoff     |

Dentro de cada página, un frame grande de fondo (por ejemplo `2400 × 3000`)
con relleno `#08080C` que haga de lienzo, y dentro los frames de contenido.

---

## 1. Variables

Panel de **Local variables** (icono junto a los estilos en el panel Design).
Crear tres colecciones.

### Colección `color`

| Nombre             | Valor     |
| ------------------ | --------- |
| `bg/app`           | `#08080C` |
| `bg/elevated`      | `#101017` |
| `bg/overlay`       | `#1D1D28` |
| `border/subtle`    | `#24242F` |
| `border/strong`    | `#34344A` |
| `text/primary`     | `#FFFFFF` |
| `text/secondary`   | `#B8B8C7` |
| `text/muted`       | `#7B7B8C` |
| `accent/primary`   | `#8B5CF6` |
| `accent/strong`    | `#7C3AED` |
| `success/default`  | `#22C55E` |

> **La decisión que hay que saber defender.** Hay dos acentos a propósito.
> Con `accent/primary` de fondo, el texto blanco encima solo llega a 4,2:1 y
> WCAG AA exige 4,5:1. Por eso `accent/primary` queda para elementos **no
> textuales** (barras de progreso, subrayado de la pestaña activa) y
> `accent/strong` para cualquier **superficie rellena con texto blanco**, donde
> alcanza 5,7:1.

### Colección `spacing` (tipo Number)

`2xs` = 4 · `xs` = 8 · `s` = 12 · `m` = 16 · `l` = 24 · `xl` = 32 · `2xl` = 48

Se enlazan al *padding* y al *gap* de cada auto layout.

### Colección `radius` (tipo Number)

`s` = 6 · `m` = 10 · `l` = 16 · `full` = 999

---

## 2. Estilos de texto

Tipografía **Inter** (o la de sistema). Cinco estilos, sin tamaños intermedios.

| Estilo             | Tamaño / interlineado | Grosor    | Espaciado |
| ------------------ | --------------------- | --------- | --------- |
| `HBOMax/Display`   | 38 / 35               | Bold      | −3 %      |
| `HBOMax/Title`     | 24 / 31               | Bold      | −2 %      |
| `HBOMax/Subtitle`  | 16 / 21               | SemiBold  | 0         |
| `HBOMax/Body`      | 14 / 22               | Regular   | 0         |
| `HBOMax/Caption`   | 12 / 16               | Medium    | 0         |

---

## 3. Componentes

Cuatro sets. Crear cada variante como frame independiente, seleccionarlas todas
y usar **Combine as variants**.

### 3.1 `Button`

Auto layout horizontal · padding `0 24` · gap `xs` (8) · altura mínima 48 ·
alineación centrada · radio `full`. El texto usa `HBOMax/Subtitle`.

**Propiedades de variante**

- `Variant`: `Primary` | `Secondary` | `Ghost`
- `State`: `Default` | `Pressed` | `Disabled`

**Propiedades de componente**

- `Label` → *Text property*
- `Icon` → *Boolean property* sobre la capa del icono

**Estilos por variante**

| Variante             | Relleno                  | Texto            | Borde              |
| -------------------- | ------------------------ | ---------------- | ------------------ |
| Primary / Default    | `#FFFFFF`                | `#0A0A10`        | —                  |
| Primary / Pressed    | `#CFCFD8`                | `#0A0A10`        | —                  |
| Secondary / Default  | blanco al 10 %           | `text/primary`   | blanco al 18 %     |
| Secondary / Disabled | `bg/elevated`            | `text/muted`     | `border/subtle`    |
| Ghost / Default      | ninguno                  | `text/primary`   | blanco al 24 %     |

### 3.2 `Metadata Pill`

Auto layout horizontal · padding `4 9` · gap `2xs` (4) · radio `s` ·
texto `HBOMax/Caption`.

- `Tone`: `Neutral` | `Highlight` | `Rating`
- `Label` → *Text property*

| Tono      | Relleno         | Texto            | Borde                    |
| --------- | --------------- | ---------------- | ------------------------ |
| Neutral   | `bg/elevated`   | `text/secondary` | `border/strong`          |
| Highlight | `accent` al 14 %| `#C4B5FD`        | `accent/primary` al 40 % |
| Rating    | `bg/elevated`   | `text/primary`   | `border/strong`          |

### 3.3 `Icon Action`

Auto layout **vertical** · gap `xs` (8) · alineación centrada · ancho fijo 72.
Dentro, un círculo de **44 × 44** (el mínimo táctil de las Human Interface
Guidelines) y debajo la etiqueta en `HBOMax/Caption`.

- `State`: `Default` | `Active`
- `Icon` → *Instance swap property*
- `Label` → *Text property*

| Estado  | Círculo                                     | Icono / etiqueta |
| ------- | ------------------------------------------- | ---------------- |
| Default | `bg/overlay` + borde `border/strong`        | `text/secondary` |
| Active  | `accent` al 14 % + borde `accent` al 55 %   | `#C4B5FD`        |

### 3.4 `Content Card`

- `Type`: `Episode` | `Poster`
- `Progress`: `None` | `Partial` | `Complete`
- `Title` y `Meta` → *Text properties*

**Type = Episode.** Auto layout horizontal · gap `s` (12) · alineación
centrada. Miniatura de **116 × 66**, radio `s`, con una barra de progreso de
3 px anclada al borde inferior (relleno `accent/primary`, fondo blanco al 28 %).
Título en `HBOMax/Subtitle` y meta en `HBOMax/Caption` sobre `text/muted`.

**Type = Poster.** Auto layout vertical · gap `xs` (8). Arte de **116 × 168**,
radio `s`. Título en `HBOMax/Caption` y meta en `text/muted`.

---

## 4. Pantalla de alta fidelidad

Frame `390 × 844` (iPhone 14), relleno `bg/app`. De arriba abajo:

| #   | Bloque              | Especificación                                                                                                                 |
| --- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| —   | Status bar          | Alto 44, padding lateral 24                                                                                                     |
| 1   | Hero                | Alto fijo **340**. Imagen a sangre con degradado a `bg/app` del 0 % al 100 % en el último 26 % de la altura. Padding lateral `m` |
| 2   | Fila de metadatos   | Auto layout horizontal con ajuste de línea, gap `xs` (8). Solo la valoración usa `Tone=Highlight`                                |
| 3   | CTA principal       | `Button` con `Variant=Primary`, resize **Fill container**, alto mínimo 48. Etiqueta dinámica: `Reproducir` o `Reanudar T1:E3`    |
| 4   | Acciones secundarias| Auto layout horizontal, distribución **Space between**. Cuatro instancias de `Icon Action`                                       |
| 5   | Sinopsis            | `HBOMax/Body` sobre `text/secondary`. Máximo 4 líneas sin truncar en 358 px de ancho. Separación superior `l` (24)               |
| 6   | Pestañas            | Gap `l` (24). La activa lleva subrayado de 3 px en `accent/primary`; el resto en `text/muted`                                    |
| 7   | Lista de episodios  | Instancias de `Content Card` con `Type=Episode`, separadas `m` (16)                                                             |

El bloque inferior del hero es un auto layout vertical con gap `s` (12) que
contiene: etiqueta `HBO Original`, título en `HBOMax/Display` y la franja de
progreso (`T1:E3` — barra — `Quedan 22 min`).

**Además del frame final, incluir en la misma página:**

- El frame «antes» reconstruyendo la ficha actual, para que la comparación sea
  evidente.
- Un frame de *foundations* con las muestras de color, la escala tipográfica,
  el espaciado y los radios.
- Un frame por cada set de componentes mostrando todas sus variantes.
- El frame anotado con los marcadores 1–7 y sus especificaciones.

---

## 5. Antes de entregar

- [ ] Los componentes son **componentes de Figma**, no frames sueltos
- [ ] Todos los contenedores usan auto layout
- [ ] Las variables están **enlazadas**, no pegadas como valores fijos
- [ ] Las variantes están nombradas con el patrón `Propiedad=Valor`
- [ ] Ningún texto se trunca a 390 px de ancho
- [ ] Capas y frames con nombres semánticos (nada de `Frame 217`)
- [ ] Las tres páginas están claramente identificadas
- [ ] **Share → Anyone with the link → can view** (el enunciado insiste en los
      permisos; sin esto la entrega no se puede evaluar)

---

# Textos para pegar

## Parte 1 · Evaluación heurística

**Producto:** HBO Max · app móvil
**Flujo analizado:** descubrir → decidir → reproducir

**Alcance.** Se evalúa la pantalla de inicio, la búsqueda, la ficha de detalle
de un título y el reproductor. Quedan fuera el alta de cuenta, la gestión de
suscripción y la experiencia en televisor.

**Contexto de uso.** Usuario suscriptor, sesiones cortas de noche, con una
mano, en un sofá o en transporte público, a menudo con red inestable y
frecuentemente retomando algo que ya había empezado.

**Método.** Recorrido del flujo anotando fricciones, revisión heurística
principio por principio y puntuación de cada hallazgo con la escala de
severidad de Nielsen (0 = no es un problema, 4 = catastrófico), que combina
frecuencia, impacto y persistencia. La severidad es lo que permite priorizar:
no todos los incumplimientos merecen rediseño.

---

**1. Visibilidad del estado del sistema — Severidad 2**

*Evidencia:* la fila «Continuar viendo» dibuja una barra de progreso sobre cada
miniatura, así que el usuario sabe por dónde iba sin abrir la ficha. En el
reproductor, la carga se comunica con un indicador sobre el fotograma y el
desplazamiento por la línea de tiempo muestra en todo momento el tiempo
restante.

*Mejora:* el estado que no se comunica es el de sincronización entre
dispositivos. Si dejas un episodio a medias en el televisor, el móvil tarda en
reflejarlo y no explica por qué. Marcar la fila como «sincronizando» evitaría
la sensación de progreso perdido.

**2. Correspondencia entre el sistema y el mundo real — Severidad 1**

*Evidencia:* el vocabulario es el del mundo audiovisual y no el del sistema:
temporada, episodio, tráiler, T1:E1. Los pósteres reproducen el arte oficial
que el usuario ya ha visto en marquesinas o redes sociales, de modo que
reconoce el título antes incluso de leer su nombre.

*Mejora:* la ambigüedad aparece en los formatos híbridos. Un especial, un
documental o un evento en directo se presentan con la misma tarjeta que una
película, y el usuario no sabe si va a ver veinte minutos o dos horas hasta que
entra. Una etiqueta de formato en la propia tarjeta lo resolvería.

**3. Control y libertad del usuario — Severidad 2**

*Evidencia:* todas las pantallas mantienen una salida visible —flecha atrás en
la ficha, aspa en el reproductor— y el reproductor permite retroceder diez
segundos, saltar la cabecera y cambiar de episodio sin volver a la ficha, así
que el usuario nunca queda atrapado.

*Mejora:* falta el deshacer donde más duele. Eliminar un título de «Continuar
viendo» es inmediato y silencioso, y «Saltar intro» no ofrece camino de vuelta
si se pulsa por error. Un aviso temporal con acción «Deshacer» cubriría ambos
casos.

**4. Consistencia y estándares — Severidad 1**

*Evidencia:* respeta los patrones que el usuario ya conoce de otras
plataformas: barra de pestañas inferior persistente, carruseles horizontales
con título de fila, gesto de deslizar para navegar y controles de reproducción
en las posiciones esperadas.

*Mejora:* la inconsistencia está en las acciones secundarias. «Mi lista» se
representa unas veces con un signo «+» y otras con un icono de marcador, y
descargar aparece en la ficha, en el episodio y en el menú contextual con
jerarquías distintas. Un icono y una posición únicos por acción.

**5. Prevención de errores — Severidad 2**

*Evidencia:* los perfiles infantiles y el PIN de control parental impiden por
diseño el acceso a contenido no apto, en lugar de limitarse a advertir después.
La clasificación por edad se muestra antes de iniciar la reproducción.

*Mejora:* no previene los errores caros en movilidad, como reproducir en
calidad alta con datos móviles o descargar una temporada entera sin avisar del
espacio que ocupará. Un aviso previo, con la opción de continuar, evitaría
consumo de datos o de almacenamiento no deseado.

**6. Reconocimiento antes que recuerdo — Severidad 2**

*Evidencia:* toda la navegación se apoya en reconocer y no en recordar.
Pósteres, logotipos de título, filas etiquetadas por género y la propia fila de
«Continuar viendo» evitan que el usuario tenga que teclear nada para llegar a
lo que le interesa.

*Mejora:* la búsqueda sí exige recuerdo. Al volver a ella el campo aparece
vacío y se pierden tanto la consulta anterior como los filtros aplicados, así
que una exploración larga hay que reconstruirla desde cero. Conservar consultas
y filtros recientes descargaría la memoria del usuario.

**7. Flexibilidad y eficiencia de uso — Severidad 3**

*Evidencia:* existen atajos reales para el usuario veterano. «Continuar viendo»
ocupa la primera posición del inicio, las descargas permiten consumo sin red y
la reproducción automática encadena el siguiente episodio sin intervención.

*Mejora:* es la heurística con más recorrido. Cualquier acción frecuente
—añadir a la lista, descargar, ver el tráiler— obliga a entrar en la ficha,
volver atrás y perder la posición del carrusel. Una pulsación larga sobre la
tarjeta que despliegue esas acciones ahorraría dos pantallas en el caso de uso
más habitual.

**8. Diseño estético y minimalista — Severidad 2**

*Evidencia:* el tema oscuro reduce el brillo del contenedor y convierte el arte
de las portadas en el único foco luminoso de la pantalla. En el reproductor los
controles se ocultan solos tras unos segundos y dejan la imagen limpia.

*Mejora:* la ficha de detalle acumula ruido. Cuatro acciones secundarias del
mismo tamaño y color compiten con el botón de reproducir, y los metadatos se
leen como una frase corrida en vez de como datos escaneables. Bajar el peso
visual de lo secundario devuelve la atención al CTA.

**9. Reconocer, diagnosticar y recuperarse de errores — Severidad 3**

*Evidencia:* los fallos de reproducción muestran un mensaje con opción de
reintentar en lugar de dejar la pantalla en negro, y la app conserva la
posición del contenido para no obligar a empezar de cero tras el fallo.

*Mejora:* el mensaje es genérico y suele acompañarse de un código que no
significa nada para el usuario. Sin conexión, límite de dispositivos, título
retirado del catálogo o no disponible en la región exigen acciones distintas:
el error debería nombrar la causa y ofrecer directamente la acción que la
resuelve.

**10. Ayuda y documentación — Severidad 2**

*Evidencia:* existe un centro de ayuda accesible desde los ajustes de la
cuenta, con cobertura suficiente para incidencias de suscripción, facturación o
dispositivos vinculados.

*Mejora:* la ayuda vive lejos de donde surge la duda. Cuánto ocupa una
descarga, cuánto tiempo sigue disponible una vez descargada o cómo fijar el
idioma por defecto se resuelven en un artículo externo, cuando bastaría un
icono de información junto al propio control.

---

**Síntesis.** Ninguna heurística se incumple de forma grave: HBO Max es un
producto maduro y la mayoría de hallazgos son cosméticos o menores. Los tres
problemas prioritarios son:

- **P1 · Las acciones frecuentes cuestan demasiado** (severidad 3). Guardar,
  descargar o previsualizar exige entrar en la ficha y volver. Es el de mayor
  impacto porque afecta al gesto que más se repite.
- **P2 · Los errores no dicen qué hacer** (severidad 3). Un mensaje genérico
  con un código deja al usuario sin siguiente paso justo en el momento de
  máxima frustración.
- **P3 · La ficha compite consigo misma** (severidad 2). Demasiados elementos
  con el mismo peso visual retrasan la única decisión que importa.

El rediseño de la Parte 3 ataca **P3** y parte de **P1**, porque ambos se
resuelven dentro de la ficha de detalle.

---

## Parte 2 · Principios de Gestalt

**Proximidad.** El espacio vertical entre carruseles es mayor que el hueco
entre pósteres de una misma fila. Por eso «Top 10» y «Porque viste…» se leen
como categorías separadas sin necesidad de ningún separador.

**Similitud.** Todos los pósteres usan la misma proporción y el mismo radio, de
modo que el ojo los compara sin leer. El distintivo «Nuevo episodio» funciona
precisamente porque rompe esa uniformidad.

**Región común.** La ficha de detalle agrupa título, metadatos, sinopsis y
acciones sobre una misma superficie oscura continua, lo que comunica que todo
se refiere al mismo título y no al carrusel del que venías.

**Cierre.** Los carruseles cortan el último póster a media anchura. Ese recorte
parcial es lo que hace entender que la fila continúa y que se puede desplazar
hacia la derecha, sin ninguna flecha ni instrucción.

**Continuidad.** Los pósteres de una fila comparten línea base y alineación
estricta, lo que crea un raíl horizontal que arrastra la vista. El
desplazamiento vertical entre filas y el horizontal dentro de cada fila no se
confunden nunca.

**Figura y fondo.** El fondo casi negro no compite con nada, así que las
portadas y el botón blanco de reproducir se leen como figura. El degradado que
oscurece la parte baja del hero existe justo para sostener el texto sobre la
imagen.

**Destino común.** Al deslizar un carrusel, sus pósteres se desplazan
solidariamente mientras el resto de filas permanece quieto. El movimiento
compartido confirma qué elementos forman esa categoría.

**Conexión uniforme.** La barra de progreso pegada al borde inferior de la
miniatura pertenece inequívocamente a ese título y no al de al lado. Lo mismo
hace el subrayado de la pestaña activa con el contenido que muestra debajo.

---

## Parte 2 · Prototipo de baja fidelidad

Flujo: `Inicio → Buscar → Ficha → Reproductor → Retomar`

Cinco frames enlazados con conectores. La etiqueta de cada conector indica la
acción del usuario que provoca la transición.

| # | Pantalla    | Objetivo    | Elementos                                                                                    | Transición de salida  |
| - | ----------- | ----------- | -------------------------------------------------------------------------------------------- | --------------------- |
| 1 | Inicio      | Descubrir   | Hero destacado, «Continuar viendo» en primera posición, carruseles por categoría, tab bar      | Pulsa la lupa         |
| 2 | Buscar      | Filtrar     | Campo de búsqueda, chips de tipo y género, rejilla de resultados, búsquedas recientes si vacío | Toca un resultado     |
| 3 | Ficha       | Decidir     | Hero, título, metadatos, CTA único, acciones secundarias, sinopsis, episodios                  | Pulsa Reproducir      |
| 4 | Reproductor | Reproducir  | Vídeo, barra de progreso, controles, subtítulos y audio, siguiente episodio                    | Cierra el reproductor |
| 5 | Retomar     | Volver      | Inicio con el progreso ya actualizado y el título en primera posición                          | —                     |

**Decisiones de diseño**

- *El flujo es un ciclo, no una línea.* El usuario de streaming casi nunca
  empieza de cero: vuelve a algo que dejó a medias. El recorrido termina donde
  empieza, con el estado ya actualizado. → Ataca H1.
- *Un solo CTA dominante en la ficha.* Con varios botones del mismo peso la
  decisión se retrasa. → Ataca H8.
- *Búsqueda con estado inicial útil.* Con el campo vacío se muestran consultas
  y filtros recientes en lugar de una pantalla en blanco. → Ataca H6.
- *Barra de pestañas siempre presente*, salvo en el reproductor, que es de
  pantalla completa por naturaleza. → Ataca H3.

---

## Parte 3 · Microcopy de la pantalla

- Etiqueta de marca: `HBO Original`
- Título: `The Last of Us`
- Franja de progreso: `T1:E3` · `Quedan 22 min`
- Metadatos: `★ 8,7` · `2023` · `2 temporadas` · `16+` · `4K UHD`
- CTA principal: `Reanudar T1:E3`
- Acciones: `En mi lista` · `Descargar` · `Tráiler` · `Compartir`
- Pestañas: `Episodios` · `Relacionados` · `Detalles`
- Selector: `Temporada 1`

**Sinopsis**

> Veinte años después de que la civilización moderna fuera destruida, Joel
> recibe el encargo de sacar a Ellie de una zona de cuarentena. Lo que empieza
> como un trabajo se convierte en una travesía brutal por un país devastado.

**Episodios**

| Episodio                                 | Meta                    |
| ---------------------------------------- | ----------------------- |
| 1. Cuando estés perdido en la oscuridad  | 81 min · Visto          |
| 2. Infectados                            | 53 min · Visto          |
| 3. Mucho, mucho tiempo                   | 76 min · Quedan 22 min  |
