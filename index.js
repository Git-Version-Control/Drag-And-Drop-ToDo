const items=document.querySelectorAll(".item");
const subcontainers=document.querySelectorAll(".subcontainer");
const add=document.getElementById("add");
const input=document.getElementById("input")
const start=document.getElementById("start")
let draggedItem=null;

/*Add the Item to ToDo Container*/
add.addEventListener('click',function(){
    if(Array.from(start.childNodes).filter(ele => ele.className ==="item").length===5){
        alert("Exceeds the maximum Limit\n Please push the existing item to In Progress");
    }
    else{
            let newItem=document.createElement("div")
            newItem.className="item"
            newItem.draggable=true
            newItem.textContent=input.value
            newItem.contentEditable=true
            start.appendChild(newItem)
            // Add event listeners to the newly created item
            newItem.addEventListener('dragstart', dragStart);
            newItem.addEventListener('dragend', dragEnd);
    }  
})

console.log(items)
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

for(let i=0;i<items.length;i++){
    const item=items[i];
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
    console.log(subcontainers)
    for(let j=0;j<subcontainers.length;j++){
        const subcontainer=subcontainers[j];
        /*When the item is dragged to required subcontainer how it should behave*/
        subcontainer.addEventListener('dragover',function(e){
            e.preventDefault();
        })
        subcontainer.addEventListener('dragenter',function(e){
            e.preventDefault();
        })
        subcontainer.addEventListener('drop',function(e){
            e.preventDefault();
            console.log(draggedItem.parentNode,"thus")
            // draggedItem.parentNode.removeChild(draggedItem);
            subcontainer.appendChild(draggedItem)
        }) 
    }
}