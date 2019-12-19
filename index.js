window.onload = function() {
    // 商品列表 JSON 数据
    var carProducts = [{
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
    // 读取商品列表，并增加到节点到表格中
    var table = document.getElementById("shopping-cart-table");
    // console.log(table);
    //将JSON中的数据以新的节点方式加入购物车
    for (var i = 0; i < carProducts.length; i++) {
        var row = table.insertRow(table.rows.length - 1); //增加一行
        var products = carProducts[i];

        var c1 = row.insertCell(0); //增加一列
        var input = document.createElement("input");
        input.setAttribute("class", "select");
        input.setAttribute("type", "checkbox");
        // console.log("okkkk");
        if (products.checked == true) {
            // input.setAttribute("checked", false);
            input.checked = true;
        }
        c1.appendChild(input);
        // console.log(c1);


        var c2 = row.insertCell(1);
        c2.innerHTML = products.name;

        var c3 = row.insertCell(2);
        var perPrice = document.createElement("text");
        perPrice.setAttribute("class", "perprice");
        perPrice.innerHTML = products.price;
        c3.appendChild(perPrice);



        var c4 = row.insertCell(3);

        var number = document.createElement("div");
        number.setAttribute("class", "product-number");
        c4.appendChild(number);

        var number_decrease = document.createElement("button");
        number_decrease.setAttribute("class", "button button_decrease");
        number_decrease.innerHTML = '-';
        number.appendChild(number_decrease);

        var number_product = document.createElement("text");
        number_product.setAttribute("class", "number-of-products");
        number_product.innerHTML = products.count;
        number.appendChild(number_product);

        var number_increase = document.createElement("button");
        number_increase.setAttribute("class", "button button_increase");
        number_increase.innerHTML = '+';
        number.appendChild(number_increase);

        var c5 = row.insertCell(4);
        var totalPriceOfProducts = document.createElement("text");
        totalPriceOfProducts.setAttribute("class", "total-price-products");
        totalPriceOfProducts.innerHTML = products.price * number_product.innerHTML;
        c5.appendChild(totalPriceOfProducts);



    }
    //计算总价
    count(); //计算每一行的总价
    countAll(); //计算购物车的总价

    // var totalNumberOfProduct = document.getElementById("numOfGoods");
    // var totalPriceOfShopping = document.getElementById("priceOfGoods");
    // // console.log(totalNumberOfProduct.innerHTML);
    // // console.log(totalPriceOfShopping.innerHTML);

    // 更新选择框
    var select = document.getElementsByClassName("select");
    // console.log(select.length);
    var selectAll = document.getElementById("check-all");
    selectAll.onclick = function() {
        for (var i = 0; i < select.length; i++) {
            select[i].checked = this.checked;
        }
        selectAll.checked = this.checked;
        countAll();
    };

    // console.log(select.length);
    for (var i = 0; i < select.length; i++) {
        select[i].onclick = function() {
            if (isAllSelected()) {
                selectAll.checked = true;
            } else {
                selectAll.checked = false;
            }
            countAll();
        }
    }




    //商品数量更新
    var number_decrease = document.getElementsByClassName("button_decrease");
    var number_increase = document.getElementsByClassName("button_increase");
    var tr = document.getElementsByTagName("tr");
    for (var i = 0; i < number_decrease.length; i++) {
        console.log(i);
        number_decrease[i].onclick = function() {
            // console.log(this.parentNode.childNodes[1].innerHTML);
            var num = parseInt(this.parentNode.childNodes[1].innerHTML);
            num -= 1;
            if (num > 0) {
                this.parentNode.childNodes[1].innerHTML = num;
            } else {
                this.parentNode.parentNode.parentNode.remove();
            }
            count();
            countAll();
        };
        number_increase[i].onclick = function() {
            // console.log(this.parentNode.childNodes[1].innerHTML);
            var num = parseInt(this.parentNode.childNodes[1].innerHTML);
            num += 1;
            this.parentNode.childNodes[1].innerHTML = num;
            count();
            countAll();
        };
    }




    function count() {
        var totalPriceOfProducts = document.getElementsByClassName("total-price-products");
        var perPrice = document.getElementsByClassName("perprice");
        var number_product = document.getElementsByClassName("number-of-products");
        for (var i = 0; i < totalPriceOfProducts.length; i++) {
            totalPriceOfProducts[i].innerHTML = (parseFloat(perPrice[i].innerHTML) * parseFloat(number_product[i].innerHTML));
        }
    }

    function countAll() {
        var n1 = 0;
        var n2 = 0;
        var totalPriceOfProducts = document.getElementsByClassName("total-price-products");
        var number_product = document.getElementsByClassName("number-of-products");
        var totalNumberOfProduct = document.getElementById("numOfGoods");
        var totalPriceOfShopping = document.getElementById("priceOfGoods");

        var select = document.getElementsByClassName("select");
        for (var i = 0; i < select.length; i++) {
            if (select[i].checked == true) {
                n1 += parseInt(number_product[i].innerHTML);
                n2 += parseFloat(totalPriceOfProducts[i].innerHTML);
            }
        }
        totalNumberOfProduct.innerHTML = n1;
        totalPriceOfShopping.innerHTML = n2;
    }

    function isAllSelected() {
        var select = document.getElementsByClassName("select");
        var isAllSelected = false;
        for (var i = 0; i < select.length; i++) {
            if (select[i] == false) {
                isAllSelected == false;
            }
        }
        return isAllSelected;
    }

};