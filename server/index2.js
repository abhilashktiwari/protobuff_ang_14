var express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser');
const Schema = require('./employees_pb');
const port = 3000;
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.get('/', function (request, response) {
//   console.log('GET /');
//   var html = `
//     <html>
//         <body>
//             <form method="post" action="http://localhost:3000">Name:
//                 <input type="text" name="name" />
//                 <input type="submit" value="Submit" />
//             </form>
//         </body>
//     </html>`;
//   response.writeHead(200, { 'Content-Type': 'text/html' });
//   response.end(html);
// });

app.post('/', function (request, response) {
  const hussein = new Schema.Employee();
  hussein.setId(1001);
  hussein.setName('Hussein');
  hussein.setSalary(1001);

  const ahmed = new Schema.Employee();
  ahmed.setId(1002);
  ahmed.setName('Ahmed');
  ahmed.setSalary(9000);

  const rick = new Schema.Employee();
  rick.setId(1003);
  rick.setName('Rick');
  rick.setSalary(5000);

  const employees = new Schema.Employees();
  employees.addEmployees(hussein);
  employees.addEmployees(ahmed);
  employees.addEmployees(rick);
  const bytes = employees.serializeBinary();
  console.log('binary ' + bytes);
  fs.writeFileSync('employeesbinary', bytes);
  const employees2 = Schema.Employees.deserializeBinary(bytes);
  console.log(employees2.toString());
  console.log('POST /');
  console.dir(request.body);
  response.writeHead(200, { 'Content-Type': 'application/x-protobuf' });
  response.end(bytes);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
