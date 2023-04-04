# MongoDB-Node.js-Express.js

Building a RESTful API and web app.

/////////////////////////

Node.js ist ein Single-Threaded Server bestehend aus den folgenden wichtigen Komponenten:

- Event-Loop, die regelmäßig neue Anfragen an einen Node.js-Server abarbeitet und auf
  Ereignisse reagiert

- mehrere interen Workern, die das Ausführen von blockierenden Ein- und Ausgaben-
  operationen übernehmen. Nicht blockierende Ein- und Ausgabenoperationen werden
  direkt von der Event-Loop bearbeitet

- der Laufzeitumgebung V8, die auch in Google Chrome zum Einsatz kommt

- nativen Modulen, geschrieben in C und C++, die als Wrapper um Funktionalitäten fungieren,
  die mit JavaScript direkt nicht möglich wären

Node.js- Module werden über den Node.js Package Manager(NPM) verwaltet.

Bei Express.js handelt es sich um ein Webframework.

Es lässt sich durch Middleware-Packages modular um zusätzliche Funktionalitäten erweitern.

Über mongodb lässt sich aud die MongoDB-Datenbank (NoSQL-Datnebank) zugreifen, welche die Dokumente
im JSON-Format speichert.
