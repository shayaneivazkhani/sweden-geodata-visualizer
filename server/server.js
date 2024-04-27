const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const duckdb = require("duckdb");
const path = require('path');

const app = express();
const port = 3001;

/* OBS!: Enabled PROXY in client/package.json för av anledningar not yet known but is a better security API pattern tydligen
   
   This setup simplifies your development environment by allowing you to run both frontend and backend servers independently without worrying about cross-origin issues.
   
   It helps avoid CORS (Cross-Origin Resource Sharing) issues during development 
   by allowing your frontend and backend to communicate seamlessly without encountering cross-origin restrictions.
*/

// Allow Fetch requests from http://localhost:3000 för annars fungerar inte data fetch requests i firefox?
app.use(
    cors({
        origin: "http://localhost:3000",
    }),
);

/* 🩸 Shayans exempel —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————*/

/* 🩸 DEL 1 – track performance */

// measure in milli seconds
const logger = (req, res, next) => {
    // This is a middleware that logs all incoming requests.
    // It logs:
    //  - the response status code
    //  - the request method
    //  - the request URL
    //  - the time (in milliseconds) it took for the server to respond

    const t = Date.now();
    next();
    console.log(
        `   backend ––> [${res.statusCode}] ${req.method} ${req.url} (🔸${
            Date.now() - t
        }ms)`,
    );
};
// measure in mikro seconds
const logger2 = (req, res, next) => {
    // This is a middleware that logs all incoming requests.
    // It logs:
    //  - the response status code
    //  - the request method
    //  - the request URL
    //  - the time (in microseconds) it took for the server to respond

    const startTime = process.hrtime();
    next();
    const endTime = process.hrtime(startTime);
    const elapsedTimeInMicroseconds = endTime[0] * 1e6 + endTime[1] / 1e3; // Convert to microseconds
    console.log(
        `   backend ––> [${res.statusCode}] ${req.method} ${req.url} (${elapsedTimeInMicroseconds}µs)`,
    );
};
// Register a custom middleware for logging incoming requests
app.use(logger2);

/* 🩸 DEL 2 – set up server to handle JSON */

/* Middleware to parse JSON bodies — Express doesn't automatically parse POST HTTP body (a string) into a JavaScript object (a JSON).
  The bodyParser.json() middleware does exactly that—it parses the incoming request body as JSON and exposes it on req.body property of the request object.
*/
app.use(bodyParser.json());

/* 🩸 DEL 3 – set up database */

let dbInstance = null; //❗️INCREASE PREFORMANCE❗️ –> fixat Global variable to hold the singleton database instance instead of creating and destroying a connection for every incoming request to server, eftersom en express server är ändå singlethreaded

async function initializeduck() {
    if (!dbInstance) {
        // Check if the singleton instance exists
        const duk = new duckdb.Database("database.db");
        try {
            await duk.connect(); // Connect to the database
            dbInstance = duk; // Store the database instance in the global variable
        } catch (error) {
            console.log("❗️ Connection to database failed: ", error);
            throw error; // Throw the error to indicate connection failure
        }
    }
    return dbInstance; // Return the global database instance
}

/* 🩸 DEL 4... – set up endpoints */

/* ⬇︎ endpoint to get images to be cached in browser optimizing LCP ——————————————————————————————————————————————————————————————————————————————*/

/*
    •  'path': This is the built-in Node.js module path', which provides utilities for working with file
        and directory paths.
    •   __dirname': This is a special variable in Node js that represents the directory name of the
    current module (i.e., the directory in which the current script resides).
    •   'images' : This is a string representing the name of the directory we want to access relative to
        __dirname'. In this case, it's the directory named "images".
*/
// Define the directory where your images are stored
const imagesDirectory = path.join(__dirname, 'images');

// Endpoint to serve .webp image
app.get('/images/:name', (req, res) => {
    const imageName = req.params.name;
    const imagePath = path.join(imagesDirectory, imageName);

    // Set cache control header to allow caching for 1 year
    res.set('Cache-Control', 'max-age=31536000');

    // Set content type for .webp images
    res.type('image/webp');

    // Send the image file
    res.sendFile(imagePath);
});


/* ⬇︎ Other endpoints to get data from DUCK ———————————————————————————————————————————————————————————————————————————————————————————————————————*/

// Endpooint to handle GET requests
app.get("/api/column", async (req, res) => {
    const col_name = req.query.col || "sub_group"; // default value of -1 if 'col' is not provided

    try {
        const db = await initializeduck();
        const query = `SELECT 
                      ${col_name},
                      COUNT(${col_name}) as antal
                   FROM 
                      tendmilldb
                   GROUP BY
                      ${col_name},
                   ORDER BY
                   antal DESC;`;

        db.all(query, function (err, queryres) {
            if (err) {
                throw err;
            }
            // Map query result to include both column value and count
            const sanitizedResult = queryres.map((row) => ({
                [col_name]: row[col_name] ? row[col_name].toString() : "NULL",
                antal: Number(row.antal), // Convert BigInt to number before including it in the response
            }));

            res.json(sanitizedResult);
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            error: "An error occurred while processing your request",
        });
    } finally {
        //db.close();
    }
});

app.get("/api/purchase", async (req, res) => {
    const livsmedel = req.query.livsmedel || "Salt"; // default value of Salt if 'livsmedel' is not provided
    const sub_g = req.query.sub_g || "sub_group"; // default value of -1 if 'col' is not provided
    const which_sub = sub_g === "1" ? "sub_group" : "sub_sub_group";
    try {
        const db = await initializeduck();
        const query = `SELECT
                      constellation_name,
                      ${which_sub} AS group,
                      ROUND(SUM(units), 0) AS totalunits,
                      unit,
                      ROUND(SUM(units) / total.total_units * 100, 4) AS percentage_of_total_units
                    FROM tendmilldb, (SELECT 
                                            SUM(units) AS total_units 
                                      FROM 
                                            tendmilldb
                                      WHERE ${which_sub} LIKE '${livsmedel}') AS total
                    WHERE
                      ${which_sub} LIKE '${livsmedel}'
                    GROUP BY
                      constellation_name,
                      ${which_sub},
                      total_units,
                      unit
                    ORDER BY
                      totalunits DESC;`;

        db.all(query, function (err, queryres) {
            if (err) {
                throw err;
            }

            // Map each row to an object containing all column names and their values
            const sanitizedResult = queryres.map((row) => {
                const rowObject = {};
                for (const [key, value] of Object.entries(row)) {
                    rowObject[key] = value ? value.toString() : "NULL";
                }
                return rowObject;
            });

            res.json(sanitizedResult);
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            error: "An error occurred while processing your request",
        });
    } finally {
        //db.close();
    }
});

app.get("/api/column/main_group", async (req, res) => {
    const col_name = req.query.main_group || "main_group"; // Set a default value or adjust as needed

    try {
        const db = await initializeduck();
        const query = `SELECT 
                      DISTINCT main_group 
                   FROM 
                      tendmilldb
                   ORDER BY
                      main_group;`;

        db.all(query, function (err, queryres) {
            if (err) {
                throw err;
            }
            const sanitizedResult = queryres.map((row) => {
                const value = row[Object.keys(row)[0]]; // Assuming the first column returned by the query is the one you want
                return {
                    [col_name]: value ? value.toString() : "NULL",
                };
            });

            res.json(sanitizedResult);
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            error: "An error occurred while processing your request",
        });
    } finally {
        //db.close();
    }
});

app.get("/api/column/sub_group", async (req, res) => {
    const col_name = req.query.main_group || "XXXXXXX"; // default value of "XXXXXXX" if 'col' is not provided, alltså returnera en empty array
    try {
        const db = await initializeduck();
        const query = `
                SELECT 
                    DISTINCT sub_group 
                FROM 
                    tendmilldb
                WHERE 
                    main_group = '${col_name}'
                ORDER BY
                    sub_group;`;

        db.all(query, function (err, queryres) {
            if (err) {
                throw err;
            }
            const sanitizedResult = queryres.map((row) => ({
                id: row.sub_group ? row.sub_group.toString() : "",
            }));

            res.json(sanitizedResult);
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            error: "An error occurred while processing your request",
        });
    } finally {
        //db.close();
    }
});

app.get("/api/column/sub_sub_group", async (req, res) => {
    const col_name = req.query.main_group || "Glass"; // default value of -1 if 'col' is not provided
    const col_name2 = req.query.sub_group || "Sorbet"; // default value of -1 if 'col' is not provided
    try {
        const db = await initializeduck();
        const query = `
                SELECT 
                    DISTINCT sub_sub_group 
                FROM 
                    tendmilldb
                WHERE 
                    sub_group = '${col_name2}'
                ORDER BY
                    sub_sub_group;`;

        db.all(query, function (err, queryres) {
            if (err) {
                throw err;
            }

            const sanitizedResult = queryres.map((row) => ({
                id: row.sub_sub_group ? row.sub_sub_group.toString() : "",
            }));

            res.json(sanitizedResult);
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            error: "An error occurred while processing your request",
        });
    } finally {
        //db.close();
    }
});

app.get("/api/column/D3Result", async (req, res) => {
    const main_grupp = req.query.main_g || "Köttbullar";
    const sub_grupp = req.query.sub_g || "Kötbullar"; // default value of Salt if 'livsmedel' is not provided
    const which_sub = req.query.sub_g ? "sub_group" : "main_group"; // ifall sub_g is provided then set which_sub to 'sub_group'
    const livsmedel = req.query.sub_g ? sub_grupp : main_grupp; // default value of Salt if 'livsmedel' is not provided

    try {
        const db = await initializeduck();
        /*const query = `SELECT
                             constellation_name || ',  ' || ROUND(SUM(units), 2) || ' ' || GROUP_CONCAT(DISTINCT unit) || '  ${livsmedel}'  AS name,
                              ROUND(SUM(units), 0) AS value,
                              ' ' || ROUND(SUM(units), 0) || ' ' || GROUP_CONCAT(DISTINCT unit) || ' ${livsmedel}' AS x,
                              ROUND(SUM(units), 0) || ' ' || GROUP_CONCAT(DISTINCT unit) AS y,
                              ' ' || ROUND(SUM(units), 0) || 'Produkt ' || ' ${livsmedel}' AS z,
                          FROM tendmilldb, 
                              (SELECT 
                                  SUM(units) AS total_units 
                                FROM 
                                  tendmilldb
                                WHERE ${which_sub} LIKE '${livsmedel}') AS total
                          WHERE
                              ${which_sub} LIKE '${livsmedel}'
                          GROUP BY
                              constellation_name,
                              total_units`;
        */
       const query = `SELECT
                              'Område:  ' || constellation_name AS place,
                               constellation_name AS place2,
                              'Livsmedel: ' || '${livsmedel}' AS name,
                               ROUND(SUM(units), 0) AS value,
                               'Mängd: ' || ROUND(SUM(units), 0) || ' ' || GROUP_CONCAT(DISTINCT unit) AS mengd,
                               'Andel av Sveriges förbrukning: ' || (ROUND(SUM(units) / total.total_units * 100, 4)) || '%'  AS andel_sverige,
                           FROM tendmilldb, 
                               (SELECT 
                                   SUM(units) AS total_units 
                                 FROM 
                                   tendmilldb
                                 WHERE ${which_sub} LIKE '${livsmedel}') AS total
                           WHERE
                               ${which_sub} LIKE '${livsmedel}'
                           GROUP BY
                               constellation_name,
                               total_units`;
                      

        db.all(query, function (err, queryres) {
            if (err) {
                throw err;
            }

            // Map each row to an object containing all column names and their values
            const sanitizedResult = queryres.map((row) => {
                const rowObject = {};
                for (const [key, value] of Object.entries(row)) {
                    rowObject[key] = value ? value.toString() : "NULL";
                }
                return rowObject;
            });

            res.json(sanitizedResult);
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            error: "An error occurred while processing your request",
        });
    } finally {
        //db.close();
    }
});

/*
app.get("/api/column/D3Result", async (req, res) => {
  const livsmedel = req.query.livsmedel || "Salt"; // default value of Salt if 'livsmedel' is not provided
  const which_sub = 'sub_group';
  try {
    const db = await initializeduck();
    const query = `SELECT
                      constellation_name || ' ' || ROUND(SUM(units), 0) || ' ' || GROUP_CONCAT(DISTINCT unit) AS name,
                      ROUND(SUM(units) / total.total_units * 100, 4) * 4 AS value,
                      ROUND(SUM(units) / total.total_units * 100, 4) + 100 AS x,
                      ROUND(SUM(units) / total.total_units * 100, 4) + 100 AS y
                   FROM tendmilldb, 
                      (SELECT 
                          SUM(units) AS total_units 
                        FROM 
                          tendmilldb
                        WHERE ${which_sub} LIKE '${livsmedel}') AS total
                   WHERE
                      ${which_sub} LIKE '${livsmedel}'
                   GROUP BY
                      constellation_name,
                      total_units`;

    db.all(query, function (err, queryres) {
      if (err) {
        throw err;
      }

      // Map each row to an object containing all column names and their values
      const sanitizedResult = queryres.map(row => {
        const rowObject = {};
        for (const [key, value] of Object.entries(row)) {
          rowObject[key] = value ? value.toString() : 'NULL';
        }
        return rowObject;
      });

      res.json(sanitizedResult);
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "An error occurred while processing your request" });
  } finally {
    //db.close();
  }
});
*/

app.get("/api/list/goods", async (req, res) => {
    const livsmedel = req.query.livsmedel || "Salt"; // default value of Salt if 'livsmedel' is not provided
    const sub_g = req.query.sub_g || "-1"; // default value of -1 if 'col' is not provided
    const which_sub = sub_g === "1" ? "sub_group" : "sub_sub_group";
    try {
        const db = await initializeduck();
        const query = `SELECT
                      area,
                      main_group,
                      sub_group,
                      sub_sub_group,
                      name,
                      ROUND(SUM(units), 0) AS totalunits,
                      unit,
                    FROM tendmilldb
                    GROUP BY
                      area,
                      main_group,
                      sub_group,
                      sub_sub_group,
                      name,
                      unit
                    ORDER BY
                      area,
                      main_group,
                      sub_group,
                      sub_sub_group;`;

        db.all(query, function (err, queryres) {
            if (err) {
                throw err;
            }

            // Map each row to an object containing all column names and their values
            const sanitizedResult = queryres.map((row) => {
                const rowObject = {};
                for (const [key, value] of Object.entries(row)) {
                    rowObject[key] = value ? value.toString() : "NULL";
                }
                return rowObject;
            });

            res.json(sanitizedResult);
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            error: "An error occurred while processing your request",
        });
    } finally {
        //db.close();
    }
});

// Endpooint to handle POST requests
app.post("/api/column", async (req, res) => {
    const number = req.body.col || "-1"; // default value of -1 if 'col' is not provided

    try {
        const db = await initializeduck();
        const query = `SELECT ${col_name} FROM tendmilldb;`; // kom på own logic to handle cases that doesnt match column name in table

        db.all(query, function (err, queryres) {
            if (err) {
                throw err;
            }
            const sanitizedResult = queryres.map((row) => {
                const value = row[Object.keys(row)[0]]; // Assuming the first column returned by the query is the one you want
                return {
                    [col_name]: value
                        ? value.toString()
                        : "Column value is undefined",
                };
            });

            res.json(sanitizedResult);
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            error: "An error occurred while processing your request",
        });
    } finally {
        //db.close();
    }
});

/* —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————🩸*/

app.get("/api/companies/meatballsDelivered", async (req, res) => {
    try {
        const db = await initializeduck();
        const query = `
      SELECT producer, brand, sub_sub_group, ROUND(SUM(units)) AS total_units, unit
      FROM tendmilldb
      WHERE sub_sub_group LIKE 'Köttbullar'
      GROUP BY producer, brand, sub_sub_group, unit
      ORDER BY total_units DESC;
    `;

        db.all(query, function (err, queryres) {
            if (err) {
                throw err;
            }

            // Map each row to an object containing all column names and their values
            const sanitizedResult = queryres.map((row) => {
                const rowObject = {};
                for (const [key, value] of Object.entries(row)) {
                    rowObject[key] = value
                        ? value.toString()
                        : "Column value is undefined";
                }
                return rowObject;
            });

            res.json(sanitizedResult);
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            error: "An error occurred while processing your request",
        });
    } finally {
        //db.close();
    }
});

app.get("/api/averageCost/ecoMeatballs", async (req, res) => {
    try {
        const db = await initializeduck();
        const query = `
    SELECT producer, brand, sub_sub_group, ROUND(SUM(cost)) AS totalcost,
    ROUND(SUM(units)) AS totalunits, ROUND(totalcost/totalunits) AS averagecostperunit
    FROM tendmilldb WHERE sub_sub_group LIKE 'Köttbullar' AND
    (name LIKE '%EKO%' OR name LIKE '%eko%' OR name LIKE '%Eko%')
    GROUP BY producer, brand, sub_sub_group
    ORDER BY averagecostperunit DESC;`;

        db.all(query, function (err, queryres) {
            if (err) {
                throw err;
            }

            // Map each row to an object containing all column names and their values
            const sanitizedResult = queryres.map((row) => {
                const rowObject = {};
                for (const [key, value] of Object.entries(row)) {
                    rowObject[key] = value
                        ? value.toString()
                        : "Column value is undefined";
                }
                return rowObject;
            });

            res.json(sanitizedResult);
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            error: "An error occurred while processing your request",
        });
    } finally {
        //db.close();
    }
});

app.get("/api/averageCost/notEcoMeatballs", async (req, res) => {
    try {
        const db = await initializeduck();
        const query = `SELECT producer, brand, sub_sub_group, ROUND(SUM(cost)) AS totalcost,
    ROUND(SUM(units)) AS totalunits, ROUND(totalcost/totalunits) AS averagecostperunit
    FROM tendmilldb WHERE sub_sub_group LIKE 'Köttbullar' AND
    NOT (name LIKE '%EKO%' OR name LIKE '%eko%' OR name LIKE '%Eko%')
    GROUP BY producer, brand, sub_sub_group
    ORDER BY averagecostperunit DESC;`;

        db.all(query, function (err, queryres) {
            if (err) {
                throw err;
            }

            // Map each row to an object containing all column names and their values
            const sanitizedResult = queryres.map((row) => {
                const rowObject = {};
                for (const [key, value] of Object.entries(row)) {
                    rowObject[key] = value
                        ? value.toString()
                        : "Column value is undefined";
                }
                return rowObject;
            });

            res.json(sanitizedResult);
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            error: "An error occurred while processing your request",
        });
    } finally {
        //db.close();
    }
});

//osäker på om den här är rätt, har inte räknat. Orginal fungerade inte (queryn alltså)
app.get("/api/kommun/meatBallsPurchase/ecoNoEco", async (req, res) => {
    try {
        const db = await initializeduck();
        const query = `SELECT
                      a.constellation_name,
                      a.sub_sub_group,
                      ROUND(SUM(a.units)) AS totalunits,
                      ROUND((SUM(CASE WHEN a.name LIKE '%Eko%' OR a.name LIKE '%eko%' THEN a.units ELSE 0 END) / SUM(a.units) * 100), 2) AS percentage_eko,
                      ROUND((SUM(CASE WHEN a.name NOT LIKE '%Eko%' AND a.name NOT LIKE '%eko%' THEN a.units ELSE 0 END) / SUM(a.units) * 100), 2) AS percentage_noneko,
                      ROUND((SUM(a.units) / (SELECT SUM(units) FROM tendmilldb WHERE sub_sub_group LIKE 'Köttbullar') * 100), 2) AS percentage_of_total_units
                  FROM
                      tendmilldb a
                  WHERE
                      a.sub_sub_group LIKE 'Köttbullar'
                  GROUP BY
                      a.constellation_name,
                      a.sub_sub_group
                  ORDER BY
                      totalunits DESC
                  LIMIT 100;`;

        db.all(query, function (err, queryres) {
            if (err) {
                throw err;
            }

            // Map each row to an object containing all column names and their values
            const sanitizedResult = queryres.map((row) => {
                const rowObject = {};
                for (const [key, value] of Object.entries(row)) {
                    rowObject[key] = value
                        ? value.toString()
                        : "Column value is undefined";
                }
                return rowObject;
            });

            res.json(sanitizedResult);
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            error: "An error occurred while processing your request",
        });
    } finally {
        //db.close();
    }
});

/*—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————*/

let counter = 0; // Initialize counter

async function initializedb() {
    const db = new duckdb.Database("database.db");
    try {
        db.connect();
        console.log("Finished");

        return db;
    } catch (error) {
        console.log("failed: ", error);
    }
}

// Endpoint to get message
app.get("/api/message", (req, res) => {
    res.json({ message: "Hello from the backend!", counter });
});

// Endpoint to increment the counter
app.get("/api/incrementCounter", (req, res) => {
    counter++;
    res.json({ counter });
});

// Endpooint to get id from database
app.get("/api/getid_database", async (req, res) => {
    let db;

    try {
        db = await initializedb();

        const query = "SELECT id, FROM tendmilldb;";

        db.all(query, function (err, queryres) {
            if (err) {
                throw err;
            }
            console.log(queryres);

            const sanitizedResult = queryres.map((row) => ({
                id: row.id.toString(),
                //start_date : row.start_date.toString()
            }));

            res.json(sanitizedResult);
        });
    } catch (error) {
        console.log("error: ", error);
    } finally {
        db.close();
        console.log("closed succesfully");
    }
});

/* 🩸 DEL 5... – START THE SERVER —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————*/

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
