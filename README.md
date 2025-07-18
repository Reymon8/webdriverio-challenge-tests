# WebDriverIO Challenge - OpenCart Demo

## Organización de Casos de Prueba

Los casos de prueba están organizados por funcionalidad, siguiendo criterios de aceptación claros y buenas prácticas:

### 01-producto.spec.ts
- **CP001 - Ver detalle de un producto** (automatizado y funcional)
  - Marca
  - Código del producto
  - Puntos de recompensa
  - Disponibilidad
  - Campo para ingresar la cantidad
  - Botón para agregar al carrito
  - Descripción

### 02-carrito.spec.ts
- **CP002 - Agregar producto al carrito y validar tabla**
- **CP003 - Actualizar cantidad de producto en el carrito**
- **CP004 - Eliminar producto del carrito**
- **CP005 - Validar mensaje de carrito vacío**
- **CP006 - Validar botones “Continuar comprando” y “Pasar al checkout”**
- **CP007 - Mensaje de error por falta de stock**

### 03-checkout.spec.ts
- **CP008 - Confirmar pedido como usuario autenticado**
- **CP009 - Validar errores en checkout por falta de datos**

### 04-historial.spec.ts
- **CP010 - Visualizar detalle y estado del pedido en historial**

---

## Criterios de Aceptación Cubiertos

- Visualización de detalle de producto: marca, código, puntos de recompensa, disponibilidad, cantidad, botón agregar al carrito, descripción.
- Carrito de compras: tabla de productos, actualizar/eliminar productos, mensaje de carrito vacío, botones de acción, error por falta de stock.
- Checkout: compra autenticada, validación de errores por datos faltantes, campo comentario, botón confirmar pedido solo habilitado si todo está completo.
- Historial de pedidos: visualización de detalle y estado del pedido realizado.

---

## Ejecución de Pruebas

### Ejecutar todos los casos:
```bash
npx wdio run wdio.conf.js
```

### Ejecutar un archivo específico:
```bash
npx wdio run wdio.conf.js --spec test/specs/01-producto.spec.ts
```

---

## Reportes Allure

### Generar y abrir reporte:
```bash
npx allure generate allure-results --clean -o allure-report && npx allure open allure-report
```

### Pasos completos para reporte limpio:
1. **Limpiar resultados anteriores (opcional):**
   ```bash
   rm -rf allure-results/*
   ```
2. **Ejecutar los tests:**
   ```bash
   npx wdio run wdio.conf.js
   ```
3. **Generar el reporte:**
   ```bash
   npx allure generate allure-results --clean -o allure-report
   ```
4. **Abrir el reporte:**
   ```bash
   npx allure open allure-report
   ```

---

## Pasos recomendados para visualizar el reporte Allure limpio y actualizado

Sigue estos pasos siempre para evitar duplicados y ver solo los resultados de la última ejecución:

1. **Limpiar resultados anteriores (opcional pero recomendado):**
   ```bash
   rm -rf allure-results/*
   ```
2. **Ejecutar el/los test(s):**
   - Para un archivo específico:
     ```bash
     npx wdio run wdio.conf.js --spec test/specs/02-carrito.spec.ts
     ```
   - Para todos los tests:
     ```bash
     npx wdio run wdio.conf.js
     ```
3. **Generar el reporte Allure:**
   ```bash
   npx allure generate allure-results --clean -o allure-report
   ```
4. **Abrir el reporte en tu navegador:**
   ```bash
   npx allure open allure-report
   ```

> **Importante:** Así te aseguras de ver solo los resultados de la última ejecución y evitar confusiones por duplicados en el reporte.

---

> **Nota:** Actualiza el valor de la cookie `cf_clearance` cada vez que expire para evitar el captcha de Cloudflare. Mantén los casos automatizados y funcionales en cada archivo, y usa skeletons solo para los que faltan implementar. 