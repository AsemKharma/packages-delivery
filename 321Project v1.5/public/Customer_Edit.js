//Submit-changes 
const getbutton= document.getElementById('Submit-changes'); 
getbutton.addEventListener("click",update)
console.log('customer edit entered  !')

function update(){
    const emailholder=document.getElementById('email-d08d');
    const nameholder=document.getElementById('name-3b9a');
    const phoneholder=document.getElementById('phone-725f');
    const passwordholder=document.getElementById('name-5d56');
    if(emailholder.value !='' &&nameholder.value !='' && phoneholder.value!='' &&passwordholder.value !=''){
    
      document.cookie = `password= ${passwordholder.value}`;
        console.log('passed the if   !')
        let url=window.location.href.substring(0,21)+'/Edit-Personal'
        p = new Promise((resolve)=>{
            let obj={email:emailholder.value,name:nameholder.value,phone:phoneholder.value,password:passwordholder.value};
              resolve(obj);
          });
          p.then((msg)=>{
  const options = {
          method: 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(msg),
        };
        
    
        fetch(url, options).then(location.replace(window.location.href.substring(0,21)+'/C_home'))
          });
    }
}