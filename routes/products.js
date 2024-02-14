var express= require("express")
var router= express.Router()
var pool = require("./pool")
var upload = require ("./multer")



router.post('/submit_product',upload.single('picture'), function(req, res, next) {
  try{
    pool.query('insert into products (categoryid,brandid,productname,picture)  values(?,?,?,?)',[req.body.categoryid,req.body.brandid,req.body.productname,req.file.filename],function(error,result){
      if(error)
      {
      res.status(200).json({status:false,message:'Database error,pls contact database admin'})

      }
      else
      {
        res.status(200).json({status:true,message:'Product Submitted Successfully'})
      }


    })
}
catch(e)
{

    res.status(200).json({status:false,message:'Server Error....'})
}
  
});


router.post('/fetch_brands_by_category',function(req,res){



  try{
      pool.query("select B.*,(select C.categoryname from category C where C.categoryid= B.categoryid) as categoryname from brands B where B.categoryid=?",[req.body.categoryid],function(error,result){
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


router.get('/display_all_product',function(req,res){



  try{
      pool.query("select products.*,category.categoryname,brands.brandname from products,category,brands where products.categoryid=category.categoryid and products.brandid=brands.brandid",function(error,result){
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

router.post('/delete_product',function(req,res) {

  try{
      pool.query("delete from products where productid=?",[req.body.productid],function(error,result){
          if (error)
          {res.status(500).json({status:false,message:"Database Error"})}
          else
          {
              res.status(200).json({status:true,message:"Product Deleted Successfully"})
          }
      })
  }
  
  catch(e)
  {
      res.status(500).json({status:false,message:"Servor Error"})
  }
  
  
  } )


  router.post('/edit_product_picture',upload.single("picture"),function(req,res) {

    try{
        pool.query("update products set picture=? where productid=?",[req.file.filename,req.body.productid],function(error,result){
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


    router.post('/edit_product_data',function(req,res) {

        try{
            pool.query("update products set productname=?,categoryid=? where productid=? ",[req.body.productname,req.body.categoryid,req.body.productid],function(error,result){
                if (error)
                {res.status(500).json({status:false,message:"Database Error"})}
                else
                {
                    res.status(200).json({status:true,message:"Product Updated Successfully"})
                }
            })
        }
        
        catch(e)
        {
            res.status(500).json({status:false,message:"Servor Error"})
        }
        
        
        } )





















module.exports=router