# APP Backend con interfaz gráfica

Desarrollé una aplicación backend con interfaz gráfica para comprender a profundidad la comunicación cliente-servidor, el funcionamiento de HTTP y la construcción de APIs siguiendo el patrón MVC (Modelo-Vista-Controlador).

La aplicación permite gestionar productos a través de endpoints que soportan filtrado, ordenamiento y paginación, manteniendo el estado de la consulta directamente en la URL.

---

## 🔹 Tecnologías utilizadas

- Node.js + Express  
- MongoDB Atlas + Mongoose  
- EJS para renderizado de vistas  

---

## 🔹 Ejemplo de endpoints

- GET `/products` → obtener todos los productos  
- GET `/products?tag=comfort` → filtrar por categoría  
- GET `/products?tag=comfort&sort=name` → filtrar y ordenar  
- GET `/products/:productId` → obtener un producto específico  
- POST `/products` → crear un nuevo producto  
- PUT `/products/:productId` → actualizar un producto  

---

## 🔹 Flujo de la aplicación

petición → middleware → rutas → controlador → repositorio (BD) → respuesta → vista (EJS)

---

## 🔹 Funcionalidades implementadas

- CRUD de productos  
- Filtros por tag, nombre y rango de precio  
- Ordenamiento dinámico  
- Paginación  
- Persistencia del estado en la URL  

---

## 🔹 Aprendizajes clave

- Manejo de rutas y middlewares en Express  
- Separación de responsabilidades con MVC  
- Modelado y acceso a datos con Mongoose  

## 🚀 Cómo ejecutar el proyecto

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

Instalar dependencias:

```bash
npm install
```

Configurar variables de entorno: crea un archivo .env en la raíz del proyecto basado en .env.example

```bash
cp .env.example .env
```

Ejemplo de configuración:

---
- PORT=3000
- HOST=127.0.0.1
- MONGODB_URI=your_mongodb_connection_string
- DB_NAME=nodepop
- SESSION_SECRET=your_secure_secret

---
Inicializar base de datos:
```bash
npm run initDB
```
Ejecutar el proyecto:
```bash
npm run dev
```
Abrir en el navegador:
http://127.0.0.1:3000
