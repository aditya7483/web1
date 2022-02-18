console.log('yes');
let form=document.getElementById("form");

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
    let firstName=document.getElementById('first_name').value.trim();
    let lastName=document.getElementById('last_name').value.trim();
    let email=document.getElementById('mail').value.trim();
    let complain=document.getElementById('complain').value.trim();
    
    {
        fetch('/contact',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({firstName,lastName,email,complain})
        }).then(res=>res.json())
        .then((data)=>{
            if(data=="success"){
                document.getElementById('first_name').value="";
                document.getElementById('last_name').value="";
                document.getElementById('mail').value="";
                document.getElementById('complain').value="";
                form.appendChild(success);
            }
            else{
                form.appendChild(failure);
            }
        })
        .catch((err)=>{throw err})
    }
})