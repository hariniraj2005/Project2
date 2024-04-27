function saveToLocalStorage(event){
    event.preventDefault();
    const title=event.target.title.value;
    const url=event.target.url.value;
    const obj={
        title,
        url
    }
    //post functionality
    axios.post("https://crudcrud.com/api/dc583416f2ce4baf9cae0a318f89c5f7/websites",obj)
    .then((response)=>{
        showUserDetailsOnScreen(response.data);
        document.getElementById('title').value = '';
        document.getElementById('url').value = '';
   })
   .catch((error)=>{
    console.log(error);
   })
}
   //get functionality
   window.addEventListener("DOMContentLoaded", ()=>{
    axios
    .get("https://crudcrud.com/api/dc583416f2ce4baf9cae0a318f89c5f7/websites")
    .then((response)=>{
      console.log(response)
      for(let i=0;i<response.data.length;i++){
        showUserDetailsOnScreen(response.data[i]);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  })
  function showUserDetailsOnScreen(obj){
    const parentElement=document.querySelector('ul');
    const childElement=document.createElement('li');
    const anchor=document.createElement('a');
    anchor.href=obj.url;
    anchor.textContent=obj.url;
    childElement.textContent=obj.title+'>';
    childElement.appendChild(anchor);
    parentElement.appendChild(childElement);
  const deleteBtn=document.createElement("button");
  deleteBtn.type="button";
  deleteBtn.innerText="delete";
  deleteBtn.onclick= () => {
    parentElement.removeChild(childElement);
    axios
    .delete(`https://crudcrud.com/api/dc583416f2ce4baf9cae0a318f89c5f7/websites/${obj._id}`)
    .then((response) => {
      console.log(response);
     })
    .catch((error) => {
      console.log(error);
    });
}
  const editBtn=document.createElement("button");
  editBtn.type="button";
  editBtn.innerText="edit";
  editBtn.onclick=() => {
     parentElement.removeChild(childElement);
     // Populate the input fields with the object data
    document.getElementById('title').value = obj.title;
    document.getElementById('url').value = obj.url;
    // Update the form's submit event handler for editing
        const updatedTitle = document.getElementById('title').value;
        const updatedUrl = document.getElementById('url').value;
        const updatedObj = {
           _id : obj._id,
           title : updatedTitle,
          url: updatedUrl
        };
        axios
       .put(`https://crudcrud.com/api/dc583416f2ce4baf9cae0a318f89c5f7/websites/${obj._id}`,updatedObj)
            .then((response) => {
             showUserDetailsOnScreen(response.data);
                document.getElementById('title').value = '';
                document.getElementById('url').value = '';
            axios
            .delete(`https://crudcrud.com/api/dc583416f2ce4baf9cae0a318f89c5f7/websites/${obj._id}`)
            .then((response)=>{
              console.log(response);
            })
            .catch((error)=>{
              console.log(error);
      });
    };
   childElement.appendChild(deleteBtn);
    childElement.appendChild(editBtn);
    parentElement.appendChild(childElement);
}

