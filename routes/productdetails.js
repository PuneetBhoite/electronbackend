var express= require("express")
var router= express.Router()
var pool = require("./pool")
var upload = require ("./multer")




router.post('/submit_product_details',upload.any(), function(req, res, next) {
  try{
    var filenames=req.files.map((file,index)=>file.filename)
    pool.query('insert into productdetails (categoryid,brandid,productid,modelno,color,stock,price,offerprice,status,hsncode,description,picture)  values(?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.categoryid,req.body.brandid,req.body.productid,req.body.modelno,req.body.color,req.body.stock,req.body.price,req.body.offerprice,req.body.status,req.body.hsn,req.body.description,filenames+''],function(error,result){
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



router.post('/fetch_products_by_brand',function(req,res){



    try{
        pool.query("select * from products  where categoryid=? and brandid=? ",[req.body.categoryid ,req.body.brandid],function(error,result){
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



  router.get('/display_all_productdetails',function(req,res){



    try{
        pool.query("select P.*, (select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid = P.brandid) as brandname, (select Pr.productname from products Pr where Pr.productid = P.productid) as productname from productdetails P",function(error,result){
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


  
router.post('/delete_product_details',function(req,res) {

  try{
      pool.query("delete from productdetails where productdetailsid=?",[req.body.productdetailsid],function(error,result){
          if (error)
          {res.status(500).json({status:false,message:"Database Error"})}
          else
          {
              res.status(200).json({status:true,message:"Product Detail Deleted Successfully"})
          }
      })
  }
  
  catch(e)
  {
      res.status(500).json({status:false,message:"Servor Error"})
  }
  
  
  } )



  router.post('/update_product_details_picture', upload.any(), function (req, res, next) {
    try{
        var filenames=req.files.map((file,index)=>file.filename)
        pool.query('update productdetails set picture = ? where productdetailsid = ?', [filenames+'', req.body.productdetailsid], function (error, result) {
            if (error) {
                res.json({ status: false, message: 'Database Error!' })
                console.log(error)
            }
            else {
                res.json({ status: true, message: 'Product Picture updated successfully!' })
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
        console.log(e)
    }
})  


    



module.exports=router