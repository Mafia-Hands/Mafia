# Mafia 💎🖐

This is an online multiplayer take on the classic party game Mafia. The game splits players into civilians and mafia members. The goal of the game is simple, kill the opposing team. The full ruleset can be found [here](https://github.com/Mafia-Hands/Mafia/wiki/Game-Rules).
However, since this is an OSS project, developers are free to edit rules and add new functionality as they please.

<p align="center">
  <img src="https://raw.githubusercontent.com/Mafia-Hands/Mafia/main/frontend/public/logo192.png" height=200; width=200>
</p>

Please review the [documentation](https://github.com/Mafia-Hands/Mafia/wiki) for guidelines and information about the software.

## Installation

-   Note: An in-depth guide is available on our [Wiki's Getting Started page](https://github.com/Mafia-Hands/Mafia/wiki/Getting-Started). A condensed version is as follows:

Before you install and get started with this project, please ensure that you have installed [nodejs](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) on your computer.

This project uses the package manager [npm](https://www.npmjs.com/get-npm) to install all dependencies.

First, clone the repository and open the project directory:

```
git clone git@github.com:Mafia-Hands/Mafia.git
cd Mafia
```

To run this application locally, the frontend and backend must run together. You can do it like so:

**Frontend:**

```
cd frontend
npm install
npm start
```

**Backend:**

```
cd backend
npm install
npm start
```

**Note:** You do not need to run `npm install` everytime. Only when a new package is added.

**Note:** Ensure that the `socket.js` file (frontend > src > socket.js) points to your local server by uncommenting the necessary line.

## Usage

For development purposes, you can run the application locally by following the [Installation](https://github.com/Mafia-Hands/Mafia#installation) Instructions.

If you would like to play the game, follow our guide on how to [Get Started](). If you don't know how to play Mafia, you can also read the [Rules of the game](https://github.com/Mafia-Hands/Mafia/wiki/Game-Rules)!

## Support

If you encounter any issues regarding this project, please create a [Github Issue](https://github.com/Mafia-Hands/Mafia/issues) using the relevant template. You can also tag a specific contributor if you feel like they might be able to help you out.

## Roadmap

Outstanding issues and requests can be tracked and visualised on our Github Projects page.

[Backend](https://github.com/Mafia-Hands/Mafia/projects/2)

[Frontend](https://github.com/Mafia-Hands/Mafia/projects/1)

[DevOps](https://github.com/Mafia-Hands/Mafia/projects/4)

[Documentation](https://github.com/Mafia-Hands/Mafia/projects/3)

## Contributing

If you would like to contribute to this project, please make sure to follow our [Contributing Guidelines](https://github.com/Mafia-Hands/Mafia/wiki/Contributing-Guidelines).

## Authors and acknowledgement

This project was coordinated by and for the University of Auckland course SOFTENG 701.

Thanks to:

-   University of Auckland - for providing the opportunity to work on and create this project
-   Dr Kelly Blincoe - for assistance with the development of this project

Also, special thanks to the members of Group 4 (Mafia Hands) for their hard work and dedication towards this project. A detailed list of their contributions can be found [here.](https://github.com/Mafia-Hands/Mafia/wiki/Contributions)

## Project Status

The original developers of this project have now concluded their involvement. Team 3 will be continuing the development process going forward.
For a list of suggested additions to this app, take a look at the Future Works page on our Wiki.

## Code of Conduct

Please ensure all [code of conduct](https://github.com/Mafia-Hands/Mafia/wiki/Code-of-Conduct) is followed.

## License

Licensed under the [Apache License 2.0](LICENSE.md) license
