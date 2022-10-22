let draggables = document.querySelectorAll ('.draggable')
const containers = document.querySelectorAll ('.container')
const submits = document.querySelector ('form')
const input = document.querySelector ('input')
const toDo = document.querySelector ('.container-toDo')
const containerDelete = document.querySelector ('.container-delete')

function setDraggable(){
    draggables.forEach (draggable => { 
        draggable.addEventListener ('dragstart', () => {
            draggable.classList.add ('scale-105')
            draggable.classList.add ('dragging')
            draggable.classList.add ('duration-300')
        });
    
        draggable.addEventListener ('dragend', () => {
            draggable.classList.remove ('scale-105')
            draggable.classList.remove ('dragging')
        });

        draggable.addEventListener ('dragend',(e)=> {
            if(e.target.classList.contains ('container-delete')) {
                draggable.outerHTML = "";
            }
        })
    });
}
setDraggable();

containers.forEach (container => {
    container.addEventListener ('dragover', e => {
        e.preventDefault ()
        const afterElement = getDragAfterElement (container, e.clientY)
        const draggable = document.querySelector ('.dragging')
        if (afterElement == null) {
            resetBG(draggable);
            if(container.classList.contains('container-toDo')){
                draggable.classList.add('bg-gray-300')
            } else if(container.classList.contains ('container-onGoing')) {
                draggable.classList.add ('bg-blue-400')
            } else if (container.classList.contains ('container-complete')) {
                draggable.classList.add ('bg-green-400')
            }
            container.appendChild (draggable)

        } else {
            resetBG(draggable);
            if(container.classList.contains('container-toDo')){
                draggable.classList.add('bg-gray-300')
            } else if(container.classList.contains ('container-onGoing')) {
                draggable.classList.add ('bg-blue-400')
            } else if (container.classList.contains ('container-complete')) {
                draggable.classList.add ('bg-green-400')
            }
            container.insertBefore (draggable, afterElement)
        }
    });
});

function getDragAfterElement (container, y) {
    const draggableElement = [...container.querySelectorAll ('.draggable:not(.dragging)')]

    return draggableElement.reduce ((closest, child) => {
        const box = child.getBoundingClientRect ()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return {offset : offset, element: child}
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

function resetBG(element){
    element.classList.remove('bg-gray-300')
    element.classList.remove('bg-blue-400')
    element.classList.remove('bg-green-400')
};

submits.addEventListener ('submit', e => {
    e.preventDefault () 
    let elem = document.createElement('div')
    elem.innerHTML = `
    <div class="bg-gray-300 rounded-lg p-2 w-full flex justify-between mb-3 cursor-pointer draggable" draggable="true">

        <p class="font-semibold text-lg">
            ${input.value}
        </p>
    
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4 2C5.10457 2 6 2.89543 6 4C6 5.10457 5.10457 6 4 6C2.89543 6 2 5.10457 2 4C2 2.89543 2.89543 2 4 2ZM12 2C13.1046 2 14 2.89543 14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4C10 2.89543 10.8954 2 12 2ZM22 4C22 2.89543 21.1046 2 20 2C18.8954 2 18 2.89543 18 4C18 5.10457 18.8954 6 20 6C21.1046 6 22 5.10457 22 4ZM4 10C5.10457 10 6 10.8954 6 12C6 13.1046 5.10457 14 4 14C2.89543 14 2 13.1046 2 12C2 10.8954 2.89543 10 4 10ZM14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12ZM20 10C21.1046 10 22 10.8954 22 12C22 13.1046 21.1046 14 20 14C18.8954 14 18 13.1046 18 12C18 10.8954 18.8954 10 20 10ZM6 20C6 18.8954 5.10457 18 4 18C2.89543 18 2 18.8954 2 20C2 21.1046 2.89543 22 4 22C5.10457 22 6 21.1046 6 20ZM12 18C13.1046 18 14 18.8954 14 20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20C10 18.8954 10.8954 18 12 18ZM22 20C22 18.8954 21.1046 18 20 18C18.8954 18 18 18.8954 18 20C18 21.1046 18.8954 22 20 22C21.1046 22 22 21.1046 22 20Z" fill="black"/>
        </svg>         
        
    </div>
    `.trim ()
    toDo.append(elem.firstChild);
    draggables = document.querySelectorAll ('.draggable')
    setDraggable();
    input.value = ""
});

containerDelete.addEventListener ('dragover', e => {
    const draggable = document.querySelector ('.dragging')
    draggable.outerHTML = "";
})