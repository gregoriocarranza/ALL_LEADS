# Google Sheets Filter Leads Application

Esta aplicación utiliza Node.js y Express para filtrar leads almacenados en una hoja de cálculo de Google Sheets y descargar los resultados en un archivo CSV. La autenticación se realiza mediante OAuth2.

# La aplicacion ya se encuentra configurada para utilizar las credenciales de google. Vaya al apartado 7 - **Autorizar la aplicación:** para configurar permisos y empezar

## Requisitos

- Node.js
- npm
- Credenciales OAuth2 de Google Cloud

## Configuración

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. **Instalar las dependencias:**

   ```bash
   npm install
   ```

3. **Obtener las credenciales de Google:**

   - Ve a la [Consola de Google Cloud](https://console.cloud.google.com/).
   - Crea un proyecto y habilita la API de Google Sheets.
   - Configura una pantalla de consentimiento OAuth.
   - Crea credenciales OAuth2 (ID de cliente) para una aplicación web.
   - Descarga el archivo JSON con las credenciales y renómbralo a `credentials.json`.

4. **Guardar las credenciales en el proyecto:**

   - Coloca el archivo `credentials.json` en el directorio raíz del proyecto.

5. **Configurar las variables de entorno:**

   - Crea un archivo `.env` en el directorio raíz del proyecto y añade la siguiente línea:

   ```bash
   GOOGLE_APPLICATION_CREDENTIALS=./credentials.json
   ```

6. **Iniciar la aplicación:**

   ```bash
   npm run start
   ```

7. **Autorizar la aplicación:**

   - Ejecute la aplicación con `npm run start`.
   - Abra la aplicación en `http://localhost:5000`.
   - Envíe una petición POST a `http://localhost:5000/filter-leads` con el cuerpo en formato JSON o mediante el formulario en `http://localhost:5000`.
   - En la consola, aparecerá una URL para la autorización de Google.
   - Copie esa URL y ábrala en su navegador.
   - Autorice la aplicación con su cuenta de Google (en el caso de las personas que están evaluando esto, deben usar el correo `ceo@rcorp.digital` que tiene los permisos necesarios).
   - Una vez autorizada, Google redirigirá a una página que muestra un código de autorización.
   - Copie ese código.
   - Vuelva a la consola y pegue el código en la parte que dice "Enter the code from that page here".
   - La aplicación guardará el token de acceso.
   - Reinicie la aplicacion estará lista para usar.

8. **Usar la aplicación:**

   - Para filtrar leads, haz una solicitud POST a `http://localhost:5000/filter-leads` con el cuerpo en formato JSON:

   ```bash
   {
   "role": "role_value",
   "industry": "industry_value",
   "country": "country_value",
   "cnae": "cnae_value"
   }
   ```

   - O utilize mediante el formulario en `http://localhost:5000`
   - Descarga el archivo CSV con los leads filtrados.

## Scripts

- `app.js`: Contiene la lógica principal de la aplicación y los endpoints.
- `src/sheets.js`: Maneja la autenticación y las solicitudes a la API de Google Sheets.
