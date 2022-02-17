let login=document.getElementById('login')
let signup=document.getElementById('signup');
let profile=document.getElementById('profile');;
let menu=document.getElementById('ham_menu');
let navbar=document.querySelector('.navbar');


if(!localStorage.getItem('username'))
{
    console.log('inside if');
    login.style.display="initial";
    signup.style.display="initial";
    profile.style.display="none";
}

else{
    console.log('inside else');
    login.style.display="none";
    signup.style.display="none";
    profile.style.display="initial";
}

ham_menu.addEventListener('click',()=>{
    if(navbar.style.left=='0px')
    {
        console.log('inside if');
        navbar.style.left='-100%';
    }

    else{
        
        console.log('inside else');
        navbar.style.left='0';
    }
})

document.getElementById('logout').addEventListener('click',(e)=>{
    e.preventDefault();
    localStorage.removeItem('username');
    location.reload();
})

function open_log(){
    let pro=document.getElementById('pro');
    console.log("clicked");

    if(pro.style.display==="flex")
    {
        pro.style.display="none";
    }
    else 
    {
        pro.style.display="flex";
    }
}