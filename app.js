const express=require('express');
const app=express();
const path=require('path');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const port=process.env.PORT||80;
// const uri=process.env.MONGODB_URI;

mongoose.connect('mongodb://localhost:27017/user_info',{useNewUrlParser:true,useUnifiedTopology:true});
let db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('connected successfully');
});

let user_info=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    email:{type:String,required:true}
});

let user=mongoose.model('user_info',user_info);

let user_complaints=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    complain:{type:String,required:true}
});

let complaints=mongoose.model('complaints',user_complaints);

app.use(express.urlencoded());
app.use('/static',express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
});
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
});

app.post('/contact',(req,res)=>{
    let message="success";
    console.log(req.body);

    res.json(message);
})

app.get('/about',(req,res)=>{
    res.status(200).render('about.pug');
});

app.get('/book',(req,res)=>{
    res.render('book.pug');
})

app.get('/login',(req,res)=>{
    res.status(200).render('login.pug');
});
app.post('/login',(req,res)=>
{
    user.findOne(req.body,(err,info)=>{
        if(err)
        {
            res.json(`error in finding item in database ,error info ${err}`);
        }

        else if(!info) 
        {
            console.log('user doesnot exist');
            let message='please enter a valid username and password';
            res.json(message);
        }

        else{
            console.log(info);
            return res.json({ redirect: '/', error: true })
        }
    });

});

app.get('/signup',(req,res)=>{
    res.status(200).render('signup.pug');
});
app.post('/signup',(req,res)=>
{
    try{
        let new_user=new user(req.body);
        new_user.save((err,info)=>{
            
            if(err) 
            {
                if(err.code==11000)
                {
                    let message='username already in use. Please try a different one';
                    res.json(message);
                }
                else res.json("error in saving in the data base")
            }
            else
            {
                console.log(`success in db storing object${info}`);
                res.json({redirect:'/login',error:true})
            }
        });
    }catch(err){
        console.log('error was thrown while storing in the db');
        res.json(err);
    }
});


app.listen(port,()=>{
    console.log(`running the website in http://127.0.0.1:${port}`);
});

