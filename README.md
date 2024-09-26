# kikirikalarm-mobile

Esta es una aplicación móvil desarrollada con Angular 16 e Ionic 7.

## Requisitos previos

- **Node.js**: Asegúrate de tener instalada la versión **20.11.0** o superior de [Node.js](https://nodejs.org/).
- **Ionic CLI**: Instala la Ionic CLI globalmente si no la tienes instalada:

   ```bash
   npm install -g @ionic/cli

## Instrucciones de instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Kikirikalarm/kikirikalarm-web.git 

   cd kikirikalarm-mobile
   ```

2. Instala las dependencias del proyecto: Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

   ```bash
   npm install
   ```

3. Ejecuta la aplicación en el navegador (modo desarrollo): Puedes usar el siguiente comando para iniciar la aplicación en el navegador:

     ```bash
     ionic serve
     ```

Luego, abre tu navegador y navega a:
 <http://localhost:8100>

## Ejecutar en dispositivo o emulador

### Android

1. Configura Android:

    - Asegúrate de tener configurado Android Studio con el SDK      y las herramientas necesarias.
    - Conecta tu dispositivo Android o configura un emulador.

2. Compila la aplicación para Android:

     ```bash
      ionic capacitor run android
     ```

Esto abrirá Android Studio donde podrás ejecutar la aplicación en tu dispositivo o emulador.

#### opcional

para compilar la aplicacion tambien puedes ejecutar los siguientes comandos

  ``` bash
  ionic build
  npx cap sync android
  npx cap open android
  ```

con estos comandos se abrira android studio en donde podras instalar la aplicacion en un emulador o en tu dispositivo
