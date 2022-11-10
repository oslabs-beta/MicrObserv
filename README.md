[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/oslabs-beta/MicrObserv/">
    <img src="https://media.discordapp.net/attachments/1028453327018655764/1031985744203497503/9-765_850x480-pad.jpeg" alt="Logo" width="250" height="150">
  </a>

  <h3 align="center">MicrObserv</h3>

  <p align="center">
    A real-time & event driven observability tool for microservices!
    <br />
    <a href="https://github.com/oslabs-beta/MicrObserv/blob/dev/README.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/oslabs-beta/MicrObserv/issues">Report Bug</a>
    ·
    <a href="https://github.com/oslabs-beta/MicrObserv/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<div align="center" >
<a href="https://github.com/oslabs-beta/MicrObserv/">
<img src="./assets/Screenshot 2022-11-09 at 10.59.59 AM.jpg" alt="Logo" width="600" height="450">
</a>
</div>
<div align="center">
<a href="https://github.com/oslabs-beta/MicrObserv/">
<img src="./assets/Screenshot%202022-11-09%20at%2010.57.56%20AM.jpg" alt="Logo" width="600" height="450">
</a>
</div>

MicrObserv is here to simplify observability for your microservice architecture by consolidating all logs and tracers into one consolidated database.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DEMO -->

## Demo

<div align="center">
<img src="./assets/Demo.gif" alt="Logo" width="600" height="450">
</div>

need gif of dashboard updating
1. Fork and Clone the repo
2. Install dependencies in the root folder and into each of the following folders
    1. Backend
    2. Electron
    3. Demo
    4. Demo/SeviceA
    5. Demo/ServiceB
    6. Demo/website
3. Start servers `npm start` in the following folders
    1. Backend
    2. Demo
    
1. Download and Launch MicrObserv executable based on your OS
   
2. Lauching takes you to the homepage where you can input a your system name and PostgreSQL URI for storing logs and tracers.
    1. For the demo, the system name can be anything, but you must input a valid PostgreSQL URI.
    
3. Launching Demo GUI
    1. Fork and Clone the repo
    2. navigate to the website directory in the Demo folder
        ```sh
        
        ```

explain how to start up demo gui
are we having user fork and clone and starting from terminal?

explain frenquecy and time out



<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][react.js]][react-url]
- [![Electron][electron.com]][electron-url]
- [![Node.js][node.com]][node-url]
- [![Express.js][express.com]][express-url]
- [![Webpack][webpack.com]][webpack-url]
- [![Websocket][websocket.com]][websocket-url]
- [![Typescript][typescript.com]][typescript-url]
- [![Chart.js][chartjs.com]][chartjs-url]
- [![PostgresSQL][postgres.dev]][postgres-url]
- [![Tailwindcss][tailwindcss.com]][tailwindcss-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

Make sure you are running version v18.10.0 of node.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Install NPM package into each of your microservices for a given application
   ```sh
   npm install
   ```
2. Clone the repo
   ```sh
   git clone https://github.com/oslabs-beta/MicrObserv.git
   ```
3. Start the application
   ```npm start

   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

1. Input application/system name and PostgreSQL database URI and click ADD

<div align="center">
<img src="./assets/Demo.gif" alt="Logo" width="600" height="450">
</div>

2. Click on the newly created System Name to open up the dashboard

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Add README
- [ ] Add GitHub Merge Tracking.
- [ ] Add Login & Registration.
- [ ] Add Multiple Charts to keep track of different metrics.

See the [open issues](https://github.com/oslabs-beta/MicrObserv/issues?q=is%3Aopen+is%3Aissue) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- Andrew Ngo - [@andrew-tien-ngo](https://www.linkedin.com/in/andrew-tien-ngo/) - andrewngo91@gmail.com
- Chancellor Kupersmith - [@chance-kupersmith](https://www.linkedin.com/in/chance-kupersmith/) - kupersmith3.6@gmail.com
- Otis Jones - [@otis-jones](https://www.linkedin.com/in/andrew-tien-ngo/) - otisjones1@gmail.com
- Vardan Vanyan - [@vardanvanyan](https://www.linkedin.com/in/vardanvanyan/) - vardan.vanyan@gmail.com

- Project Link: [https://github.com/oslabs-beta/MicrObserv](https://github.com/oslabs-beta/MicrObserv)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [OSlabs](https://opensourcelabs.io/)
- [Electron Docs](https://www.electronjs.org/docs/latest)
- [React Docs](https://reactjs.org/docs/getting-started.html)
- [Webpack Docs](https://webpack.js.org/concepts/)
- [Tailwindcss Docs](https://tailwindcss.com/docs/installation)
- [Daisy UI](https://daisyui.com/docs/install/)
- [Express Docs](https://expressjs.com/en/guide/routing.html)
- [PostgresSQL](https://www.postgresql.org/docs/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/oslabs-beta/MicrObserv/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/oslabs-beta/MicrObserv?style=for-the-badge
[forks-url]: https://github.com/oslabs-beta/MicrObserv/network/members
[stars-shield]: https://img.shields.io/github/stars/oslabs-beta/MicrObserv?style=for-the-badge
[stars-url]: https://github.com/oslabs-beta/MicrObserv/stargazers
[issues-shield]: https://img.shields.io/github/issues/oslabs-beta/MicrObserv?style=for-the-badge
[issues-url]: https://github.com/oslabs-beta/MicrObserv/issues
[license-shield]: https://img.shields.io/github/license/oslabs-beta/MicrObserv?style=for-the-badge
[license-url]: https://github.com/oslabs-beta/MicrObserv/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/company/microbserv/
[product-screenshot]: images/screenshot.png
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[postgres.dev]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[postgres-url]: https://www.postgresql.org/
[electron.com]: https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white
[electron-url]: https://www.electronjs.org/
[tailwindcss.com]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwindcss-url]: https://tailwindcss.com/
[node.com]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/en/
[express.com]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[express-url]: https://expressjs.com/
[typescript.com]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[chartjs.com]: https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white
[chartjs-url]: https://www.chartjs.org/
[webpack.com]: https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black
[webpack-url]: https://webpack.js.org/
[websocket.com]: https://img.shields.io/badge/WS-Websocket-2ea44f?style=for-the-badge&logo=appveyor
[websocket-url]: https://webpack.js.org/
