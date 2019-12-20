window.onload = function() {
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
    var tableBody = document.getElementsByTagName("tbody")[0];
    (function loadJsonData() {
        for (var i = 0, len = cartProducts.length; i <= len; i++) {
            var row = tableBody.insertRow(tableBody.length);
            var product = cartProducts[i];
            for (var j = 0, len = document.getElementsByTagName('th').length; j < len; j++) {
                var col = row.insertCell(j);
                addElement(col, product, j);
            }
        }
    })();
    var checkOne = document.getElementsByClassName("checkOne");
    var subtotalPrice = document.getElementsByClassName("subtotalPrice");
    var perPrice = document.getElementsByClassName("perPrice");
    var subtotalCount = document.getElementsByClassName("subtotalCount");
    var totalCount = document.getElementsByClassName("totalCount")[0];
    var totalPrice = document.getElementsByClassName("totalPrice")[0];
    count();
    countAll();
    var checkAll = document.getElementById("checkAll");
    tableBody.addEventListener("click", function(event) {
        if (event.target.className === "checkOne") {
            if (isAllSelected()) {
                checkAll.checked = true;
            } else {
                checkAll.checked = false;
            }
            countAll();
        } else if (event.target.className === "button buttonDecrease") {
            var num = parseInt(event.target.nextElementSibling.innerHTML);
            num -= 1;
            if (num > 0) {
                event.target.nextElementSibling.innerHTML = num;
            } else {
                event.target.parentNode.parentNode.remove();
            }
            count();
            countAll();
        } else if (event.target.className === "button buttonIncrease") {
            var num = parseInt(event.target.previousElementSibling.innerHTML);
            num += 1;
            event.target.previousElementSibling.innerHTML = num;
            count();
            countAll();
        }
    });
    var tableFoot = document.getElementsByTagName("tfoot")[0];
    tableFoot.addEventListener("click", function(event) {
        if (event.target.className === "checkAll") {
            for (var i = 0; i < checkOne.length; i++) {
                checkOne[i].checked = event.target.checked;
            }
            checkAll.checked = event.target.checked;
            countAll();
        }
    });


    function addElement(element, product, num) {
        switch (num) {
            case (0):
                var hasChecked = product.checked ? "checked" : "";
                element.innerHTML = `<input class="checkOne" type="checkbox" name="checkOne" ${hasChecked} />`;
                break;
            case (1):
                element.innerHTML = `${product.name}`;
                break;
            case (2):
                element.innerHTML = `<span class="perPrice">${product.price}</span>`;
                break;
            case (3):
                element.innerHTML = `<button class="button buttonDecrease">-</button>` +
                    `<span class="subtotalCount">${product.count}</span>` +
                    `<button class = "button buttonIncrease" > + </button>`
                break;
            case (4):
                element.innerHTML = `<span class="subtotalPrice">${ product.price * product.count}</span>`;
                break;
        }
    }

    function count() {
        for (var i = 0; i < subtotalPrice.length; i++) {
            subtotalPrice[i].innerHTML = (parseFloat(perPrice[i].innerHTML) * parseFloat(subtotalCount[i].innerHTML));
        }
    }

    function countAll() {
        var n1 = 0;
        var n2 = 0;
        for (var i = 0; i < checkOne.length; i++) {
            if (checkOne[i].checked == true) {
                n1 += parseInt(subtotalCount[i].innerHTML);
                n2 += parseFloat(subtotalPrice[i].innerHTML);
            }
        }
        totalCount.innerHTML = n1;
        totalPrice.innerHTML = n2;
    }

    function isAllSelected() {
        var isAllSelected = true;
        for (var i = 0; i < checkOne.length; i++) {
            if (checkOne[i].checked == false) {
                isAllSelected = false;
                break;
            }
        }
        return isAllSelected;
    }

};