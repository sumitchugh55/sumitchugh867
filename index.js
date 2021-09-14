var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://Localhost:27017/sumit',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

var db=mongoose.connection;

db.on('error',()=>console.log("Error in connecting to Database"));
db.once('open',()=>console.log("connected to database"))

app.post("/sign_up",(req,res)=>{
   var name=req.body.name;
   var email=req.body.email;
   var phone=req.body.name;
   var password=req.body.password;


   var data={
       "name":name,
       "email":email,
       "phone":phone,
       "password":password
   }
   db.collection('forms').insertOne(data,(err,collection)=>{
       if (err){
           throw err;

       }
       console.log("Record inserted succesfuly");

   });


   return res.redirect('index.html')

})



app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html');
}).listen(3060);

console.log("Listening on Port 3060~");