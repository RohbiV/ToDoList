


const inputBox = document.getElementById("inputBox");        // for taking input
const listContainer = document.getElementById("listITems");

//getting query
const addBtn = document.querySelector("[data-add]");


inputBox.addEventListener('keyup', (e)=>{
    if(e.code === 'Enter'){
        addBtnFunc();
    }
})

addBtn.addEventListener('click', (e)=>{
    addBtnFunc();
});

function addBtnFunc() {
    if(inputBox.value == '') {
        alert("You have to enter something to add!!");
    }
    else{
        let li = document.createElement('li');
        let lispan = document.createElement('span');
        lispan.innerHTML = inputBox.value;
        lispan.className = 'listText';
        li.appendChild(lispan);
        li.className = 'listdata';
        listContainer.appendChild(li);
        let editspan = document.createElement('span');
        editspan.innerHTML = 'edit';
        editspan.className = 'editButton';
        li.appendChild(editspan);
        let span = document.createElement('span');
        span.innerHTML='\u00d7';    
        span.className = 'removeButton'; 
        li.appendChild(span);
    }
    inputBox.value = '';
    savedata();
}

listContainer.addEventListener('click', (e)=>{
    if(e.target.className === 'removeButton') {
        e.target.parentElement.remove();
        savedata();
    }
    else if(e.target.className === 'editButton') {
        handleEditButton(e.target);
    }
})


function savedata(){
    localStorage.setItem("data",listContainer.innerHTML);
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
    lielem.insertBefore(saveBtn,button.nextSibling);

    
    
    saveBtn.addEventListener('click', ()=> {
        licontent.contentEditable = false;
        editbtn.style.display = '';
        button.nextSibling.remove();
        savedata();
    })
}



showdata();


