const express=require('express')
const jwt =require ('jsonwebtoken')
const app= express()
const fs =require ('fs')

let secret= fs.readFileSync('secret.key')

app.listen('7000', ()=>
    console.log("App lesteing on port 7000")
)


app.get('/kh',(req,res)=>{
    res.json({
        khaled:"luu"
    })
}) 

app.post('/creat',verifyToken,(req,res)=>{
    jwt.verify(req.token,secret,(err,data)=>{
        if(err){
            res.sendStatus(403)
        }
        res.json({
            massege:'post careted ...',
            data
        })
    })
   
})

app.post('/login',(req,res)=>{
    let user={
        
      
        id:2,
        userName:'waleed',
        password :'pass55131',
    }

    jwt.sign({user},secret,{expiresIn:'1h'},(err,token)=>{
        if(err){
            res.json({
                massege:"username or password not valid "
            })
        }
        res.json({token})
    }
)
})

function verifyToken(req,res,next){
    //format of token => Authorization: bearer <token>
    const bearerHeader = req.headers['authorization']
    if( typeof bearerHeader !== 'undefined'){

        // split at the space
        const bearer = bearerHeader.split(' ')
        //get token from array
        const token = bearer[1]
        // set the token
        req.token = token
    }else{
        res.sendStatus(403)
    }
    next()
}


