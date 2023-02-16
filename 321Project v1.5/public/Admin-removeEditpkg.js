
const idholder=document.getElementById('name-3b9a');
const emailholder=document.getElementById('email-3b9a');
const hightholder=document.getElementById('hight');
const weightholder=document.getElementById('weight');
const CurrentLocholder=document.getElementById('select-df89');
const Statusholder=document.getElementById('select-a8b6');
const Categholder=document.getElementById('select-da47');
const Lengthholder=document.getElementById('Length');




const deletepkg= document.getElementById('deletepkg');
deletepkg.addEventListener("click", deletepkgf)

const updatepkg= document.getElementById('Update');
updatepkg.addEventListener("click", updatepkgf)


function updatepkgf(){
    let url=window.location.href.substring(0,21)+'/AdminUpdatePKG';
    let obj={id:idholder.value,height:hightholder.value,weight:hightholder.value,
            Length:Lengthholder.value,recemail:emailholder.value,
            currentlocation:CurrentLocholder.value,
            status:Statusholder.value,
            category:Categholder.value}
            console.log(obj)
    const options ={
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(obj),};



        fetch(url,options).then(location.replace(window.location.href.substring(0,21)+'/E_home'))

}




function test(number){
    
    let url=window.location.href.substring(0,21)+'/Adminpkgsinfo';
console.log(Categholder.value)

    const options ={
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({number:number}),
      };

      
fetch(url,options).then(res => res.json()).then(data => {
console.log(data)
idholder.value=data.package.PackageNum;
hightholder.value=data.package.Height;
weightholder.value=data.package.Weight;
Lengthholder.value=data.package.Length;
Statusholder.value=data.package.Status;
Categholder.value=data.package.Category;
if ( data.hasOwnProperty('send') ) {emailholder.value=data.send.ReceiveID}
else{emailholder.value=''}

})
}

function deletepkgf(){
    let url=window.location.href.substring(0,21)+'/AdmindeletePKG';
    
    const options ={
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({id:idholder.value}),
      };

      
fetch(url,options).then(location.replace(window.location.href.substring(0,21)+'/E_home'))

}



