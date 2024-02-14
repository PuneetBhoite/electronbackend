var express= require("express")
var router= express.Router()
var pool = require("./pool")
var upload = require ("./multer")

router.post('/submit_userdetails', function(req, res, next) {
  try{
    pool.query('insert into userdetails (emailid,mobilenumber,username,address,pincode)  values(?,?,?,?,?)',[req.body.emailid,req.body.mobilenumber,req.body.username,req.body.address,req.body.pincode],function(error,result){
      if(error)
      {
      res.status(200).json({status:false,message:'Database error,pls contact database admin'})

      }
      else
      {
        res.status(200).json({status:true,message:'Details Submitted Successfully'})
      }


    })
}
catch(e)
{

    res.status(200).json({status:false,message:'Server Error....'})
}
  
});

router.post('/check_account', function(req, res, next) {
  try{
    pool.query('select * from userdetails where emailid=? or mobilenumber=? ',[req.body.mobilenumber,req.body.mobilenumber],function(error,result){
      if(error)
      {
      res.status(200).json({status:false,message:'Database error,pls contact database admin'})

      }
      else
      {
        if(result.length==1)
        res.status(200).json({data:result,status:true,message:'User Account Already Exist'})
      else 
      res.status(200).json({data:[],status:false,message:'User Not Found'})
      }


    })
}
catch(e)
{

    res.status(200).json({status:false,message:'Server Error....'})
}
  
});
    
    


module.exports=router