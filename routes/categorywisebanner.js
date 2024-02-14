var express= require("express")
var router= express.Router()
var pool = require("./pool")
var upload = require ("./multer")



router.post('/submit_categorywisebanner',upload.single('image'), function(req, res, next) {
    try{
      
  
      pool.query('insert into categorywisebanner (brandid,categoryid,picture)  values(?,?,?)',[req.body.brandid,req.body.categoryid,req.file.filename],function(error,result){
        if(error)
        {
        res.status(200).json({status:false,message:'Database error,pls contact database admin'})
  
        }
        else
        {
          res.status(200).json({status:true,message:'Product Details Submitted Successfully'})
        }
  
  
      })
  }
  catch(e)
  {
  
      res.status(200).json({status:false,message:'Server Error....'})
  }
    
  });

  






  module.exports=router