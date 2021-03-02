var express=require("express");
var mongoose=require("mongoose");
const bodyParser=require("body-parser");
var {brandModel}=require('./model/gadgetmodel')


app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://shaji:ponnu123@cluster1.u2cuq.mongodb.net/gadgetdb?retryWrites=true&w=majority",{ useNewUrlParser: true },{ useUnifiedTopology: true })


app.post('/brandadd', async(req,res)=>{
    try
    {
        var data= req.body;
       
        var data= new brandModel(req.body);
        var result= await data.save();
        console.log(result);
        res.json(result);
    }
    catch(error){
        res.status(500).send(error)
    }
})

app.get('/viewall', async(req,res)=>{
    try
    {
      var result= await brandModel.find().exec();
      res.json(result)
    }
    catch(error){
        res.status(500).send(error)
    }
})


app.post('/search', async(req,res)=>{
    try
    {
         brandModel.find(req.body, (error, data)=>{
             if (error){throw error}
             else{res.json(data)}
         })
    }
    catch(error){
        res.status(500).send(error)
    }
})

app.post('/delete', async(req,res)=>{
    try
    {
       brandModel.findByIdAndDelete(req.body.id, (error,data)=>{
           if(error){throw  error}
           else{res.json({'status':'Success'})};
       }) 
    }
    catch(error){
        res.status(500).send(error)
    }
})

app.post('/update', async(req,res)=>{
    try
     {
        brandModel.findByIdAndUpdate(req.body.id,
            { brand:req.body.Brand,modelname:req.body.ModelName,
            sellingprice:req.body.Sellingprice,mrp:req.body.MRP},
                (error,data)=>{
                    if(error){throw error}
                    else{res.json({'status':'Success'})};
                });
     } 
    catch(error){
        res.status(500).send(error)
    }
})



app.listen(process.env.PORT || 3000,function(){
    console.log("Server working fine!!!")
})