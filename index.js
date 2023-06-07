const items=document.querySelectorAll(".item");
const subcontainers=document.querySelectorAll(".subcontainer");
const add=document.getElementById("add");
const input=document.getElementById("input")
const start=document.getElementById("start")
const deleteButtons = document.querySelectorAll('.delete-button');
let draggedItem=null;

/*Add the Item to ToDo Container*/
add.addEventListener('click',function(){
    if(Array.from(start.childNodes).filter(ele => ele.className ==="item").length===5){
      alert("Exceeds the maximum Limit\n Please push the existing item to In Progress");
      input.value=null;
    }
    else{
      if(input.value!==""){
          console.log(typeof(input.value))
          let spanItem=document.createElement("span")
          spanItem.className="delete-button"
          let deleteIcon=document.createElement("i")
          deleteIcon.className="fa-solid fa-trash"
          spanItem.appendChild(deleteIcon)
          let newItem=document.createElement("div")
          newItem.className="item"
          newItem.draggable=true
          newItem.textContent=input.value
          newItem.contentEditable=true
          newItem.appendChild(spanItem)
          start.appendChild(newItem)
          input.value=null;
            // Add event listeners to the newly created item
          newItem.addEventListener('dragstart', dragStart);
          newItem.addEventListener('dragend', dragEnd);
          newItem.addEventListener('click', deleteItem);
      }
    }  
})

// Drag start event handler
function dragStart(e) {
    draggedItem = e.target;
    setTimeout(function () {
      draggedItem.style.display = 'none';
    }, 0);
  }
  
  // Drag end event handler
function dragEnd(e) {
    setTimeout(function () {
      draggedItem.style.display = 'block';
    }, 0);
  }

  //drag over the subcontainers
function dragOver(e){
  e.preventDefault();
}

  //when entered the subcontainer
function dragEnter(e){
  e.preventDefault();
}

  //when item is dropped in the container
function Drop(e){
  e.preventDefault();
  console.log(draggedItem.parentNode,"thus")
  // draggedItem.parentNode.removeChild(draggedItem);
  this.appendChild(draggedItem)
}

  //delete the item from the container
function deleteItem(event) {
    const listItem = event.target.closest('.item');
    console.log(listItem)
    if (listItem) {
      listItem.remove();
    }
  } 
  deleteButtons.forEach(button => {
    button.addEventListener('click', deleteItem);
  });

for(let j=0;j<subcontainers.length;j++){
  const subcontainer=subcontainers[j];
  /*When the item is dragged to required subcontainer how it should behave*/
  subcontainer.addEventListener('dragover',dragOver)
  subcontainer.addEventListener('dragenter',dragEnter)
  subcontainer.addEventListener('drop',Drop)
}
for(let i=0;i<items.length;i++){
  const item=items[i];
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
  // console.log(subcontainers)
}