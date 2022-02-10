console.log("login page");

let alt=document.getElementById('alert');
let errs=document.getElementsByClassName("error");

function clear_errors(){
    for(let i=0;i<errs.length;i++)
    {
        errs[i].innerText="";
    }
}

const form=document.getElementById('form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    clear_errors();
    const username=document.getElementById('username').value.trim();
    const password=document.getElementById('password').value;

     fetch('/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            redirect:"manual",
            body:JSON.stringify({username,password})
        })
        .then(res=>res.json())
        .then((results)=>{
            if (results.redirect) {
                 window.location.href = results.redirect;
            }
            
            else{
                alt.innerText=results;
            }
        })
        .catch(err=>console.log(err));

})