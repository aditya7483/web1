function open_log(){
    let pro=document.getElementById('pro');
    console.log("clicked");

    if(pro.style.display==="flex")
    {
        console.log('inside if')
        pro.style.display="none";
    }
    else 
    {
        console.log('inside else')
        pro.style.display="flex";
    }
}