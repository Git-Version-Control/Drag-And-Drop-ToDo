const items=document.querySelectorAll(".item");
const subcontainers=document.querySelectorAll(".subcontainer");
const add=document.getElementById("add");
const input=document.getElementById("input")
const start=document.getElementById("start")
let draggedItem=null;

/*Add the Item to ToDo Container*/
add.addEventListener('click',function(){
    if(Array.from(start.childNodes).filter(ele => ele.className ==="item").length===6){
        alert("Exceeds the maximum Limit\n Please push the existing item to In Progress");
    }
    else{
            let newItem=document.createElement("div")
            newItem.className="item"
            newItem.draggable=true
            newItem.textContent=input.value
            newItem.contentEditable=true
            console.log(newItem)
            start.appendChild(newItem)
            console.log(newItem.parentNode,"strt")
    }  
    const items=document.querySelectorAll(".item");
   console.log(items)
    // console.log(subcontainers[0])
})

console.log(items)

for(let i=0;i<items.length;i++){
    const item=items[i];
    // console.log("parentNode"+item)
    // item.addEventListener('dblclick',function(){
        
    // })

    /*start the drag*/
    item.addEventListener('dragstart',function(e){
        console.log("ondragstart"+e);
        draggedItem=item;
        setTimeout(function(){
            item.style.display='none';
        },0)
    });
    item.addEventListener("dragend",function(e){
        console.log("drag end"+e);
        setTimeout(function(){
            draggedItem.style.display='block';
            // draggedItem=null;
        },0)
    });
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
    // console.log("To Do",subcontainers[0])
    // console.log("Progress",subcontainers[1])
    // console.log("Finished",subcontainers[2])

}
