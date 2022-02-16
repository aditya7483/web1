console.log("login page");

let errs=document.getElementsByClassName("error");
let inputs=document.querySelectorAll('.reg');

function clear_errors(){
    for(let i=0;i<errs.length;i++)
    {
        inputs[i].style.border="none";
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
                localStorage.setItem('username',results.username);
                window.location.href = results.redirect;
            }
            
            else{
                inputs[0].style.border='1px solid red';
                errs[0].innerText=results;
            }
        })
        .catch(err=>console.log(err));

})