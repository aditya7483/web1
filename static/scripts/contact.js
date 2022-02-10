console.log('yes');
let form=document.getElementById("form");

let p=document.createElement("p");
p.innerText="*required";
p.style.color="red";
p.style.alignSelf="flex-start";

let success=document.createElement("p");
success.innerText="Your form has been submitted successfully";
success.style.color="#179f22";
success.style.fontWeight="bold";
// success.style.backgroundColor="black";

let failure=document.createElement("p");
failure.innerText="There was an error submitting the form. Please try again";
failure.style.color="#179f22";
success.style.fontWeight="bold";
// failure.style.backgroundColor="black";

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let first_name=document.getElementById('first_name').value.trim();
    let last_name=document.getElementById('last_name').value.trim();
    let email=document.getElementById('mail').value.trim();
    let complain=document.getElementById('complain').value.trim();

    if(first_name.length<1)
    {
        document.getElementById('first_name').before(p);
    }
    else if(last_name.length<1)
    {
        document.getElementById('last_name').before(p);
    }
    else if(email.length<1)
    {
        document.getElementById('mail').before(p);
    }
    else if(complain.length<1)
    {
        document.getElementById('complain').before(p);
    }
    
    else
    {
        fetch('/contact',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({first_name,last_name,email,complain})
        }).then(res=>res.json())
        .then((data)=>{
            document.getElementById('first_name').value="";
            document.getElementById('last_name').value="";
            document.getElementById('mail').value="";
            document.getElementById('complain').value="";
            if(data=="success"){
                form.appendChild(success);
            }
            else{
                form.appendChild(failure);
            }
        })
        .catch((err)=>{throw err})
    }
})