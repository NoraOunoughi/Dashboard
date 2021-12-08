<div id="top"></div>

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
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

DASHBOARD : TEK3 APP DEV.



Deux types de login possibles :

Vous pouvez en effet vous Login en créant un compte sur notre site à l'aide d'un mail, d'un pseudo et d'un mot de passe ou alors, en utlisant votre compte Google via une connexion sécurisée. 
Une fois connecté, vous aurez accès aux fonctionnalités qu'offre notre dashboard, à savoir une selection de widgets dynamiques avec lesquels vous pouvez intéragir. 
Pour cela il vous faudra vous rendre dans l'onglet "Home" du dashboard dans lequel il vous est affiché un bouton create. Il vous suffit ensuite de choisir les services qui vous intéressent et de créer un widget en remplissant les champs de données qui leur sont nécessaires.




Vous disposez des services suivants :



* [Meteo](https://openweathermap.org/)
* [Youtube](https://www.youtube.com/)
* [Spotify](https://www.spotify.com/) (OAuth)
* [Github](https://github.com/)



Nous vous permettons de créer 2 widgets dans chacun de ces services :


Meteo : 

* Choisir une ville et afficher sa temperature en degrés.
* Choisir une ville et afficher son indice UV.


Youtube:

* Choisir une vidéo par titre et pouvoir la regarder
* Choisir une chaine Youtube existante et afficher sa photo de profil ainsi que son nombre d'abonnés.


Github:

* Choisir un utilisateur et afficher son nombre de repos publics, son nombre d'abonnés ainsi que sa photo de profil.
* Choisir un utilisateur et afficher ses 5 derniers repos publics sur lesquels vous pourrez cliquer afin d'y être redirigé.


Spotify: (Connexion nécessaire)


* Choisir un artiste présent sur la plateforme et afficher son nombre de followers.
* Créer une playlist en renseignant son nom et sa description 
Dans l'onglet profil vous aurez accès à vos informations personnelles ainsi qu'a différents boutons de connexion.



Vous pouvez en effet choisir de changer le compte google sur lequel vous êtes connecté, vous déconnecter via google et vous authentifier a Spotify afin de pouvoir accéder à ce service.
Il y a ensuite différents onglets qui vous permettent de voyager dans le dashboard.
Enfin, vous pourrez vous déconnecter du site via le bouton de Logout présent dans la barre principale (il vous déconnectera également de google mais veuillez passer par la bouton de Logout google disponible sur votre profil). 
En ce qui concerne le taux de rafraîchissement de vos widgets, à la création de ces derniers il vous est proposé d'indiquer un temps de rafraîchissement en secondes (attention à ne pas en abuser pour ne pas faire bannir le site des différents services qu'il appel).

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With


* [React.js](https://reactjs.org/)
* [node.js](https://vuejs.org/)
* [HTML](https://developer.mozilla.org/fr/docs/Web/HTML)
* [SCSS](https://sass-lang.com/)
* [docker](https://www.docker.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Project's react APP running on http://localhost:3000/

Project's node running server on http://localhost:8080/

<!-- INSTALLATION -->


### Installation

docker-compose -f docker-compose.yml up --build -d

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

docker-compose up

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Lucas Lindemans - lucas.lindemans@epitech.eu

Nora Ounoughi - Nora.Ounoughi@epitech.eu


Project Link: [https://github.com/EpitechPromo2024/B-DEV-500-PAR-5-1-dashboard-nora.ounoughi)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments


* [AXIOS](https://axios-http.com/docs/intro)
* [Material UI](https://mui.com/)

<p align="right">(<a href="#top">back to top</a>)</p>
