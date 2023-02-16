
const btn = document.getElementById('submit_clicked')
btn.addEventListener('click',paid)
function paid(){
    url = window.location.href.substring(0,21)+'/Paid'
    console.log("paid!!")
    console.log(window.location.href)
    pkg= window.location.href.substring(26,28)
    console.log(pkg)
    const options ={
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({PackageNum:pkg})
      };
      console.log(window.location.href.substring(0,21))
       fetch(url,options)//.then(location.replace(window.location.href.substring(0,21)+'/costumer_logout'))
} 

