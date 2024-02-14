var express= require("express")
var router= express.Router()
var pool = require("./pool")
var upload = require ("./multer")


router.post('/check_admin_login',function(req,res){

pool.query('select * from admins where (emailid=? or mobileno=?) and password=?',[req.body.emailid,req.body.emailid,req.body.password],function(error,result){

if(error)
{res.status(200).json({message:'Database Error',status:false})}
else
{
    if(result.length==1){
    res.status(200).json({message:'success',status:true,data:result[0]})}
else {
res.status(200).json({message:"Invalid",status:false})}
}
})


})

router.post('/display_admins',function(req,res){



    try{
        pool.query("select * from admins ",function(error,result){
            if (error)
            {res.status(500).json({status:false,message:"Database Error"})}
            else
            {
                res.status(200).json({data:result,status:true,message:"Success"})
            }
        })
    }
    
    catch(e)
    {
        res.status(500).json({status:false,message:"Servor Error"})
    }

})












module.exports=router