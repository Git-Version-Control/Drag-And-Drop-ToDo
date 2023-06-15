const items = document.querySelectorAll(".item");
const subcontainers = document.querySelectorAll(".subcontainer");
const add = document.getElementById("add");
const input = document.getElementById("input");
const start = document.getElementById("start");
const progress = document.getElementById("progress");
const finished = document.getElementById("finished");
const deleteButtons = document.querySelectorAll('.delete-button');
let draggedItem = null;
let listItem;

// Retrieve stored items from localStorage
const storedItems = JSON.parse(localStorage.getItem('items')) || {
  start: [],
  progress: [],
  finished: []
};

// Populate the initial items from localStorage
Object.keys(storedItems).forEach(key => {
  const container = document.getElementById(key);
  storedItems[key].forEach(item => {
    listItem = createListItem(item.text);
    container.appendChild(listItem);
    addListItemEventListeners(listItem);
  });
});

// Add the Item to the appropriate subcontainer
add.addEventListener('click', function() {
  const container = getContainerByDraggedItem();
  
  if (Array.from(container.childNodes).filter(element => element.className === "item").length === 5) {
    alert("Exceeds the maximum Limit\n Please push the existing item to In Progress");
    input.value = null;
  } else if (isDuplicate()) {
    alert("Duplicate element present");
    input.value = null;
  } else {
    if (input.value !== "") {
      listItem = createListItem(input.value);
      container.appendChild(listItem);
      addListItemEventListeners(listItem);
      input.value = null;

      // Update the stored items in localStorage
      updateStoredItems();
    }
  }
});

// Function to create a new list item
function createListItem(text) {
  const listItem = document.createElement("div");
  listItem.className = "item";
  listItem.draggable = true;
  listItem.textContent = text;

  const deleteButton = document.createElement("span");
  deleteButton.className = "delete-button";
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  listItem.appendChild(deleteButton);

  return listItem;
}

// Function to add event listeners to a list item
function addListItemEventListeners(listItem) {
  listItem.addEventListener('dragstart', dragStart);
  listItem.addEventListener('dragend', dragEnd);
  listItem.addEventListener('click', deleteItem);
}

// Function to check for duplicate element
function isDuplicate() {
  const container = getContainerByDraggedItem();
  const itemsInContainer = Array.from(container.childNodes).filter(element => element.className === "item");
  return itemsInContainer.some(item => item.textContent === input.value);
}

// Function to get the container based on the dragged item
function getContainerByDraggedItem() {
  return Array.from(subcontainers).find(container => container.contains(draggedItem));
}

// Drag start event handler
function dragStart(e) {
  draggedItem = e.target;
  setTimeout(function() {
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
  this.appendChild(draggedItem);

  // Update the stored items in localStorage
  updateStoredItems();
}

// ... (Previous code)

// Delete the item from the container
function deleteItem(event) {
    const listItem = event.target.closest('.item');
    if (listItem) {
      listItem.remove();
  
      // Update the stored items in localStorage
      updateStoredItems();
    }
  }
  
  deleteButtons.forEach(button => {
    button.addEventListener('click', deleteItem);
  });
  
  // Function to update the stored items in localStorage
  function updateStoredItems() {
    const updatedItems = {
      start: getContainerItems(start),
      progress: getContainerItems(progress),
      finished: getContainerItems(finished)
    };
    localStorage.setItem('items', JSON.stringify(updatedItems));
  }
  
  // Function to get the items in a container
  function getContainerItems(container) {
    return Array.from(container.childNodes)
      .filter(element => element.className === "item")
      .map(item => ({ text: item.textContent }));
  }
  
  for (let j = 0; j < subcontainers.length; j++) {
    const subcontainer = subcontainers[j];
  
    // When the item is dragged to the required subcontainer, define its behavior
    subcontainer.addEventListener('dragover', dragOver);
    subcontainer.addEventListener('dragenter', dragEnter);
    subcontainer.addEventListener('drop', drop);
  }
  
