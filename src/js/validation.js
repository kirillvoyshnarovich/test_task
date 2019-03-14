
var elements = document.forms["form-feedback"]

var checkbox = document.querySelector('.checkbox');
var buttons = document.querySelectorAll('.button');

var elements_mode = document.querySelectorAll('[data-mode=mode]');
var elements_mode_1 = document.querySelectorAll('[data-mode=mode-1]');
var elements_mode_2 = document.querySelectorAll('[data-mode=mode-2]');

var image = document.querySelector('.left-panel__background');

var buttons_tab = document.querySelectorAll('[data-button-mode]');

var containerPhone = document.querySelector('.header-mode-2__telefon');

var next_page_button_mode = document.querySelector('.right-panel__form-button');
var next_page_button_mode_1 = document.querySelector('.right-panel__form-button-mode-1');

//------------------maska for input
window.addEventListener("DOMContentLoaded", function() {

    function setCursorPosition(pos, elem) {
    
        elem.focus();
    
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    
        else if (elem.createTextRange) {
    
            var range = elem.createTextRange();
    
            range.collapse(true);
    
            range.moveEnd("character", pos);
    
            range.moveStart("character", pos);
    
            range.select()
    
        }
    }


    function mask(event) {

        if (this.selectionStart < 3) event.preventDefault();

        var matrix = "+375 __ _______",

            i = 0,

            def = matrix.replace(/\D/g, ""),
            
            val = this.value.replace(/\D/g, "");

        if (def.length >= val.length) val = def;

        this.value = matrix.replace(/[_\d]/g, function(a) {

            return  i < val.length ? val.charAt(i++) :  a

        });

        i = this.value.indexOf("_");

        if(event.keyCode == 8) i = this.value.lastIndexOf(val.substr(-1))+1;

        if (i != -1) {

        i < 5 && (i = 3);

        this.value = this.value.slice(0,i);

        }
        if (event.type == "blur") {

            if (this.value.length < 5) this.value = ""

        } else setCursorPosition(this.value.length, this);

    };

    function maskData(e) {
        var mask = 'мм/дд/гг'
        val = this.value.replace(/[^0-9\/]/g, "");
        if(val.length == 2 || val.length == 5) {
            var newValue = val+'/';
            this.value = newValue 
        } else {
            this.value = val
        }
    }

        var tel = document.querySelector('input[name=phone]')
        var dat = document.querySelector('input[name=data_birth]')
        dat.addEventListener("input", maskData, false)
        tel.addEventListener("input", mask, false);

        tel.addEventListener("focus", mask, false);

        tel.addEventListener("blur", mask, false);

        tel.addEventListener("keydown", mask, false);
 
});
    

Data.prototype = {

    data_page_1:{
        "name":null,
        "surname":null,
        "patronymic":null,
        "data_birth":null,
        "male":null,
        "phone":null,
        "email":null,
        "password":null
    },

    addValue:function(name, value) {
        this.data_page_1[name] = value
    },

    getValue:function(name) {
        return this.data_page_1[name]
    },

    resetValue:function(name) {
        this.data_page_1[name] = null
    }
}

Validation.prototype = {
    invalidMessage: [],
    savedData: {},

    reset_array:function(){
        if(this.invalidMessage) {
            this.invalidMessage.length = 0;
        }
    },
    
    validation: function(input) {
        var validity = input.validity;
        this.reset_array()

        if(validity.patternMismatch) {
            if(input.name == 'email') {
                this.addInvalidity('Некоректный email адрес');
            } else if(input.name == 'data_birth') {
                this.addInvalidity('Формат для ввода даты - мм/дд/гг');
            }else if(input.name == 'phone') {
                this.addInvalidity('Формат для ввода номера телефона - +375 ** *******');
            }else{
                this.addInvalidity('Поле может содержать только буквы, знак продела и тире');
            }
            
        }

        if(validity.tooShort) {
            if(input.name == 'password') {
                this.addInvalidity('Поле должно содержать шесть или более символов');
            } else {
                this.addInvalidity('Поле должно содержать два или более символов');
            }
            
        }

        if(!input.value) {
            this.addInvalidity('Это поле обязательное для заполнения');
        }

        if(input.name == 'return_password') {
            if(input.value != self.data.data_page_1['password']) {
                this.invalidMessage.length = 0;
                this.addInvalidity('Проверьте пароль');
            } 
        }
    },

    addInvalidity: function(message) {
        this.invalidMessage.push(message);
    },

    savedData: function() {

    },

    getValidMessageForHTML: function() {
        return this.invalidMessage.join('. <br>');
    }
}


function Validation() {}
function Data() {}

var self = this;

var data = new Data();


//-----------handlers
function onBlockedButtonTab(value) {
    if(value) {
        for(var i=0; i<buttons.length; i++) {
            buttons_tab[i].removeAttribute("disabled", true);
        }
    } else {
        for(var i=0; i<buttons.length; i++) {
            buttons_tab[i].setAttribute("disabled", false)
        }
    }
}

function activateButtonTab(currentMode, newMode) {
    
    for(var i=0; i<buttons_tab.length; i++) {
        if(buttons_tab[i].getAttribute("data-button-mode") == currentMode){
            buttons_tab[i].classList.remove('active-button');      
        }
    }

    for(i=0; i<buttons_tab.length; i++) {
        if(buttons_tab[i].getAttribute("data-button-mode") == newMode){
            buttons_tab[i].classList.add('active-button');      
        }
    }
}

function activateInput(currentMode, newMode) {

    for(var i=0; i<currentMode.length; i++) {
        currentMode[i].style.display="none"
    }
    for(var i=0; i<newMode.length;i++) {
        newMode[i].style.display="block"
    }
}

function checkData(element) {
    var button = element;
    var mode = button.getAttribute('data-mode');
    var data_object;
    var cnt;
    var cnt_;
    if(mode == "mode") {
        data_object = data.data_page_1;
        cnt = Boolean(data_object['name'] && data_object['surname'] && data_object['patronymic'] && data_object['data_birth'] && data_object['male'])
        cnt_= (cnt) ? mode : false;
        return cnt_
    } else if(mode == "mode-1") { 
        data_object = data.data_page_1;
        cnt = Boolean(data_object['phone'] && data_object['email'] && data_object['password'] && data_object['return_password'])
        cnt_= (cnt) ? mode : false;
        return cnt_
    }
}

function handlerButton(e) {
    e.preventDefault()
    var value = checkData(e.target);
    if(value ==  'mode') {
        activateInput(elements_mode, elements_mode_1)
    
        image.src="image/left_panel-mode-2.png";
    
        activateButtonTab('mode', 'mode-1')
        onBlockedButtonTab(true)

    }else if(value == 'mode-1') {
        setTimeout(self.makeid, 2500)
        activateInput(elements_mode_1, elements_mode_2)

        image.src="image/left_panel-mode-3.png";
        activateButtonTab('mode-1', 'mode-2')
        containerPhone.innerHTML = data.data_page_1['phone']
        onBlockedButtonTab(false)
    }
}

function deleteMessage(element) {
    var parent = element.parentElement
    var errorMessage = parent.querySelector('.error-message');
    if(errorMessage) {
        parent.removeChild(errorMessage);
    }
}

function displayIcon(element, value) {
    var block;
    if(value) {
        block = element.querySelector('.warning-icon');
        block.style.display = 'inline-block'
    } else {
        block = element.querySelector('.warning-icon');

        block.style.display = 'none'
    }
}

function resetValueInput(name) {
    if(data.data_page_1[name]) {
        data.resetValue(name)
    }
}

function handlerInput(e) {
    var parent = e.target.parentElement;

    if(e.target.name  == "return_password" && e.target.value != data.data_page_1['password']) {

        deleteMessage(e.target)

        var inputValidation = new Validation();
        inputValidation.validation(e.target);
        var message = inputValidation.getValidMessageForHTML();

        displayIcon(parent, true)
        e.target.insertAdjacentHTML('afterend', '<p class="error-message">' + message + '</p>');

    } else if(e.target.checkValidity() == false || !e.target.value) {

        resetValueInput(e.target.name)

        deleteMessage(e.target)
        
        var inputValidation = new Validation();
        inputValidation.validation(e.target);
        var message = inputValidation.getValidMessageForHTML();

        displayIcon(parent, true)
        e.target.insertAdjacentHTML('afterend', '<p class="error-message">' + message + '</p>');

    } else {

        deleteMessage(e.target)
        displayIcon(parent, false)

        var key = e.target.name;
        var value = e.target.value;

        data.addValue(key, value)
    }
}

function handlerButtonTab(e) {
    var button = e.target;
    var mode = button.getAttribute('data-button-mode');
    if(mode == 'mode') {
        activateInput(elements_mode_1, elements_mode)

        activateButtonTab('mode-1', 'mode')
        image.src="image/left_panel-mode-1.png";

    }else if(mode == 'mode-1') {

        activateInput(elements_mode, elements_mode_1)

        activateButtonTab('mode', 'mode-1')
        image.src="image/left_panel-mode-2.png";
    }
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    alert('Сгеннерированный id - '+text)
    return text
}


//---------------listeners
next_page_button_mode.addEventListener('click', handlerButton);


next_page_button_mode_1.addEventListener('click', handlerButton)


for(var i=0; i<buttons_tab.length; i++) {
    if(buttons_tab[i].getAttribute('data-button-mode')) {
        buttons_tab[i].addEventListener('click', handlerButtonTab)
    }
}

checkbox.addEventListener('click', function(e) {
    if(e.target.checked) {
        for(var i=0; i<buttons.length; i++) {
            next_page_button_mode.removeAttribute("disabled", true)
        }
    } else {
        for(var i=0; i<buttons.length; i++) {
            next_page_button_mode.setAttribute("disabled", false)
        }
    }  
})


for(var i=0; i<elements.elements.length; i++) {
  
    if(elements.elements[i].type == "text") {
        elements.elements[i].addEventListener('blur', handlerInput)

    } else {
        if(elements.elements[i].className == "radio" && elements.elements[i].checked) {
            var radio = elements.elements[i];
            var key = radio.name;
            var value = radio.value;

            data.addValue(key, value)
        }
    }
}





