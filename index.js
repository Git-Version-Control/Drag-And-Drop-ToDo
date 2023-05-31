const items=document.querySelectorAll(".item");
const subcontainers=document.querySelectorAll(".subcontainer");
let draggedItem=null;
for(let i=0;i<items.length;i++){
    const item=items[i];
    
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
            draggedItem=null;
        },0)
       
    });
    for(let j=0;j<subcontainers.length;j++){
        const subcontainer=subcontainers[j];
        subcontainer.addEventListener('dragover',function(e){
            e.preventDefault();
        })
        subcontainer.addEventListener('dragenter',function(e){
            e.preventDefault();
        })
        subcontainer.addEventListener('drop',function(e){
            e.preventDefault();
            draggedItem.parentNode.removeChild(draggedItem);
            subcontainer.append(draggedItem)
        })
    }
}