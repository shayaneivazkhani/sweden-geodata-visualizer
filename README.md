# sweden-geodata-visualizer
 a Fullstack Dockerised web application that visualises some form of data (in this case sales pattern of groceries) across different municipalities across Sweden

<p align="center" style="line-height: 2;">
                        <img src="https://img.shields.io/badge/Subpage%201%20Status-99%25-brightgreen?style=for-the-badge"/>
                        <img src="https://img.shields.io/badge/Subpage%202%20Status-0%25-red?style=for-the-badge"/>
                        <img src="https://img.shields.io/badge/Subpage%203%20Status-0%25-red?style=for-the-badge"/>
</p>


![applogo](project_logo_no_background.jpg)

# Start whole WEB app Dockerized

Navigate to root of directory i.e. /App, open docker app, then in CLI run `$ docker-compose up --build`

# Start a part of WEB app, i.e. either client subapp or server subapp (non-Dockerized)

Navigate to /App/server och App/client then either client directory or server directory, then in CLI run `$ yarn install;yarn start;`

###### remember this will install nodemodules and add yarn.lock and package.json, OBS! remove these when pushing commits to main branch in this repo because it will conflict when cloning again and starting the whole dockerized app (i.e. you have to inspect and remove added node_modules and lock files that were build when someone just were working on a subapp part of the whole app)

<p align="center" style="line-height: 2;">
  <a href="https://www.npmjs.com/package/@egjs/flicking" target="_blank"><img src="https://img.shields.io/npm/v/@egjs/flicking.svg?style=flat-square&color=007acc&label=version&logo=NPM" alt="version" /></a>
  <a href="https://www.npmjs.com/package/@egjs/flicking" target="_blank"><img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@egjs/flicking.svg?style=flat-square&label=%F0%9F%92%BE%20gzipped&color=007acc" /></a>
  <a href="https://coveralls.io/github/naver/egjs-flicking?branch=master&style=flat-square" target="_blank"><img alt="Coveralls github" src="https://img.shields.io/coveralls/github/naver/egjs-flicking.svg?style=flat-square&label=%E2%9C%85%20coverage" /></a>
  <a href="https://deepscan.io/dashboard#view=project&tid=3998&pid=5802&bid=46086"><img src="https://flat.badgen.net/deepscan/grade/team/3998/project/5802/branch/46086" alt="DeepScan grade" /></a>
</p>

![AUR Last Modified](https://img.shields.io/aur/last-modified/google-chrome?style=for-the-badge)


## ✨ Features

# Implement Checkpoints

### Front-end – client 

- ✅ Byt ansvar för Content1...8  och ersätt ansvaret med Pages1..8 där i pages innehåller en viss konfiguration av Content1...8
- ✅ Fixa klart HTML layout för HomePage 
- ✅ Backend integration of data into diff charts in homepage
- ✅ fixa en Header komponent i general_komponents av content1 komponent i MainPage
- ✅ Light/Darkmode switch button
- ✅  Fixa alignment av alla element oavsett skärmstorlek 700px–4000px ska alltid visa korrekt placering
- ✅  Fixa alignment NavBar dropdowns 
- [ ] adda en minWidth var i HTML head och assigna till olika sektions av varje Page.js så ingen komponent overflowar
- ✅ justera färgerna och fonterna för hela websidan tills it looks good
- [ ] TABLE Auto Sort Bugg: const headCells column 'units' doesnt get sorted properly unlike column 'andel' in file Table_sticky_column_name_autoSort.js — therefor i have disabled the sorting ability of column 'units' until it gets fixed
- ✅  Measuring Performance & Performance optimization ——> install google Chrom browser —–> open Lighthouse and measure


### Backend – server
- ✅ implementera kompression av data via `gzip`så data kan skickas snabbare till client
- [ ] deploya appen till AWS

---

# Project structure top 3 levels – updated last on 30 januari 2024

```python
.
├── README.md
├── client
│   ├── Dockerfile
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   └── src
├── docker-compose.yml
└── server
    ├── Dockerfile
    ├── database.db
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    └── server.js

6 directories, 12 files
```

---
