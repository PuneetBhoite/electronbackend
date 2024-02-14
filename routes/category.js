var express= require("express")
var router= express.Router()
var pool = require("./pool")
var upload = require ("./multer")


router.post('/submit_category',upload.single('image'), function(req, res, next) {
    try{
      pool.query('insert into category (categoryname,image)  values(?,?)',[req.body.categoryname,req.file.filename],function(error,result){
        if(error)
        {
        res.status(200).json({status:false,message:'Database error,pls contact database admin'})
  
        }
        else
        {
          res.status(200).json({status:true,message:'Category Submitted Successfully'})
        }
  
  
      })
  }
  catch(e)
  {
  
      res.status(200).json({status:false,message:'Server Error....'})
  }
    
  });




router.post('/edit_category_data',function(req,res) {

    try{
        pool.query("update category set categoryname=? where categoryid=? ",[req.body.categoryname,req.body.categoryid],function(error,result){
            if (error)
            {res.status(500).json({status:false,message:"Database Error"})}
            else
            {
                res.status(200).json({status:true,message:"Category Updated Successfully"})
            }
        })
    }
    
    catch(e)
    {
        res.status(500).json({status:false,message:"Servor Error"})
    }
    
    
    } )


    router.post('/edit_category_picture',upload.single("image"),function(req,res) {

        try{
            pool.query("update category set image=? where categoryid=?",[req.file.filename,req.body.categoryid],function(error,result){
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

        router.post('/delete_category',function(req,res) {

            try{
                pool.query("delete from category where categoryid=?",[req.body.categoryid],function(error,result){
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




router.get('/display_all_category',function(req,res){



    try{
        pool.query("SELECT * FROM category",function(error,result){
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


    




