


const inputBox = document.getElementById("inputBox");        // for taking input
const listContainer = document.getElementById("listITems");

//getting query
const addBtn = document.querySelector("[data-add]");


inputBox.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        addBtnFunc();
    }
})

addBtn.addEventListener('click', (e) => {
    addBtnFunc();
});

function addBtnFunc() {
    if (inputBox.value == '') {
        alert("You have to enter something to add!!");
    }
    else {
        let li = document.createElement('li');
        let lispan = document.createElement('span');
        lispan.innerHTML = inputBox.value;
        lispan.className = 'listText';
        li.appendChild(lispan);
        li.className = 'listdata';
        li.setAttribute('draggable', true);
        listContainer.appendChild(li);
        let editspan = document.createElement('span');
        editspan.innerHTML = 'edit';
        editspan.className = 'editButton';
        li.appendChild(editspan);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        span.className = 'removeButton';
        li.appendChild(span);
        let shareBtn = document.createElement('span');
        shareBtn.innerHTML = "<i class='fas fa-share'></i>";
        shareBtn.className = "shareButton";
        li.appendChild(shareBtn);
    }
    inputBox.value = '';
    savedata();
}

listContainer.addEventListener('click', (e) => {
    if (e.target.className === 'removeButton') {
        e.target.parentElement.remove();
        savedata();
    }
    else if (e.target.className === 'editButton') {
        handleEditButton(e.target);
    }
    else if (e.target.className === 'shareButton') {
        shareTask(e.target);
    }
})


function savedata() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showdata() {
    listContainer.innerHTML = localStorage.getItem("data");
}

function handleEditButton(button) {
    let lielem = button.parentElement;
    let licontent = lielem.querySelector('.listText');
    licontent.contentEditable = true;
    licontent.focus();
    let editbtn = licontent.nextSibling;
    editbtn.style.display = 'none';
    let saveBtn = document.createElement('span');
    saveBtn.innerHTML = 'save';
    saveBtn.className = 'savebtn';
    lielem.insertBefore(saveBtn, button.nextSibling);



    saveBtn.addEventListener('click', () => {
        licontent.contentEditable = false;
        editbtn.style.display = '';
        button.nextSibling.remove();
        savedata();
    })
}


function shareTask(shareButton) {
    let lielem = shareButton.parentElement;
    let taskText = lielem.querySelector('.listText').textContent;

    navigator.clipboard.writeText(taskText)
        .then(() => {
            setTimeout(() => {
                alert('Task text copied to clipboard!');
            }, 100);
        })
        .catch((error) => {
            console.error('Failed to copy task text:', error);
        });
}

showdata();


const taskLists = document.querySelectorAll('.listdata');
let dragItem = null;

// taskLists.addEventListener((taskList) => {
//     taskList.addEventListener('dragstart', handleDragStart);
//     taskList.addEventListener('dragover', handleDragOver);
//     taskList.addEventListener('dragstart', handleDrop);

// })

listContainer.addEventListener('dragstart',handleDragStart);
listContainer.addEventListener('dragover',handleDragOver);
listContainer.addEventListener('drop',handleDrop);

function handleDragStart(event) {
    dragItem = event.target;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', dragItem.innerHTML);
}

function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

function handleDrop(event) {
    event.preventDefault();
    const targetItem = event.target.closest('.listdata');
    const targetIndex = Array.from(listContainer.children).indexOf(targetItem);
    const dragIndex = Array.from(listContainer.children).indexOf(dragItem);

    if (dragIndex > targetIndex) {
        listContainer.insertBefore(dragItem, targetItem);
    }
    else {
        listContainer.insertBefore(dragItem, targetItem.nextSibling);
    }
}

