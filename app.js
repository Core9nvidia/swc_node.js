const express = require('express');
const app=express();
const mongoose=require('mongoose');

const url="mongodb+srv://roha:roha@nodetut.hijdw.mongodb.net/myDB?retryWrites=true&w=majority";
const Blog=require('./models/blog');
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true})
    .then((result)=>app.listen(3000))
    .catch((err) => console.log(err));



app.use(express.static('public'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
console.log("roh");
app.get('/',(req,res)=>{
    Blog.find()
        .then((result)=>res.render('home',{blogs:result}))
        .catch((err)=>console.log(err));
});
app.get('/about',(req,res)=>{
    res.render('about');
});
app.get('/contact',(req,res)=>{
    res.render('contact');
});
app.get('/compose',(req,res)=>{
    res.render('compose');
})
app.get('/blog/:id',(req,res)=>{
    const id=req.params.id;
    Blog.findById(id)
        .then((result)=>{
            res.render('details',{blog:result});
        })
        .catch((err)=>console.log(err));
})
app.delete('/blog/:id',(req,res)=>{
    const id=req.params.id;
    Blog.findByIdAndDelete(id)
        .then((data)=>{
            res.json({redirect:'/'});
        })
        .catch((err)=>console.log(err));
})
app.post('/',(req,res)=>{
    const blog=new Blog(req.body);
    blog.save()
        .then((result)=>{
            res.redirect('/');
        })
        .catch((err)=>console.log(err));
});
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });