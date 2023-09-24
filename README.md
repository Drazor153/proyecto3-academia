# Proyecto Academia Ingles UTA
Este repositorio aloja un proyecto web con fines meramente académicos para el ramo de Proyecto 3 de la carrera Ingeniería Civil en Computación e Informática de la Universidad de Tarapacá, Chile.

El proyecto consiste en un sistema de gestión académica para la Academia de Inglés perteneciente a nuestra Universidad, con el principal objetivo de facilitar el manejo y generar confianza en la información académica de los estudiantes pertenecientes a la Academia.

El proyecto consta de dos sub-sistemas interconectados:
- Una aplicación de Front desarrollada en Vite para ofrecer la interfaz gráfica de usuario el cual se podrá utilizar para consultar cualquier información de la academia, como notas de un alumno, asistencia a clases, gestión de estudiantes, entre otros
- Una API que su función principal es ofrecer a la aplicación Front rutas por la cual obtener la información anteriormente mencionada sin necesidad de interactuar directamente con la base de datos del sistema

# Ejecutar cada app
## Aplicación Vite
- Entrar a la carpeta "client"
   Ejectar `yarn` para instalar las dependencias
- `yarn dev` para ejecutar el servidor en modo desarrollo
## API
- Entrar a la carpeta "server"
- Ejectar `yarn` para instalar las dependencias
- `yarn dev` para ejecutar el servidor en modo desarrollo (Typescript)
- Si se requiere ejecutar en Javascript (production, distribution), ejecutar `yarn tsc` y luego `yarn start`
