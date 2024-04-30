![applogo](project_logo_no_background.jpg)

# Start whole WEB app Dockerized

Navigate to root of directory MeatBallMadnes, open docker app, then in CLI run `$ docker-compose up --build`

# Start a part of WEB app, i.e. either client subapp or server subapp (non-Dockerized)

Navigate to MeatBallMadness then either client directory or server directory, then in CLI run `$ yarn install;yarn start;`
###### remember this will install nodemodules and add yarn.lock and package.json, OBS! remove these when pushing commits to main branch in this repo because it will conflict when cloning again and starting the whole dockerized app (i.e. you have to inspect and remove added node_modules and lock files that were build when someone just were working on a subapp part of the whole app)


# Indelning av ansvar

#### 📒 Första subpage (food sales) ——> Shayan ・・・・・・・・・・・・・・・・・・・・・・・・・・・・・Status: 95% färdig
- ✅] implementera en Geomap 
- ✅ implementera React Suspense för images som visas i 3 Card Links + HomePage_Link 
- ✅ implementera FallBack Fonts och minimize CSS 
#### 📒 Andra subpage (organic sales) ——> Kevin, Ahmed, Daniel ・・・・・・・・・・・・・・・・・・・Status: % färdig
#### 📒 Tredje subpage (deal made subpage) ——> Lucas, Ali, Dilan och Hassim ・・・・・・・・・・・Status: % färdig
#### 📒 About page ——> Lucas ・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・Status: % färdig

# Implement Checkpoints

### Front-end – client 

- ✅ Byt ansvar för Content1...8  och ersätt ansvaret med Pages1..8 där i pages innehåller en viss konfiguration av Content1...8
- ✅ Fixa klart HTML layout för HomePage 
- ✅ Backend integration of data into diff charts in homepage
- ✅ fixa en Header komponent i general_komponents av content1 komponent i MainPage
- ✅ Light/Darkmode switch button
- ✅  wrap 3 card links i MaingPage inuti en Grid
- ✅  Fixa alignment av alla element oavsett skärmstorlek 700px–4000px ska alltid visa korrekt placering
- ✅  Fixa alignment NavBar dropdowns inspiration Tendmill gör i mobile Device
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

