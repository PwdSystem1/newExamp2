    const express=require('express');
    const cors = require('cors');
    //const moment=require('moment');
    const app=express();
    app.use(cors());
    const path=require('path');
    const mysql=require('mysql2');
    // const {connect}=require('http2');
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));

    const PORT=process.env.PORT || 7000;

    const pool=mysql.createPool({
        host: 'sql.freedb.tech',
        user: 'u_f32XC2',
        password: 'TFRnH9axRtnt',
        database: 'freedb_LzdJ2It0',
        connectionLimit: 10,
        waitForConnections: true,
        queueLimit: 0,


    })

    //report
    app.get('/api/studinfo', (req,res)=>{
        pool.query("SELECT * FROM studinfo", (err, rows, fields)=>{
            if (err) throw err;
            res.json(rows);
        })
    })

    //GET
    app.get("/api/studinfo/:id", (req,res) => {
        const id = req.params.id;
        pool.query("SELECT * FROM studinfo WHERE id=?",[id], (err, rows, fields) => {
            if (err) throw err;
            if(rows.length > 0){
                res.json(rows);
            }else{
                res.status(400).json({msg: `${id} id not found!`});
           }
        }       
    );
});


    //Create
    app.post('/api/studinfo',(req,res)=>{
        const studId=req.body.studId;
        const fullname=req.body.fullname;
        const course=req.body.course;
        const year_level=req.body.year_level;
        const email=req.body.email;
        const contact=req.body.contact;
      

       pool.query(`INSERT INTO studinfo(stud_id,full_name,course,year,email,contact) VALUES('${studId}','${fullname}','${course}','${year_level}','${email}','${contact}')`,(err,rows,fields)=>{
            if(err) throw err
            res.json({msg: 'Data Inserted Succesfully'});
        })

    })

    //update2
    app.put("/api/studinfo", (req,res)=>{
       
        const studId=req.body.studId;
        const fullname=req.body.fullname;
        const course=req.body.course;
        const year_level=req.body.year_level;
        const email=req.body.email;
        const contact=req.body.contact;
        const id=req.body.id;
        
        pool.query("UPDATE studinfo SET stud_id = ?,full_name = ?,course = ?,year = ?,email = ?,contact = ? WHERE id = ?",[studId,fullname,course,year_level,email,,contact,id],
        (err,rows,fields)=>{
            if(err) throw err;
            res.json({msg: 'Data Updated Succesfully'});
    })
})

    //delete
    app.delete("/api/studinfo/",(req,res)=>{
        const id = req.body.id;
        pool.query("DELETE FROM studinfo WHERE id = ?",
           [id],
            (err,rows,fields)=>{
            if(err) throw err;
            res.json({msg: 'Data Deleted Succesfully'});
        })
    })


    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })

