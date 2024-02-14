var express= require("express")
var router= express.Router()
var pool = require("./pool")
var upload = require ("./multer")



router.post('/submit_adv',upload.single('image'), function(req, res, next) {
    try{
      
  
      pool.query('insert into adv (picture)  values(?)',[req.file.filename],function(error,result){
        if(error)
        {
        res.status(200).json({status:false,message:'Database error,pls contact database admin'})
  
        }
        else
        {
          res.status(200).json({status:true,message:'Adv Submitted Successfully'})
        }
  
  
      })
  }
  catch(e)
  {
  
      res.status(200).json({status:false,message:'Server Error....'})
  }
    
  });

  

  






  module.exports=router