const subcontainers = document.querySelectorAll(".subcontainer");
const add = document.getElementById("add");
const input = document.getElementById("input")
const start = document.getElementById("start");
const progress=document.getElementById("progress");
const finished=document.getElementById("finished")
const deleteButtons = document.querySelectorAll('.delete-button');
let draggedItem = null;

// Retrieve stored items from localStorage
const storedItems = JSON.parse(localStorage.getItem('items')) || [];

// Populate the initial items from localStorage
storedItems.forEach(item => {
  const {container,text}=item;
  const listItem = document.createElement("div");
  listItem.className = "item";
  listItem.draggable = true;
  listItem.textContent =text;
  
  const deleteButton = document.createElement("span");
  deleteButton.className = "delete-button";
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  listItem.appendChild(deleteButton);

  if(container=="start"){
    start.appendChild(listItem);
  }
  else if(container=="progress"){
    progress.appendChild(listItem);
  }
  else if(container=="finished"){
    finished.appendChild(listItem);
  }
  
  listItem.addEventListener('dragstart', dragStart);
  listItem.addEventListener('dragend', dragEnd);
  listItem.addEventListener('click', deleteItem);
});

// Add the Item to ToDo Container
add.addEventListener('click', function() {
  if (Array.from(start.childNodes).filter(element => element.className === "item").length === 5) {
    alert("Exceeds the maximum Limit\n Please push the existing item to In Progress");
    input.value = null;
  } 
  else if(Array.from(start.childNodes).filter(element => element.className === "item").some(item => item.textContent ===  input.value)){
    alert("Duplicate element present");
    input.value = null;
  }else {
    if (input.value !== "" ) {
      const listItem = document.createElement("div");
      listItem.className = "item";
      listItem.draggable = true;
      listItem.textContent = input.value;
      
      let deleteButton = document.createElement("span");
      deleteButton.className = "delete-button";
      deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      listItem.appendChild(deleteButton);
      
      start.appendChild(listItem);
      input.value = null;

      listItem.addEventListener('dragstart', dragStart);
      listItem.addEventListener('dragend', dragEnd);
      listItem.addEventListener('click', deleteItem);

      // Store the item in localStorage
      storedItems.push({ container:"start",text: listItem.textContent });
      localStorage.setItem('items', JSON.stringify(storedItems));
    }
  }
});

// Drag start event handler
function dragStart(e) {
  draggedItem = e.target;
  setTimeout(function () {
  draggedItem.style.display = 'none';
}, 0);
}

// Drag end event handler
function dragEnd(e) {
  setTimeout(function() {
    draggedItem.style.display = 'block';
  }, 0);
}

// Drag over the subcontainers
function dragOver(e) {
  e.preventDefault();
}

// When entered the subcontainer
function dragEnter(e) {
  e.preventDefault();
}

// When item is dropped in the container
function drop(e) {
  e.preventDefault();
  if (draggedItem.parentElement) {
    draggedItem.parentElement.removeChild(draggedItem);
  }
  const containerId = this.id;
  // Append the dragged item to the new container
  this.appendChild(draggedItem);
  // Update the container value in the storedItems array
  storedItems.forEach(item => {
    if (item.text === draggedItem.textContent) {
      item.container = containerId;
    }
  });
  localStorage.setItem('items', JSON.stringify(storedItems));
}
// Delete the item from the container
function deleteItem(event) {
  const listItem = event.target.closest('.item');
  if (listItem) {
    listItem.remove();
    // Update the stored items in localStorage
    const updatedItems = storedItems.filter(item => item.text !== listItem.textContent);
    localStorage.setItem('items', JSON.stringify(updatedItems));   
    storedItems.splice(storedItems.findIndex(item => item.text === listItem.textContent), 1);
   }
}

deleteButtons.forEach(button => {
  button.addEventListener('click', deleteItem);
});

for (let j = 0; j < subcontainers.length; j++) {
  const subcontainer = subcontainers[j];
  // When the item is dragged to the required subcontainer, define its behavior
  subcontainer.addEventListener('dragover', dragOver);
  subcontainer.addEventListener('dragenter', dragEnter);
  subcontainer.addEventListener('drop', drop);
} 