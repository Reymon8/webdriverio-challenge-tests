## 🚀 Guía rápida para clonar y ejecutar el proyecto

1. **Clona el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd webDriveriOChallenge
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **(Opcional) Instala Allure Commandline para reportes:**
   ```bash
   npm install -g allure-commandline --save-dev
   ```

4. **Actualiza la cookie `cf_clearance` si es necesario:**  
   (Ver instrucciones al final del README para obtener el valor actualizado de la cookie si aparece el captcha de Cloudflare.)

5. **Ejecuta un caso de prueba individual:**
   Por ejemplo, para el primer caso:
   ```bash
   npx wdio run wdio.conf.js --spec test/specs/01-producto.spec.ts --mochaOpts.grep "CP001"
   ```

6. **(Opcional) Genera y abre el reporte Allure:**
   ```bash
   npx allure generate allure-results --clean -o allure-report
   npx allure open allure-report
   ```

---

# WebDriverIO Challenge - OpenCart Demo

## 📝 Descripción del Challenge

Este proyecto automatiza pruebas funcionales sobre la demo de OpenCart, cubriendo el flujo completo de compra: desde la visualización de productos, gestión del carrito, checkout y consulta del historial de pedidos.

### 🎯 **Historia de Usuario probada**
Como usuario de la tienda:
- Quiero poder ver el detalle de los productos.
- Quiero agregar, actualizar y eliminar productos del carrito.
- Quiero realizar compras autenticado y validar errores en el proceso de checkout.
- Quiero consultar el historial y estado de mis pedidos.

---

## ✅ Criterios de aceptación

Estos son los requisitos funcionales que debe cumplir la aplicación y que están cubiertos por los tests automatizados:

### Al seleccionar un producto se debe poder visualizar su detalle:
- Marca
- Código del producto
- Puntos de recompensa
- Disponibilidad
- Un campo para ingresar la cantidad
- Un botón para agregar al carrito de compra
- Descripción

### En el carrito de compras:
- Visualizar una tabla con los productos agregados
- Opciones para actualizar la cantidad o eliminar cada producto
- Mostrar un mensaje cuando el carrito se encuentre vacío
- Botones: “Continuar comprando” y “Pasar al checkout”
- Mensaje de error si se intenta añadir o procesar un producto sin stock
- Se debe poder confirmar un pedido mediante un usuario autenticado

### En la pantalla de Checkout:
- Selección de dirección de envío
- Validar errores si falta:
  - Dirección
  - Método de envío
  - Método de pago
- Campo comentario sobre el pedido (opcional)
- El botón “Confirmar pedido” debe habilitarse sólo cuando toda la información esté completa

### En el historial de pedidos:
- Visualizar el detalle y el estado del pedido realizado

---

## 📋 Casos de Prueba Automatizados

Cada archivo `.spec.ts` agrupa casos por funcionalidad. **Ejecuta cada caso de prueba de forma individual para evitar problemas de sesión y asegurar resultados confiables.**

### 01-producto.spec.ts
- **CP001:** Ver detalle de un producto (marca, código, puntos, disponibilidad, cantidad, agregar al carrito, descripción)

### 02-carrito.spec.ts
- **CP002:** Agregar producto al carrito y validar tabla
- **CP003:** Actualizar cantidad de producto en el carrito
- **CP004:** Eliminar producto del carrito
- **CP005:** Validar mensaje de carrito vacío
- **CP007:** Mensaje de error por falta de stock

### 03-checkout.spec.ts
- **CP008:** Confirmar pedido como usuario autenticado
- **CP009:** Validar errores en checkout por falta de datos

### 04-historial.spec.ts
- **CP010:** Visualizar detalle y estado del pedido en historial

---

## 🚦 ¿Cómo ejecutar cada caso de prueba?

> **IMPORTANTE:** Ejecuta **un solo caso a la vez** para evitar conflictos de sesión y obtener resultados confiables.

Usa este comando, cambiando el archivo y el nombre del caso según lo que quieras probar:

```bash
npx wdio run wdio.conf.js --spec test/specs/XX-archivo.spec.ts --mochaOpts.grep "CP00X"
```

## 📊 Visualizar el reporte Allure paso a paso

1. **Limpia resultados anteriores (opcional pero recomendado):**
   ```bash
   rm -rf allure-results/*
   ```
2. **Ejecuta el caso de prueba individual:**
   ```bash
   npx wdio run wdio.conf.js --spec test/specs/XX-archivo.spec.ts --mochaOpts.grep "CP00X"
   ```
3. **Genera el reporte Allure:**
   ```bash
   npx allure generate allure-results --clean -o allure-report
   ```
4. **Abre el reporte en tu navegador:**
   ```bash
   npx allure open allure-report
   ```

## 🚦 Comandos para ejecutar cada caso de prueba

```bash
# CP001 - Ver detalle de un producto (marca, código, puntos, disponibilidad, cantidad, agregar al carrito, descripción)
npx wdio run wdio.conf.js --spec test/specs/01-producto.spec.ts --mochaOpts.grep "CP001"

# CP002 - Agregar producto al carrito y validar que aparece correctamente en la tabla del carrito
npx wdio run wdio.conf.js --spec test/specs/02-carrito.spec.ts --mochaOpts.grep "CP002"

# CP003 - Actualizar la cantidad de un producto en el carrito y validar el cambio
npx wdio run wdio.conf.js --spec test/specs/02-carrito.spec.ts --mochaOpts.grep "CP003"

# CP004 - Eliminar un producto del carrito y validar que desaparece de la tabla
npx wdio run wdio.conf.js --spec test/specs/02-carrito.spec.ts --mochaOpts.grep "CP004"

# CP005 - Validar que se muestra el mensaje de carrito vacío cuando no hay productos
npx wdio run wdio.conf.js --spec test/specs/02-carrito.spec.ts --mochaOpts.grep "CP005"

# CP007 - Intentar agregar más productos de los disponibles y validar el mensaje de error por falta de stock
npx wdio run wdio.conf.js --spec test/specs/02-carrito.spec.ts --mochaOpts.grep "CP007"

# CP008 - Confirmar un pedido como usuario autenticado (flujo completo de compra)
npx wdio run wdio.conf.js --spec test/specs/03-checkout.spec.ts --mochaOpts.grep "CP008"

# CP009 - Validar errores en checkout por falta de datos obligatorios (dirección, envío, pago)
npx wdio run wdio.conf.js --spec test/specs/03-checkout.spec.ts --mochaOpts.grep "CP009"

# CP010 - Visualizar el detalle y el estado del pedido realizado desde el historial de pedidos
npx wdio run wdio.conf.js --spec test/specs/04-historial.spec.ts --mochaOpts.grep "CP010"
```


## 📊 Visualizar el reporte Allure paso a paso

1. **Limpia resultados anteriores (opcional pero recomendado):**
   ```bash
   rm -rf allure-results/*
   ```
2. **Ejecuta el caso de prueba individual:**
   ```bash
   npx wdio run wdio.conf.js --spec test/specs/XX-archivo.spec.ts --mochaOpts.grep "CP00X"
   ```
3. **Genera el reporte Allure:**
   ```bash
   npx allure generate allure-results --clean -o allure-report
   ```
4. **Abre el reporte en tu navegador:**
   ```bash
   npx allure open allure-report
   ```

> Así te aseguras de ver solo los resultados de la última ejecución y evitar confusiones por duplicados en el reporte.

> **Nota:** Si ves errores raros, ¡asegúrate de estar corriendo solo un caso a la vez! Si la cookie `cf_clearance` expira, actualízala para evitar el captcha de Cloudflare. 

---

> **Nota importante:**
>
> 1. **¿Por qué pueden aparecer errores extraños?**
>    - Si ejecutas varios casos de prueba juntos, pueden fallar por temas de sesión (por ejemplo, un test deja al usuario logueado y el siguiente espera que esté deslogueado), por estados "sucios" en el carrito, o porque la aplicación no está en la pantalla esperada. Por eso, **siempre ejecuta un solo caso a la vez** para evitar estos problemas y obtener resultados confiables.
>
> 2. **Sobre la cookie `cf_clearance` y el captcha de Cloudflare:**
>    - El sitio demo de OpenCart está protegido por Cloudflare, que a veces muestra un captcha para verificar que eres humano. Cuando resuelves el captcha manualmente en el navegador, se guarda una cookie llamada `cf_clearance` que permite el acceso automatizado por un tiempo limitado.
>    - Si la cookie expira o cambia, la automatización puede fallar (por ejemplo, los tests no avanzan o aparece una página de captcha en vez de la tienda).
>    - **¿Qué hacer si esto pasa?**
>      1. Abre el sitio demo en tu navegador y resuelve el captcha manualmente.
>      2. Abre las herramientas de desarrollador (F12), ve a la pestaña “Application” (en Chrome) o “Almacenamiento” (en Firefox), busca en “Cookies” el dominio `.demo.opencart.com` y copia el valor actualizado de la cookie `cf_clearance`.
>      3. Ve al archivo `wdio.conf.ts` de tu proyecto.
>      4. Busca la sección:
>         ```ts
>         before: async function () {
>             await browser.setCookies({
>                 name: 'cf_clearance',
>                 value: 'AQUI_PEGA_EL_NUEVO_VALOR',
>                 domain: '.demo.opencart.com',
>                 path: '/',
>                 secure: true,
>                 httpOnly: true
>             });
>         },
>         ```
>      5. **Reemplaza el valor de `value`** por el nuevo valor que copiaste.
>      6. Guarda el archivo y vuelve a ejecutar tus tests.
>    - Así te aseguras de que la automatización pueda acceder al sitio sin interrupciones. 

--- 