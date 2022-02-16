console.log("signup page");
let errs=document.getElementsByClassName("error");
let inputs=document.querySelectorAll('.reg');

function clear_errors(){
    for(let i=0;i<errs.length;i++)
    {
        inputs[i].style.border='none';
        errs[i].innerText="";
    }
}

const form=document.getElementById('form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    clear_errors();
    const username=document.getElementById('username').value.trim();
    const password=document.getElementById('password').value.trim();
    const email=document.getElementById('email').value.trim();
    
    if(username.length<5)
    {
        inputs[0].style.border='2px solid red';
        errs[0].innerText="Username should have more than 5 characters";
    }
    else if(password.length<5)
    {
        inputs[2].style.border='2px solid red';
        errs[2].innerText="Password should have more than 5 characters";
    }
    
    
    else{
        fetch('/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            redirect:"manual",
            body:JSON.stringify({username,password,email})
        }).then((res)=>res.json())
        .then(data=>{
            if(data.redirect)
            window.location.href=data.redirect;
            
            else{
                inputs[0].style.border='1px solid red';
                errs[0].innerText=data;
            } 
                
        })
        .catch((err)=>{console.log(err)})
    }
})  