var mysql=require("mysql")
var pool=mysql.createPool({
 host:'electrondb.cx0o80q8sx1l.us-east-1.rds.amazonaws.com',
 port:3306,
 user:'admin',
 password:'1q2w3e4r5t6y',
 database:'electron',
 connectionLimit:100,
 multipleStatements:true
})
module.exports=pool