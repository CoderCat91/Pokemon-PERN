# Pokedex

## Table of Contents
- [Project Overview](#project-overview)
- [Wireframes](#wireframes)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Future Work](#future-work)
- [Installation](#installation)
- [License](#license)
---

## Project Overview
A POSTgresql database is connected to a front end react application using express and node (PERN stack). This application allows users to register their email and password, login and then add Pokemon to a Pokedex dashboard. The Pokedex is only available to users that are logged in, users can also delete the Pokemon from their Pokedex. Detailed information can be viewed about each Pokemon through the Pokemon table. 

## Wireframes

The desktop wireframe used for this project.
![Local Image](/Pokemon%20PERN@2x.png)

---

## Technologies Used
List the key technologies and libraries used to build this project.

- **Frontend**:
  - **React** & **React Bootstrap**: For building interactive & responsive UI components.
  - **HTML**: Structure, responsive design and styling.
  - **Sass**: For more manageable and modular CSS.

  **REST API**: Created through POSTgresql, Express and Node.
  - **Express**: Used to manage CRUD functions.
  **Other Tools**:
  - **Figma**: For wireframe and prototype design.
  - **Git** & **GitHub**: Version control and project collaboration.
  -**Jest** & **React Testing Library (RTL)**: Testing the functionality of components.

---

## Features
### Current Features

1. **Responsive Design**: The project is fully responsive, ensuring usability across different screen sizes.
2. **Dynamic Content Management**: Content is updated in real-time without refreshing the page.
3. **Search**: Users can use the search function to search for Pokemon and go to their profile pages.
4. **Filter**: Users can filter the Pokemon by different types such as "Grass" and "Fire".
5. **Browse**: Users can browse Pokemon on the Pokemon page.
6. **Register**: Users can create a Pokedex profile through registration.
7. **Login**: Users need to Login to view their Pokedex.
8. **Pokedex**: Users have their own personal Pokedex that saves to their profile.
9. **Levelling**: Pokemon level up once every 24 hours whilst in the Pokedex.
10. **Evolve**: Optional - Users can evolve their Pokemon once they reach a certain level.

## Future Work
- **Dark Mode**: Option for users to switch to a dark-themed interface.
- **Favourites**: Users can put their Pokemon in order of best to worst.
- **Feed**: Users can feed their Pokemon.
- **Random stone drop**: Users have a change of collecting a stone to evolve their Pokemon with every login.

## Installation
Steps to set up the project on your local machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/CoderCat91/Pokemon-PERN.git

2. cd Pokemon-PERN

3. npm install - install required dependencies.

4. In terminal: 
   npm start.


## License

This project is licensed under the MIT License.
