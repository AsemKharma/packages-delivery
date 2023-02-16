const firstFrom=document.getElementById('date-8665');
const firstTo=document.getElementById('date-40d3');
const secondFrom=document.getElementById('date-86651');
const secondTo=document.getElementById('date-40d31');



const table5 = document.getElementById('table5');

const Payment = document.getElementById('Pay')




const firstsearch= document.getElementById('firstsearch');
firstsearch.addEventListener("click", firsttable)
const table1= document.getElementById('table1');

function firsttable(){
    let url=window.location.href.substring(0,21)+'/Adminreportfirstsearch';
    
let from =firstFrom.value
let To =firstTo.value

const options ={
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({from:from,to:To})
  };
  try {
    fetch(url,options).then(res => res.json()).then(data => {



        table1.innerHTML=''
data.forEach(element => {

    const date = new Date(element.sendDate);

    date.setDate(date.getDate() + 7);
let newdate=''+date.toISOString().slice(0, 10)

    table1.innerHTML=table1.innerHTML+      '  <tr style="height: 49px;"><td class="u-border-1 u-border-grey-30 u-table-cell">'+element.PackageNum+'</td><td class="u-border-1 u-border-grey-30 u-table-cell">'+newdate+'</td><td class="u-border-1 u-border-grey-30 u-table-cell">'+element.Destination+'</td> <td class="u-border-1 u-border-grey-30 u-table-cell">'+element.Paid+'</td> <td class="u-border-1 u-border-grey-30 u-table-cell">'+element.Status+'</td> </tr>'
    
});


    })

  } catch (error) {
    
  }






}


const secondsearch= document.getElementById('secondsearch');
secondsearch.addEventListener("click", secondtable)
const table2=document.getElementById('table222');

function secondtable(){
    let url=window.location.href.substring(0,21)+'/Adminreportsecondsearch';

   
    let from =secondFrom.value
    let To =secondTo.value
    
    const options ={
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({from:from,to:To})
      };
      try {
        fetch(url,options).then(res => res.json()).then(data => {
            let arr;
            console.log(data[0].Category)
if(data[0].Category=='Chemical'){arr=[0,0,0,data[0].count]}            
else if(data[0].Category=='Fragile'){arr=[0,                   data[0].count,            0,    data[1].count]}            
else if(data[0].Category=='Liqued'){arr=[0,                    data[1].count,      data[0].count,    data[2].count]}            
else if(data[0].Category=='Regular'){arr=[data[0].count,       data[2].count,      data[1].count,    data[3].count]}            
else{arr=[0,0,0,0]}


table2.innerHTML= ' <tr style="height: 49px;"><td class="u-border-1 u-border-grey-30 u-table-cell">'+arr[0]+'</td><td class="u-border-1 u-border-grey-30 u-table-cell">'+arr[1]+'</td><td class="u-border-1 u-border-grey-30 u-table-cell">'+arr[2]+'</td><td class="u-border-1 u-border-grey-30 u-table-cell">'+arr[3]+'</td></tr>'


        })


}catch(error){}
}


const thirdsearch= document.getElementById('thirdsearch');

thirdsearch.addEventListener("click", thirdtable)
const table3=document.getElementById('table333');


function thirdtable(){
    let url=window.location.href.substring(0,21)+'/Adminreportthirdsearch';
    let categ= document.getElementById('select-8cf7');
    let city= document.getElementById('select-1360');
    let status= document.getElementById('select-a271');


let json={Category:categ.value,Location:city.value,Status:status.value}
    const options ={
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(json)
      };
      try {
        fetch(url,options).then(res => res.json()).then(data => {

console.log(data)
table3.innerHTML=''

data.forEach(element => {

    const date = new Date(element.sendDate);

    date.setDate(date.getDate() + 7);
let newdate=''+date.toISOString().slice(0, 10)



    table3.innerHTML=table3.innerHTML+' <tr style="height: 49px;"><td class="u-border-1 u-border-grey-30 u-table-cell">'+element.PackageNum+'</td><td class="u-border-1 u-border-grey-30 u-table-cell">'+newdate+'</td><td class="u-border-1 u-border-grey-30 u-table-cell">'+element.Destination+'</td><td class="u-border-1 u-border-grey-30 u-table-cell">'+element.Paid+'</td></tr></tbody>'




    
});






})}catch(error){}






}



const fourthsearch= document.getElementById('fourthsearch');

fourthsearch.addEventListener("click", fourthtable)




function fourthtable(){

   console.log('we are inn foruth')

  let url=window.location.href.substring(0,21)+'/AdminreportFourthSearch';

  const id = document.getElementById("C_ID_4")

  const options ={

      method:'POST',

      headers:{

        'Content-Type':'application/json'

      },

      body:JSON.stringify({Cid:id.value})

    };

    try {

      fetch(url,options).then(res => res.json()).then(data => {



          table1.innerHTML=''

          console.log("in report "+data);

          console.log(data)

  data.forEach(element => {

      console.log('the element is '+element.PackageNum)

      const date = new Date(element.sendDate);



      date.setDate(date.getDate() + 7);

  let newdate=''+date.toISOString().slice(0, 10)

      table5.innerHTML=table5.innerHTML+'  <tr style="height: 49px"> <td class="u-border-1 u-border-grey-30 u-table-cell">'+element.PackageNum+ '</td> <td class="u-border-1 u-border-grey-30 u-table-cell"> '+ newdate+' </td> <td class="u-border-1 u-border-grey-30 u-table-cell"> '+element.Destination+' </td> <td class="u-border-1 u-border-grey-30 u-table-cell"> '+element.Paid+' </td> </tr>'

     

  });

 

 

      })

    } catch (error) {

     

    }

 

}












function payment() {

  let url=window.location.href.substring(0,21)+'/PaymentReport';

   const options ={

      method:'POST',

      headers:{

      'Content-Type':'application/json'

    }

   

  };

  try {

    fetch(url,options).then(res => res.json()).then(data => {



        table1.innerHTML=''

        console.log("in report "+data);

        console.log(data)

        Payment.innerHTML=''

data.forEach(element => {

    console.log('the element is '+element.PackageNum)

    const date = new Date(element.sendDate);



    date.setDate(date.getDate() + 7);

let newdate=''+date.toISOString().slice(0, 10)

Payment.innerHTML=Payment.innerHTML+` <tr style="height: 44px"> <td class="u-border-1 u-border-grey-30 u-table-cell">${element.PackageNum}</td> <td class="u-border-1 u-border-grey-30 u-table-cell"> ${element.InsuranceAmount} </td>    <td class="u-border-1 u-border-grey-30 u-table-cell"> ${newdate} </td> </tr>`

   

});




    })

  } catch (error) {

   

  }

}

payment()









