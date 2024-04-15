![applogo](project_logo_no_background.jpg)

# Start whole WEB app Dockerized

Navigate to root of directory MeatBallMadnes, open docker app, then in CLI run `$ docker-compose up --build`

# Start a part of WEB app, i.e. either client subapp or server subapp (non-Dockerized)

Navigate to MeatBallMadness then either client directory or server directory, then in CLI run `$ yarn install;yarn start;`
###### remember this will install nodemodules and add yarn.lock and package.json, OBS! remove these when pushing commits to main branch in this repo because it will conflict when cloning again and starting the whole dockerized app (i.e. you have to inspect and remove added node_modules and lock files that were build when someone just were working on a subapp part of the whole app)


# Implement Checkpoints



### Front-end – client 

## About page – Lucas
## Första subpage (food sales) Shayan
## Andra subpage (organic sales) – Kevin, Ahmed, Daniel
## Tredje subpage (deal made subpage) — Lucas, Ali, Dilan och Hassim

- ✅ Byt ansvar för Content1...8  och ersätt ansvaret med Pages1..8 där i pages innehåller en viss konfiguration av Content1...8
- ✅  Fixa klart HTML layout för HomePage 
- ✅  Backend integration of data into diff charts in homepage
- [ ]  TABLE Auto Sort Bugg: const headCells column 'units' doesnt get sorted properly unlike column 'andel' in file Table_sticky_column_name_autoSort.js — therefor i have disabled the sorting ability of column 'units' until it gets fixed
- [ ] Fixa klart HTML & CSS för 3 subpage statistik sidorna in subpages
- [ ] Backend integration of data into diff charts in subpages
- ✅ Light/Darkmode switch button
- [ ] Fixa alignment av alla element oavsett skärmstorlek 700px–4000px ska alltid visa korrekt placering
- [ ] justera färgerna och fonterna för hela websidan tills it looks good
- [ ] Measuring Performance
- [ ] Performance optimization


### Backend – server
- [ ] …

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

