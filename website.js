function saveToLocalStorage(event){
    event.preventDefault();
    const title=event.target.title.value;
    const url=event.target.url.value;
    const obj={
        title,
        url
    }
    //post functionality
    axios.post("https://crudcrud.com/api/a0e11653f0484f4f8ff34718ecca0a80/websites",obj)
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
    .get("https://crudcrud.com/api/a0e11653f0484f4f8ff34718ecca0a80/websites")
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
    childElement.appendChild(anchor);
    childElement.textContent=obj.title+'>'+anchor;
    parentElement.appendChild(childElement);
  const deleteBtn=document.createElement("button");
  deleteBtn.type="button";
  deleteBtn.innerText="delete";
  deleteBtn.onclick= () => {
    parentElement.removeChild(childElement);
    axios
    .delete(`https://crudcrud.com/api/a0e11653f0484f4f8ff34718ecca0a80/websites/${obj._id}`)
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
     document.getElementById('title').value=obj.title;//populating the input fields
     document.getElementById('url').value=obj.url;
     // Update the form submit function for editing
     document.querySelector('form').onsubmit = (event) => {
        event.preventDefault();
     // Get updated bookmark data from form fields
        const updatedTitle = document.getElementById('title').value;
        const updatedUrl = document.getElementById('url').value;
     // Create updated bookmark object
        const updatedobj = {
          _id : obj._id,
          title : updatedTitle,
          url: updatedUrl
        };

        // Make PUT request to update the bookmark data
        axios
        .put(`https://crudcrud.com/api/a0e11653f0484f4f8ff34718ecca0a80/websites/${obj._id}`, updatedobj)
          .then((response) => {
            showUserDetailsOnScreen(response.data);
            document.getElementById('title').value = '';
            document.getElementById('url').value = '';
          })
          .catch((error) => {
            console.log(error);
          });
      };
      axios
      .delete(`https://crudcrud.com/api/a0e11653f0484f4f8ff34718ecca0a80/websites/${obj._id}`)
      .then((response) => {
        console.log(response);
       })
      .catch((error) => {
        console.log(error);
      });
    };
    childElement.appendChild(deleteBtn);
    childElement.appendChild(editBtn);
    parentElement.appendChild(childElement);
}

