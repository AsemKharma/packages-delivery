const express=require("express");
const path=require("path");
const nunjucks=require("nunjucks");
const app=express();
const cookieParser=require('cookie-parser');
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));

app.set("view engine", "html")


app.use(cookieParser())
app.use(express.urlencoded({extended:false}));

const mymodule=require('./database_dealer.js');
const { resolve } = require("path");
const { sign } = require("crypto");
app.use(express.json());
app.listen(3000);



nunjucks.configure(path.resolve(__dirname,'views'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true

});
let temp
let p;


app.get('/',(req,res) =>{

    res.render('index.html');
    
})



app.post('/sign-up',async(req,res) =>{
    let x=req.body
    let cond=true;
             //   mymodule.addCustomer(x.username,x.phone,x.password,x.email);

    p =new Promise((resolve) => {
       cond= mymodule.checkemail(x.email)

        resolve(cond)

           });
           
           p.then((mes) =>{
            if(mes){
                
                mymodule.addCustomer(x.username,x.phone,x.password,x.email);
       //         res.render('sign-in.html');
       res.redirect('/sign-in')

            }
            else{
                res.redirect('/sign-up')
            }
        })    
})


app.get('/sign-up',(req,res) =>{

    
 
    res.render('sign-up.html');
    
    
    })

    app.post('/sign-in',(req,res) =>{
                
        let x=req.body;
         console.log(x);  

         p = new Promise((resolve)=>{
          let  rowss = mymodule.checkpassword(x.email,x.password);
       resolve(rowss);
       });
         p.then((message)=>{



            if(message==0){res.redirect('/sign-in')
                                           }
             if(message==1){ 

                 p1 = new Promise((resolve)=>{
                 rowss = mymodule.getinfo('Customer',x.email);
  
                  resolve(rowss);
                                        }); 
                 p1.then((message)=>{ 
                console.log("then entered! ")
                 console.log(message)
                 res.cookie('Customer_ID',message.CustomerID); 
                 console.log(message.CustomerID)
                 res.cookie('type','Customer');
     
                res.cookie('Name',message.Name);
               console.log(message.Name)
              res.cookie('password',message.password);
              res.cookie('email',x.email); 
              res.cookie('phone',message.Number)
      
             res.redirect('/C_home');
           });
               }
     if(message==2){

           p1 = new Promise((resolve)=>{
                rowss = mymodule.getinfo('Employee',x.email);
                resolve(rowss);
               });
            p1.then((message)=>{
            console.log(message)

             res.cookie('Emp_ID',message.ID);
            res.cookie('type','employee');
           res.cookie('Name',message.Name);
            res.cookie('password',message.password);
            res.cookie('email',x.email);
           res.cookie('phone',x.Number)
             res.redirect('/E_home');

                           });  


        }//msg = 2 




});
})

app.get('/sign-in',(req,res) =>{

    res.render('sign-in.html');
    
    })


app.get('/contactus',(req,res) =>{


res.render('contactus.html');


})






app.get('/C_home',(req,res)=>{
    console.log(req.cookies);
    res.render('Costumer-Log-in.html',{name:req.cookies.Name});
});





app.get('/costumer_logout',(req,res)=>{
    res.clearCookie('Name');
    res.clearCookie('password');
    res.clearCookie('Customer_ID');
    res.clearCookie('type');
    res.clearCookie('email');
    res.clearCookie('phone');
    res.clearCookie('Emp_ID');
    res.redirect('/')
})


app.post('/Cadd_package',async (req,res)=> {
    console.log(''+new Date().toISOString().slice(0, 10))
    data= req.body
   
    console.log(req.cookies);
    rows= [data.source,'In transit',data.weight,data.heigh,data.length,data.width,''+new Date().toISOString().slice(0, 10),data.category,data.destination,''+new Date().toISOString().slice(0, 10)];
  await mymodule.add('Package',['Location','Status','Weight','Height','Length','Width','sendDate','Category','Destination','lastEdited'],rows)
    mymodule.getPKGID().then(async res => {r=await res[0] ;
        await mymodule.add('Send',['PackageNum','SendID','ReceiveID'],[r['MAX(PackageNum)'],req.cookies.Customer_ID,data.RecEmail])
         
        })
  
} )



app.post('Track-Shipment',(req,res)=>{
    data = req.body; 
    costumer = req.cookies.Customer_ID
    console.log(data)
  //  mymodule.Track() ;
})



    app.get('/Payment',(req,res)=>{
        res.render('Payment.html')
    }) 
    
    
    app.get('/Track-Package',(req,res)=>{
            res.render('Track-Package-.html',{name:req.cookies.Name});
    })
    
    
    app.get('/Send-Pack',(req,res)=>{
        res.render('Send-Package.html');
    })
    
    
    app.get('/Recieve-Pack',(req,res)=>{
       // res.render() waiting for that page 
    })
    
    
    app.get('/Update-Personal-Information',(req,res)=>{
        res.render('Update-Personal-Information.html',{name:req.cookies.Name,email:req.cookies.email,phone:req.cookies.phone,pass:req.cookies.password
                                                        })
    })







    app.get('/Send-Pack',(req,res)=>{
        res.render('Send-Package.html');
    })
    
    
    
    //-----------------------
    
    app.get('/Update-Personal-Information',(req,res)=>{
        res.render('Update-Personal-Information.html',{name:req.cookies.Name,email:req.cookies.email,phone:req.cookies.phone,pass:req.cookies.password
                                                        })
    })



    app.get('/Payment',(req,res)=>{
        res.render('Payment.html')
    }) 
    
    //-----------------------------
app.post('/Costumer-Track/:pkgnum',(req,res)=>{
    let x=req.params.pkgnum;

    let pkg
    let BeenTo
    
    mymodule.getGenInfo('Package','PackageNum',x).then(message=>  pkg=message ).then(message=>mymodule.GetBeenTo('BeenTo','PackageNum',x) ).then(ress =>res.send({package:pkg,beento:ress}))
    


})
app.post('/CRecive',(req,res)=>{
    let pkgN = req.body.pkg 
    console.log(pkgN)
    mymodule.updateStatus(pkgN)
})

app.get('/CRecieve-Pack',(req,res)=>{
    let id = req.cookies.Customer_ID 
    mymodule.getNRecieved(id).then(ress =>{
        res.render('Recieve-Pack.html',{list:ress.filter(function (e) { return e })})
    })
    
})
app.get('/MyPack',(req,res)=>{
    let id = req.cookies.Customer_ID 
    mymodule.getCostPacks(id).then(ress =>{
        res.render('My-Packages.html',{list:ress.filter(function (e) { return e })})
    })

})
app.post('/Edit-Personal',(req,res)=>{
    console.log(req.cookies.Customer_ID)
    console.log(req.body)
    rows = [req.body.name , req.body.phone , req.body.password , req.body.email]
  // console.log(rows)
    mymodule.updateCustomer(req.cookies.Customer_ID,rows)
    

  
})
app.post('/Paid',(req,res)=>{
    pkg = req.body.PackageNum
    console.log(pkg+"   :   ")
    mymodule.setPaid(pkg)
    res.send('/C_home');
})
app.get('/Pay/:pkg',(req,res)=>{
    res.render('Payment_Confirmation.html');
}) 
app.post('/ListPayment',(req,res)=>{
    console.log(" id: "+req.cookies.Customer_ID )
    let id = req.cookies.Customer_ID 
   
    mymodule.getNotPiad(id).then(ress=> {
        res.send(ress)
    })
})
app.post('/PaymentReport',(req,res)=>{
    p=new Promise((resolve)=>{
        rows= mymodule.getPaid() 
        resolve(rows)
    })
    p.then((msg)=>{
        res.send(msg.filter(function (e) { return e }))
    })
})











































    app.get('/AdminAddPackage',(req,res) =>{


        res.render('Add-Package(Adminstrator).html');
        
        
        })

    app.post('/Eadd_package',async (req,res)=> {
        console.log(''+new Date().toISOString().slice(0, 10))
        data= req.body
       
        console.log(req.cookies);
        rows= [data.source,'In transit',data.weight,data.heigh,data.length,data.width,''+new Date().toISOString().slice(0, 10),data.category,data.destination,''+new Date().toISOString().slice(0, 10)];
      await mymodule.add('Package',['Location','Status','Weight','Height','Length','Width','sendDate','Category','Destination','lastEdited'],rows)
        mymodule.getPKGID().then(async res => {r=await res[0] ;
            await mymodule.add('Send',['PackageNum','SendID','ReceiveID'],[r['MAX(PackageNum)'],data.Customerid,data.RecEmail])
             
            })
    } )




app.get('/Admin_Trace_package',(req,res) =>{

       
    res.render('Admin-Track-Package-.html',{name:req.cookies.Name});
    
    
    })
app.post('/Admin_Trace_package/:pkgnum',(req,res)=>{

let x=req.params.pkgnum;

let pkg
let BeenTo

mymodule.getGenInfo('Package','PackageNum',x).then(message=>  pkg=message ).then(message=>mymodule.GetBeenTo('BeenTo','PackageNum',x) ).then(ress =>res.send({package:pkg,beento:ress}))

})





app.get('/E_home',(req,res) =>{ 


    
    res.render('Adminstrator.html',{name:req.cookies.Name})
     })






 app.get('/AdminEditUser',(req,res) =>{

    res.render('AdminUpdate-Personal-Information.html',{name:req.cookies.Name});
        
        
 })

 app.post('/AdminEditUser',(req,res) =>{
    let x =req.body;



    mymodule.update('Customer','email',x.email,'Name',x.Name)
    .then(res => mymodule.update('Customer','email',x.email,'Number',x.Number))
    .then(res => mymodule.update('Customer','email',x.email,'password',x.password))

    .then(res.redirect('/E_home'))

 })

   
 app.post('/AdmingetUser/:email',(req,res) =>{
   let x=req.params
    p = new Promise((resolve)=>{
   let   rowss =  mymodule.getinfo('Customer',x.email);
     resolve(rowss);
});
 p.then((message)=>{
if(message==undefined) {res.send(
    {
        CustomerID: 0,
        Name: '',
        Number: '',
        password: '',
        email: ''
      })}
   else{     res.send(message);}

});

 

 
        
 })

 app.post('/AdminEDeletUser/:email',(req,res) =>{
    console.log('deleted')
mymodule.remove('Customer','email',req.params.email)        
 })

app.get('/Admin-AddEmployee',(req,res) =>{
    res.render('AddEmployee.html')
      
 })

 app.post('/Admin-AddEmployee',(req,res) =>{
    x=req.body;
    console.log(x)
    mymodule.getinfo('Employee',x.email).then(ress =>{
        if (typeof(ress)!= "undefined")res.redirect('/E_home');
        else{
            mymodule.add('Employee',['Name','JobType','password','email','City'],[x.username,x.JobType,x.password,x.email,x.City]);
         res.redirect('/E_home');
        }
    } )

      
 })

 app.get('/Admin_report',(req,res)=>{


 res.render('AdminRepoorts.html')
 })



app.post('/Adminreportfirstsearch',(req,res)=>{

 p = new Promise((resolve)=>{
    rowss =  mymodule.betweenDatestrans(req.body.from,req.body.to);
     resolve(rowss);
 });
 p.then((message)=>{
    res.send(message)
 });


})


app.post('/Adminreportsecondsearch',(req,res)=>{
    console.log(req.body)
    
     p = new Promise((resolve)=>{
        rowss =  mymodule.pickerCategory(req.body.from,req.body.to);
         resolve(rowss);
     });
     p.then((message)=>{
        console.log(message)
        res.send(message)
     });
    
    
    })


    app.post('/Adminreportthirdsearch',(req,res)=>{
console.log(req.body)


p = new Promise((resolve)=>{
    rowss =  mymodule.retrieve('Package',['Category','Location','Status'],[req.body.Category,req.body.Location,req.body.Status]);
    resolve(rowss);
});
p.then((message)=>{
    res.send(message)

});

    })




app.get('/AdminRemoveEdit',(req,res) =>{
mymodule.getAllpkgs().then(ress => {res.render('Admin-Removeeditpackages.html',{list:ress});})

    
        
        
    })


app.post('/Adminpkgsinfo',(req,res) =>{
   // console.log(req.body)
let rows2;
//{ package:ress[0],send:ress2[0]}
    mymodule.retrieve('Package',['PackageNum'],[req.body.number]).then(ress=>{
        
        
        mymodule.retrieve('Send',['PackageNum'],[req.body.number]).then(ress2 =>(rows2=ress2)).then(resssss =>res.send({ package:ress[0],send:rows2[0]}))

    }
  
)
         
         })

app.post('/AdmindeletePKG',(req,res) =>{
    mymodule.remove('Package',['PackageNum'],[req.body.id])
    mymodule.remove('Send',['PackageNum'],[req.body.id])
    mymodule.remove('Send',['PackageNum'],[req.body.id])
    mymodule.remove('BeenTo',['PackageNum'],[req.body.id])

})

app.post('/AdminUpdatePKG',(req,res) =>{
console.log(req.body)
let current=['Riyadh Werehouse','Riyadh Truck','Riyadh Plane','Riyadh Airport','Jeddah Werehouse','Jeddah Truck','Jeddah Plane','Jeddah Airport', 'Dammam Werehouse','Dammam Truck','Dammam Plane','Dammam Airport'].indexOf(req.body.currentlocation)
let ids=[4,10,7,2,5,11,8,3,6,12,9,1]
let finnum=ids[current]
console.log(finnum)

    mymodule.update('Package', 'PackageNum',req.body.id, 'Weight', req.body.weight ).then(res =>
        mymodule.update('Package', 'PackageNum',req.body.id, 'Height', req.body.height )).then(res =>
         mymodule.update('Package', 'PackageNum',req.body.id, '"'+'Lenght'+'"', req.body.Length )).then(res =>
             mymodule.update('Package' , 'PackageNum',req.body.id, 'Location', req.body.currentlocation)).then(res => 
                mymodule.update('Package' , 'PackageNum',req.body.id, 'Status', req.body.status)).then(res =>    
                    mymodule.update('Package', 'PackageNum',req.body.id, 'Category', req.body.category )).then(res =>



                        mymodule.UpdatePack( req.body.id, '"'+'ReceiveID'+'"',req.body.recemail)).then(res=>



                            mymodule.update('Package', 'PackageNum',req.body.id, 'lastEdited', new Date().toISOString().slice(0, 10))).then(res=>
                                mymodule.add('BeenTo',['ID','PackageNum','Date'],[''+finnum,req.body.id, new Date().toISOString().slice(0, 10)]))
    

})



app.post('/AdminreportFourthSearch',(req,res)=>{
    let id = req.body ; 
    id = id.Cid
    p = new Promise((resolve)=>{
        rowss =  mymodule.send_recieved(id);
         resolve(rowss);
     });
     p.then((message)=>{
        res.send(message.filter(function (e) { return e }))
     });
})