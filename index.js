window.onload = function() {
    // 商品列表 JSON 数据
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
    // 读取商品列表，并增加节点到表格中
    var table = document.getElementById("shoppingList");
    //将JSON中的数据以新的节点方式加入购物车
    (function loadJsonData() {
        for (var i = 0, len = cartProducts.length; i <= len; i++) {
            var row = table.insertRow(table.rows.length - 1); //增加一行
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
    //计算总价
    count(); //计算每一行的总价
    countAll(); //计算购物车的总价
    // 更新选择框
    // 更新全选
    var checkAll = document.getElementById("checkAll");
    checkAll.onclick = function() {
        for (var i = 0; i < checkOne.length; i++) {
            checkOne[i].checked = this.checked;
        }
        checkAll.checked = this.checked;
        countAll();
    };
    // 更新单选
    for (var i = 0; i < checkOne.length; i++) {
        checkOne[i].onclick = function() {
            if (isAllSelected()) {
                checkAll.checked = true;
            } else {
                checkAll.checked = false;
            }
            countAll();
        }
    }
    //更新商品数量
    var buttonDecrease = document.getElementsByClassName("buttonDecrease");
    var buttonIncrease = document.getElementsByClassName("buttonIncrease");
    for (var i = 0; i < buttonDecrease.length; i++) {
        buttonDecrease[i].onclick = function() {
            var num = parseInt(this.parentNode.childNodes[1].innerHTML);
            num -= 1;
            if (num > 0) {
                this.parentNode.childNodes[1].innerHTML = num;
            } else {
                this.parentNode.parentNode.remove();
            }
            count();
            countAll();
        };
        buttonIncrease[i].onclick = function() {
            var num = parseInt(this.parentNode.childNodes[1].innerHTML);
            num += 1;
            this.parentNode.childNodes[1].innerHTML = num;
            count();
            countAll();
        };
    }
    //相关函数
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