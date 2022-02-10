console.log("signup page");
let errs=document.getElementsByClassName("error");

function clear_errors(){
    for(let i=0;i<errs.length;i++)
    {
        errs[i].innerText="";
    }
}

let alt=document.getElementById('alert');
const form=document.getElementById('form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    clear_errors();
    const username=document.getElementById('username').value.trim();
    const password=document.getElementById('password').value.trim();
    const email=document.getElementById('email').value.trim();
    
    if(username.length<5)
    {
        // document.getElementById('username').before(u_len);
        errs[1].innerText="*username should have more than 5 characters";
    }
    else if(password.length<5)
    {
        // document.getElementById('password').before(p_len);
        errs[3].innerText="*password should have more than 5 characters";
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
            
            else alt.innerText=data;
        })
        .catch((err)=>{console.log(err)})
    }
})  