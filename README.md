# SunTime
Get the current time adjusting so that midday is always when the sun is at it's highest.

Time is calculated from latitude and longitude so that 12:00pm is when the sun is highest in the sky.

Please read the guides for [contributors](.github/CONTRIBUTOR.md) and [maintainers](.github/MAINTAINER.md) using this repository.

Please read the guide for [branches](.github/BRANCHES.md) and how they are used in this repository.

## Deployment
Website demo is available at [sun-time.herokuapp.com](https://sun-time.herokuapp.com/)

## Build
To build the NodeJS package for the library and webiste run the following command:
```
npm install
```
Gitpod is advised to simplify development. Gitpod configuration files are provided in this repository.

## Run
To run the library use the following command:
```
npm start --prefix suntime
```
To run the website use the following command:
```
npm start --prefix suntime-web
```
