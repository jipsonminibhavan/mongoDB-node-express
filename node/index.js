const fs = require("fs");
const http = require("http");
const url = require("url");

//////////////////////////////////
//Files

//Blocking,synchronous way
/* const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);
const textOut = `This is a what we know about avocado: ${textIn}.\Created on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut); */
//------------------------------------------------------------------------------------------------
/* In diesem Code wird jede Anweisung nacheineianer abgearbeitet Zeile per Zeile -> synchron
Porblem: Jede Codzeile wartet auf das Ergebnis der vorherigen Zeile..jede Zeile blockiert
die Ausfürhung des restlichen Codes...synchroner Code -> Blockierungscode, 
 weil nur eine bestimmte Operation ausgeführt werden kann, nachdem die vorherige abgeschlossen ist.
 Lösung: asynchronen, nicht blockierenden Code zu verwenden...
 Node basiert auf Callbacks,um darin ein ansynchrones Verhalten zu implementieren.
 Node.js Prozess in dem die Anwendung ausgeführt wird, gibt es nur einen einzigen Thread.Thread ist eine Reihe Anweisung, die
 die im CPU des Computers ausgefürht werden => Single Thread=> für jede Anwendun nur einen Thread.  */

// Non-blocking, asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("ERROR! 💥");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/append.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("Your file has been written 😃");
//       });
//     });
//   });
// });
// console.log("Will readfile!");

////////////////////////////////////////////////
//Server

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //API
  } else if (pathname === "/api") {
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   const productData = JSON.parse(data);
    //   res.writeHead(200, { "Content-type": "application/json" });
    //   res.end(data);
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // NOT FOUND
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hallo Welt!",
    });
    res.end(" <h1>Page not found<h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
