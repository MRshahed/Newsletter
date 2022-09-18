const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.listen(process.env.PORT || 3000, ()=>{
  console.log("Server is running on port 3000");
})

app.get("/", (req, res)=>{
  res.sendFile(__dirname +"/signup.html");
})

app.post("/", (req, res)=>{
  const firstname = req.body.fname;
  const email = req.body.email;
  const lastname = req.body.lname;


const data = {
 
 members:[
    {
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstname,
        LNAME: lastname
      }
    }
  ]
}

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/#";

  const option = {
    method: "POST",
    auth: "shahed:#-us14"
  }

  const request = https.request(url,option,function(response){
      response.on("data", function(data){
        if(response.statusCode === 200)
        {
        res.sendFile(__dirname + "/success.html")
        }
        else{
          res.sendFile(__dirname + "/failure.html")
        }
      })
  })

  request.write(jsonData);
  request.end();
})


