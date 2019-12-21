var cartProducts = [{
        "id": 1,
        "name": "英雄牌 钢笔",
        "count": 1,
        "price": 69,
        "checked": false
    },
    {
        "id": 2,
        "name": "晨光牌 铅字笔",
        "count": 2,
        "price": 5.5,
        "checked": true
    },
    {
        "id": 3,
        "name": "晨光牌 铅笔",
        "count": 1,
        "price": 2,
        "checked": false
    },
    {
        "id": 4,
        "name": "狗熊牌 橡皮擦",
        "count": 1,
        "price": 1,
        "checked": false
    },
    {
        "id": 5,
        "name": "瑞士牌 双肩书包",
        "count": 1,
        "price": 199,
        "checked": true
    },
    {
        "id": 6,
        "name": "晨光牌 作业本",
        "count": 5,
        "price": 2.5,
        "checked": false
    }
];
var tableBody = document.getElementsByTagName('tbody')[0];
var checkOne = document.getElementsByClassName('check-one');
var subtotalPrice = document.getElementsByClassName('subtotal-price');
var perPrice = document.getElementsByClassName('per-price');
var subtotalCount = document.getElementsByClassName('subtotal-count');
var totalCount = document.getElementsByClassName('total-count')[0];
var totalPrice = document.getElementsByClassName('total-price')[0];
var tableFoot = document.getElementsByTagName('tfoot')[0];
var checkAll = document.getElementById('checkAll');
loadJsonData();
count();
countAll();
tableBody.addEventListener('click', function(event) {
    switch (event.target.className) {
        case 'check-one':
            checkOneEvent(event);
            break;
        case 'button button-decrease':
            buttonDecreaseEvent(event);
            break;
        case 'button button-increase':
            buttonIncreaseEvent(event);
            break;
    }
});
tableFoot.addEventListener('click', function(event) {
    if ('check-all' === event.target.className) {
        checkAllEvent(event);
    }
});

function loadJsonData() {
    for (var i = 0, len = cartProducts.length; i <= len; i++) {
        var row = tableBody.insertRow(tableBody.length);
        var product = cartProducts[i];
        for (var j = 0, len = document.getElementsByTagName('th').length; j < len; j++) {
            var col = row.insertCell(j);
            addElement(col, product, j);
        }
    }
}

function addElement(element, product, num) {
    switch (num) {
        case (0):
            var hasChecked = product.checked ? "checked" : "";
            element.innerHTML = `<input class="check-one" type="checkbox" name="checkOne" ${hasChecked} />`;
            break;
        case (1):
            element.innerHTML = `${product.name}`;
            break;
        case (2):
            element.innerHTML = `<span class="per-price">${product.price}</span>`;
            break;
        case (3):
            element.innerHTML = `<button class="button button-decrease">-</button>
                <span class="subtotal-count">${product.count}</span>
                <button class = "button button-increase" > + </button>`;
            break;
        case (4):
            element.innerHTML = `<span class="subtotal-price">${ product.price * product.count}</span>`;
            break;
    }
}

function count() {
    for (var i = 0, len = subtotalPrice.length; i < len; i++) {
        subtotalPrice[i].innerHTML = (parseFloat(perPrice[i].innerHTML) * parseFloat(subtotalCount[i].innerHTML));
    }
}

function countAll() {
    var totalCountInitial = 0;
    var totalPriceInitial = 0;
    for (var i = 0, len = checkOne.length; i < len; i++) {
        if (checkOne[i].checked) {
            totalCountInitial += parseInt(subtotalCount[i].innerHTML);
            totalPriceInitial += parseFloat(subtotalPrice[i].innerHTML);
        }
    }
    totalCount.innerHTML = totalCountInitial;
    totalPrice.innerHTML = totalPriceInitial;
}

function isAllSelected() {
    var isAllSelected = true;
    for (var i = 0, len = checkOne.length; i < len; i++) {
        if (!checkOne[i].checked) {
            isAllSelected = false;
            break;
        }
    }
    return isAllSelected;
}

function buttonDecreaseEvent(event) {
    var productCount = parseInt(event.target.nextElementSibling.innerHTML);
    productCount -= 1;
    if (productCount > 0) {
        event.target.nextElementSibling.innerHTML = productCount;
    } else {
        event.target.parentNode.parentNode.remove();
    }
    count();
    countAll();
}

function buttonIncreaseEvent(event) {
    var productCount = parseInt(event.target.previousElementSibling.innerHTML);
    productCount += 1;
    event.target.previousElementSibling.innerHTML = productCount;
    count();
    countAll();
}

function checkOneEvent(event) {
    if (isAllSelected()) {
        checkAll.checked = true;
    } else {
        checkAll.checked = false;
    }
    countAll();
}

function checkAllEvent(event) {
    for (var i = 0, len = checkOne.length; i < len; i++) {
        checkOne[i].checked = event.target.checked;
    }
    checkAll.checked = event.target.checked;
    countAll();
}