const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4; // die Größe des Thread-Pools => Thread-Pool-Größe kann geändert werden

setTimeout(() => console.log("timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1  finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("-----------");

  setTimeout(() => console.log("timer 2 finished"), 0);
  setTimeout(() => console.log("timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("Process.nextTick")); // nexTick Teil der Microtasks-Wareteschlange,die nach jeder Phase ausgeführt wird

  //Verschlüsselungsfunktion namens pbkdf2

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
});

console.log("Hello from the top-level code");

/*
Zuerst wird Top-Level-Code ausgeführt...
 -console.log("Hello from the top-level code");.
 - Zeile 7,8 11 und 12 werden nach belibiger Reihenfolge ausgeführt.
    => Code liegt in im E/A-Zyklus=> nicht im Event-Loop und nicht
        innerhalb einer Callback-Funktion ausgeführt wird.
 - Programm wird sofort beendet
-----------
- Zeile 14,15,16 (Code) befinden sich nun in einer Callback-Funktion 
- Erst wenn der Timer nach 3 s abgelaufen ist, wird Programm beendet.
---Phase in der I/O Callbacks bearbeitet werden,wenn Waretschlange von Callbacks leer ist.
     --> setImmediate erscheint vor setTimeout => in diesem Beispiel gibt es nur
  Timrer und keine I/O Callbacks.
  -Event Loop wartet in der Phase bis ein Timer abgelaufen ist.
  -setImmediate eingeplant-> wird dieser direkt nach der Polling Phase
  ausgeführt -> Event Loop pausiert  in der  Polling Phase
*/
