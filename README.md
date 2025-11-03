# Calculadora

Calcula el tiempo conociendo la distancia y la velocidad.

Realizado con Sonnet 3.5 y corregido y mejorado con ChatGPT GPT-4.5

# Calculadora Náutica – v0.1.8

Una aplicación web sencilla y elegante para calcular **tiempo estimado de viaje (ETA)** en millas náuticas, con historial de los últimos viajes y almacenamiento local.

---

## ⚓ Características principales
- **Cálculo de ETA**  
  Introduce la **distancia** (en millas náuticas) y la **velocidad** (en nudos) para obtener:
  - Tiempo de viaje en formato **HH:MM:SS**.
  - **Hora estimada de llegada** según la hora actual.

- **Hora actual en tiempo real**  
  Se actualiza automáticamente cada segundo.

- **Historial de viajes**  
  - Guarda los **2 últimos cálculos** realizados.
  - Permanece incluso si se refresca la página (almacenado en `localStorage`).
  - Opción para **borrar historial** con un botón de papelera.

- **Interfaz responsive**  
  - Diseño moderno y adaptado a móviles.
  - Fondo con degradado marino y efecto blur.

---

## 🛠️ Cómo usar
1. Abre `index.html` en tu navegador (no requiere servidor).
2. Ingresa:
   - **Distancia (MN)**  
   - **Velocidad (nudos)**
3. Pulsa **Calcular** o presiona **Enter**:
   - Verás el **Tiempo estimado de viaje**.
   - La **Hora de llegada** calculada.
4. El historial mostrará los **dos últimos viajes** realizados.
5. Si deseas, pulsa **🗑️** para borrar el historial.

---

## 📂 Estructura del proyecto


index.html # Estructura de la calculadora styles.css # Estilos y diseño responsive main.js # Lógica de cálculo, historial y almacenamiento
README.md # Documentación del proyecto


---

## 👥 Créditos
- **Pruebas:** [socramazibi](https://github.com/socramazibi)
- **Desarrollo y sugerencias:** ChatGPT (asistencia en programación, diseño y mejoras).

---

## 🚀 Changelog
### v0.1.8
- Añadido **historial persistente** con `localStorage`.
- Botón **🗑️** para borrar el historial.
- Ajustes de estilo y organización.

### v0.1.6
- Historial de los últimos 2 viajes (solo en memoria).
- Separación de datos en varias líneas.

### v0.1.5
- Versión inicial con:
  - Cálculo de ETA.
  - Hora actual en tiempo real.
  - Interfaz responsive.

---

## ⚖️ Licencia
Proyecto de libre uso para fines educativos o personales.  
Si reutilizas o publicas este proyecto, recuerda **dar crédito a este repositorio**.

https://github.com/socramazibi/Calculadora-Barco

## web
https://socramazibi.github.io/Calculadora-Barco/
