const shoppingList=document.querySelector('.shopping-list');
const inputForm=document.querySelector('.input-form');
const searchBox=document.querySelector('.search-box');
const deleteBtn=document.querySelector('.delete');
let Itemlist=[];

function saveList(){
    localStorage.setItem("item",JSON.stringify(Itemlist));
}

function deleteList(event){
    const li=event.target.parentNode.parentNode;
    li.remove();
    Itemlist=Itemlist.filter(items=>items.id!=li.id);
    saveList();
}

function paintThat(newObj){
    const li=document.createElement('li');
    li.id=newObj.id;
    const span=document.createElement('span');
    span.innerText=newObj.text;
    const icon=document.createElement('span');
    icon.className="btn";
    icon.innerHTML=`<i class="far fa-trash-alt"></i>`;
    li.appendChild(span);
    li.appendChild(icon);
    icon.addEventListener('click',deleteList);
    shoppingList.appendChild(li);
    li.scrollIntoView({block:'center'});
}

function handlerSubmmit(event){
    event.preventDefault();
    const saveText=searchBox.value;
    searchBox.value=""
    const newObj={
        text:saveText,
        id:Date.now(),
    };
    Itemlist.push(newObj);
    paintThat(newObj);
    saveList();
}

inputForm.addEventListener('submit',handlerSubmmit);
const saveToDos=localStorage.getItem('item');

if(saveToDos){
    const parsedList=JSON.parse(saveToDos);
    Itemlist=parsedList;
    parsedList.forEach(paintThat);
}





