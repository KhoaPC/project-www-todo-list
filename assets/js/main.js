const c = console.log;

//#region declare const 
const app = document.querySelector('app');
const listNote = app.querySelector('list-note');
const inputNote = app.querySelector('.input-note');
const btnAddNote = app.querySelector('.btn-add');
const btnDeleteTodo = app.querySelector('.btn-delete');

const CONST_LS_KEY = 'TODO-LIST';

const CONST_TODO_STATUS = {
    PENDING: 0,
    DOING: 1,
    COMPLETED: 2,
    CANCELED: -1
}
//#endregion declare const

const arrBtn = app.querySelector('#arr-btn');
const localBtn = app.querySelector('#local-btn');
const clearBtn = app.querySelector('#clear-btn');

const appOOP = {
    //#region declare
    onEdit: false, // Flag
    dataTodos: [],
    //#endregion declare

    render: function () {

        const htmls = this.dataTodos.map((item, index) => {
            return `
            <li class="item-note" data-index="${item.id}">
                <input class="checkbox-hide" type="checkbox">
                <span class="checkbox-complete"></span>
                <span class="item-text" contenteditable="true">${item.text}</span>
                <button class="btn-delete">x</button>
                <i class="icon-save"></i>
            </li>
            
                `;
            // <i class="fa-solid fa-ellipsis-vertical"></i>
        });
        listNote.innerHTML = htmls.join('');
    },

    inputValueLength: function () {
        return inputNote.value.length;
    },

    createNote: function () {
        const id = `${Date.now()}`;
        let item, itemText, checkboxHide, checkboxShow, btn, icon, pinIcon;

        // Create item
        item = document.createElement("li");
        // pinIcon = document.createElement("i");
        itemText = document.createElement("span");
        checkboxHide = document.createElement("input");
        checkboxShow = document.createElement("span");
        btn = document.createElement("button");
        icon = document.createElement('i');

        // Add attribute
        item.className = 'item-note';
        // pinIcon.className = 'fa-solid fa-thumbtack';
        itemText.className = 'item-text';
        btn.className = 'btn-delete';
        checkboxHide.className = 'checkbox-hide';
        checkboxShow.className = 'checkbox-complete';
        icon.className = 'icon-save';
        itemText.setAttribute("contenteditable", "true");
        checkboxHide.setAttribute("type", "checkbox");
        item.setAttribute("data-index", id);

        // Assign checkbox to item
        item.appendChild(checkboxHide);
        item.appendChild(checkboxShow);
        // item.appendChild(pinIcon)

        // Add text
        itemText.innerText = inputNote.value;
        btn.appendChild(document.createTextNode("x"));

        // Assign element to item
        item.appendChild(itemText);
        item.appendChild(btn);
        item.appendChild(icon);

        // Add item to list
        listNote.appendChild(item);

        // After creating item then delete input value
        inputNote.value = "";

        btn.onclick = this.deleteTodo;
        checkboxHide.onclick = this.strikethroughItem;
        icon.onclick = this.updateTodo;
        itemText.onfocus = this.focusItem;
        //itemText.onblur = this.focusOutItem;

        this.addTodo(id, itemText.innerText);
    }, // function createNote

    localSet: function () {
        localStorage.setItem(CONST_LS_KEY, JSON.stringify(appOOP.dataTodos));
    }, // localSet

    localGet: function () {
        const cached = localStorage.getItem(CONST_LS_KEY);
        if (cached)
            return JSON.parse(cached);

        return [];
    }, // localGet

    addTodo: function (id, todoText) {
        appOOP.dataTodos.push({
            id,
            text: todoText,
            status: CONST_TODO_STATUS.DOING
        })
        c('Add');

        appOOP.localSet();
    }, // addTodo

    updateTodo: function (e) {
        const newText = e.target.parentNode.querySelector('.item-text').textContent;

        if (newText.trim().length < 1)
            return alert('Invalid input');

        this.onEdit = false;
        inputNote.removeAttribute('disabled');
        btnAddNote.removeAttribute('disabled');

        const id = e.target.parentNode.dataset.index;
        appOOP.dataTodos = appOOP.dataTodos.map((item) => {
            if (item.id != id)
                return item;
            else
                return {
                    ...item,
                    text: newText
                } // return
        }) // map
        c('Update');
        appOOP.localSet();
    }, // updateTodo

    deleteTodo: function (e) {
        const listElement = e.target.parentNode;
        const idDelete = listElement.dataset.index;
        e.target.parentNode.parentNode.removeChild(listElement);

        appOOP.dataTodos = appOOP.dataTodos.filter(item => item.id !== idDelete);
        appOOP.localSet();
        c(`Delete`);
    }, // deleteTodo

    strikethroughItem: function (e) {
        if (e.target.hasAttribute('checked')) {
            e.target.parentNode.classList.remove('strikethrough');
            e.target.removeAttribute('checked');
        } else {
            e.target.parentNode.classList.add('strikethrough');
            e.target.setAttribute('checked', '');
        }
    }, // strikethroughItem

    focusItem: function (e) {
        if (this.onEdit)
            return;

        this.onEdit = true;
        inputNote.setAttribute('disabled', true);
        btnAddNote.setAttribute('disabled', true);

        const btnDelete = e.target.parentNode.querySelector('.btn-delete');
        const btnSave = e.target.parentNode.querySelector('.icon-save');

        // e.target.parentNode.classList.remove('strikethrough');
        e.target.parentNode.classList.add('focus-item');
        btnDelete.classList.add('hide');
        btnSave.classList.add('show');

    }, // focus Item

    // focusOutItem: function (e) {
    //     const btnDelete = e.target.parentNode.querySelector('.btn-delete');
    //     const btnSave = e.target.parentNode.querySelector('.icon-save');

    //     // e.target.parentNode.classList.add('strikethrough');
    //     e.target.parentNode.classList.remove('focus-item');
    //     setTimeout(() => {
    //         btnDelete.classList.remove('hide');
    //     }, 100);

    //     if (e.target.textContent.trim() == '') {
    //         alert('Không được để trống');
    //         setTimeout(() => {
    //             e.target.focus();
    //         }, 100);
    //     } else
    //         setTimeout(() => {
    //             btnSave.classList.remove('show');
    //         }, 80);

    //     const text1 = e.target.textContent;
    //         c(text1)


    // }, // focusOutItem

    handleEvents: function () {
        btnAddNote.onclick = () => {

            if (appOOP.inputValueLength() > 0) {
                appOOP.createNote();
            }
        } // btnAddNote.onclick

        inputNote.onkeypress = function (e) {
            if (appOOP.inputValueLength() > 0 && e.charCode === 13) {
                appOOP.createNote();
            }
        } // enterKey

        arrBtn.onclick = function () {
            c(appOOP.dataTodos);
        }

        localBtn.onclick = function () {
            c(localStorage);
        }

        clearBtn.onclick = function () {
            localStorage.clear();
        }

        // Add events for buttons
        app.querySelectorAll('.btn-delete').forEach(btn => {
            btn.onclick = (e) => appOOP.deleteTodo(e);
        });

        app.querySelectorAll('.checkbox-hide').forEach(checkbox => {
            checkbox.onclick = (e) => appOOP.strikethroughItem(e);
        });

        app.querySelectorAll('.item-text').forEach(text => {
            text.addEventListener('focus', (e) => appOOP.focusItem(e));
            //text.addEventListener('blur', (e) => appOOP.focusOutItem(e));
        });

        app.querySelectorAll('.icon-save').forEach(icon => {
            icon.onclick = (e) => {
                appOOP.updateTodo(e);
                icon.classList.remove('show');
            };
            ;
        });
    }, // handleEvent

    start() {
        this.dataTodos = this.localGet();

        setTimeout(() => {
            this.render();
            this.handleEvents();
        }, 1_000); // wait for reading ls in 1 seconds
    }, // start
} // appOOP

appOOP.start();


// input rỗng  thì return
// chỉ update khi click btn save
// khi save thì mới được làm hành động khác
//

// func updateOnEdit