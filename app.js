const getDb=require('./MongoDb')
const express=require('express');
const app=express();
const Swal = require('sweetalert2')

const bodyParser = require('body-parser');
const { ObjectID } = require('bson');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json());
app.set('view engine','ejs');
async function getData()
{
    let result= await getDb();
    
   
    app.get('/',(req,res)=>{
        res.render('home')

    })
   app.get('/show',(req,res)=>{
    result.find().toArray().then((d)=>{
        console.warn(d)
        var i=1;
        res.render('Employee',{employee:d,no:i});
    });
})
    app.get('/addEmployee',(req,res)=>{
        res.render('New_Employee')
    })
    app.post('/addEmployee',(req,res)=>{
        const value=req.body
        console.log(value)
         result.insertOne(req.body).then((d)=>{
            console.log(d);
            if(d.acknowledged)
            {
                //res.send("Value inserted");
                res.redirect("/show");
            }
           
         })
    //    console.log(data);

    })
    app.get('/edit/:id',async(req,res)=>{
        console.log(req.params.id)
        let value= await result.find({_id:ObjectID(req.params.id)}).toArray();
        console.log(value);
        res.render('Update',{employee:value});
    })
    app.get('/delete/:id',async(req,res)=>{
        console.log(req.params.id)
        var value=await result.deleteOne({_id:ObjectID(req.params.id)})
       if(value.acknowledged)
       {
        res.redirect("/show")
       }
    })
    app.post('/updateEmployee/:id',async(req,res)=>{
        console.log(req.body)

        console.log(req.params.id)
        var value= await result.updateOne({_id:ObjectID(req.params.id)},{$set:{name:req.body.name,age:req.body.age,
            salary:req.body.salary,position:req.body.position,Department:req.body.Department}})
           if(value.acknowledged)
            {
                res.redirect("/show")
            }

    })
    app.get('/search',(req,res)=>{
        res.render('SearchOne');
    })
    app.post('/Search',async(req,res)=>{
        console.warn(req.body)
        var value=await result.find(req.body).toArray(function(err, output){
            if(err) throw err;
            
            res.render('findEmployee',{employee:output})
        });
       
        // if(value.acknowledged)
        // {
        //     res.render('Update',{employee:value})
        // }
    })

}
app.listen(9000);
getData();