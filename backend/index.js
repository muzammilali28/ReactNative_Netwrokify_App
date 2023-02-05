const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/fyp');
const fs = require('fs');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

var address, inface = os.networkInterfaces();
for (var dev in inface) {
  inface[dev].filter((details)=>{details.family === "IPv4" && details.internal === false ? address = details.address: undefined})
}
console.log("My Machine Address is : ",address)

const API = "http://"+address+":"+PORT;
console.log("The API is : ",API)

fs.writeFile("../frontend/api-configurtaion.json",`{"API_URL" : "${API}"}`,(error)=>{

  if(error){
    console.log("Error Found, Cannot Write to File")
  }

  console.log("Saved")
})

app.use('/fyp',userRoutes);

app.listen(PORT, () => {
  console.log(`Server Listening on PORT : ${PORT}`);
})

