var express= require("express")
var router= express.Router()
var pool = require("./pool")
var upload = require ("./multer")



router.post('/submit_brand',upload.single('logo'), function(req, res, next) {
    try{
      pool.query('insert into brands (categoryid, brandname, logo)  values(?,?,?)',[req.body.categoryid,req.body.brandname,req.file.filename],function(error,result){
        if(error)
        {
        res.status(200).json({status:false,message:'Database error,pls contact database admin'})
  
        }
        else
        {
          res.status(200).json({status:true,message:'Brand Submitted Successfully'})
        }
  
  
      })
  }
  catch(e)
  {
  
      res.status(200).json({status:false,message:'Server Error....'})
  }
    
  });


router.get('/display_all_brand',function(req,res){



    try{
        pool.query("select B.*,(select C.categoryname from category C where C.categoryid=B.categoryid) as categoryname from brands B",function(error,result){
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


router.post('/delete_brand',function(req,res) {

  try{
      pool.query("delete from brands where brandid=?",[req.body.brandid],function(error,result){
          if (error)
          {res.status(500).json({status:false,message:"Database Error"})}
          else
          {
              res.status(200).json({status:true,message:"Category Deleted Successfully"})
          }
      })
  }
  
  catch(e)
  {
      res.status(500).json({status:false,message:"Servor Error"})
  }
  
  
  } )


  router.post('/edit_brand_logo',upload.single("logo"),function(req,res) {

    try{
        pool.query("update brands set logo=? where brandid=?",[req.file.filename,req.body.brandid],function(error,result){
            if (error)
            {res.status(500).json({status:false,message:"Database Error"})}
            else
            {
                res.status(200).json({status:true,message:"Image updated successfully"})
            }
        })
    }
    
    catch(e)
    {
        res.status(500).json({status:false,message:"Servor Error"})
    }
    
    
    } )

    router.post('/edit_brand_data',function(req,res) {

        try{
            pool.query("update brands set brandname=?, categoryid=? where brandid=? ",[req.body.brandname,req.body.categoryid,req.body.brandid],function(error,result){
                if (error)
                {res.status(500).json({status:false,message:"Database Error"})}
                else
                {
                    res.status(200).json({status:true,message:"Brand Updated Successfully"})
                }
            })
        }
        
        catch(e)
        {
            res.status(500).json({status:false,message:"Servor Error"})
        }
        
        
        } )
    





  module.exports=router
