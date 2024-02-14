var express= require("express")
var router= express.Router()
var pool = require("./pool")
var upload = require ("./multer")


router.get('/fetch_all_banners',function(req,res){



    try{
        pool.query("SELECT * FROM banners",function(error,result){
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


  
router.get('/fetch_all_adv',function(req,res){



    try{
        pool.query("SELECT * FROM adv",function(error,result){
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


router.get('/display_all_brand',function(req,res){



    try{
        pool.query("select B.*,(select C.categoryname from category C where C.categoryid=B.categoryid) as categoryname from brands B group by B.brandname",function(error,result){
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


router.post('/display_all_productdetails_by_status',function(req,res){



    try{
        pool.query("select P.*, (select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid = P.brandid) as brandname, (select Pr.productname from products Pr where Pr.productid = P.productid) as productname,(select Pr.picture from products Pr where Pr.productid = P.productid) as productpicture from productdetails P where P.status=?",[req.body.status],function(error,result){
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


  
  router.post('/display_all_productdetails',function(req,res){



    try{
        pool.query("select P.*, (select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid = P.brandid) as brandname, (select Pr.productname from products Pr where Pr.productid = P.productid) as productname,(select Pr.picture from products Pr where Pr.productid = P.productid) as productpicture from productdetails P",function(error,result){
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


  
router.post('/display_all_productdetails_by_productid',function(req,res){



    try{
        pool.query("select P.*, (select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid = P.brandid) as brandname, (select Pr.productname from products Pr where Pr.productid = P.productid) as productname,(select Pr.picture from products Pr where Pr.productid = P.productid) as productpicture from productdetails P where P.productid=?",[req.body.productid],function(error,result){
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



   
router.post('/display_productdetails_by_id',function(req,res){



    try{
        pool.query("select P.*, (select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid = P.brandid) as brandname, (select Pr.productname from products Pr where Pr.productid = P.productid) as productname,(select Pr.picture from products Pr where Pr.productid = P.productid) as productpicture from productdetails P where P.productdetailsid=?",[req.body.productdetailsid],function(error,result){
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
  

  router.post('/display_all_productdetails_by_categoryid',function(req,res){



    try{
        pool.query("select P.*, (select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid = P.brandid) as brandname, (select Pr.productname from products Pr where Pr.productid = P.productid) as productname,(select Pr.picture from products Pr where Pr.productid = P.productid) as productpicture from productdetails P where P.categoryid=?",[req.body.categoryid],function(error,result){
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

  router.post('/display_all_productdetails_by_brandid',function(req,res){



    try{
        pool.query("select P.*, (select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid = P.brandid) as brandname, (select Pr.productname from products Pr where Pr.productid = P.productid) as productname,(select Pr.picture from products Pr where Pr.productid = P.productid) as productpicture from productdetails P where P.brandid=?",[req.body.brandid],function(error,result){
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

  
  router.post('/order_submit',function(req,res){



    try{
        var q="insert into orders(orderdate, productdetailsid, qty, paymentstatus, deliverystatus, mobileno, emailid,username, address) values ?"
        pool.query(q,[req.body.cart.map((item)=>{
            return([new Date(),item.productdetailsid,item.qty,req.body.paymentstatus,'undelivered',req.body.user.mobilenumber,req.body.user.emailid,req.body.user.username,req.body.user.address])
        }),],function(error,result){
            if (error)
            { console.log(error)
                res.status(500).json({status:false,message:"Database Error"})}
            else
            { console.log(result)
                res.status(200).json({status:true,message:"Order Submitted"})
            }
        })
    }
    
    catch(e)
    {
        res.status(500).json({status:false,message:"Servor Error"})
    }
  
  })
  router.post('/product_filter',function(req,res){



    try{
        var q=`select P.productname,P.picture as mainpicture,PD.*,B.* from productdetails PD,products P,brands B where B.categoryid=P.categoryid and B.categoryid=PD.categoryid and PD.productid=P.productid and PD.modelno like "%${req.body.text}%" or P.productname like "%${req.body.text}%" or B.brandname like "%${req.body.text}%" `
        pool.query(q,function(error,result){
            if (error)
            { console.log(error)
                res.status(500).json({status:false,message:"Database Error"})}
            else
            { console.log(result)
                res.status(200).json({status:true,message:"Order Submitted"})
            }
        })
    }
    
    catch(e)
    {
        res.status(500).json({status:false,message:"Servor Error"})
    }
  
  })

  
  module.exports=router