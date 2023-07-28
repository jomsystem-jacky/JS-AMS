let tempDiscountInfo = new Object();

function SelectDiscountType(type) {

    if (type == "Amount") {

        var discountAmountLabel = document.getElementById("DiscountAmountLabel");
        discountAmountLabel.innerText = "Amount";
    }

    if (type == "Percentage") {

        var discountAmountLabel = document.getElementById("DiscountAmountLabel");
        discountAmountLabel.innerText = "Percentage";
    }
}

function UpdateDiscount() {

    var closeButton = document.getElementById("ItemDiscountModalCloseBtn");
    closeButton.click();

    var labelDiscount = document.getElementById("W1_LabelDiscount");

    var dItemDiscountAmount = document.getElementById("W1_DiscountAmount").value;
    var dItemDiscountType = document.getElementById("W1_DiscountType").value;

    if (dItemDiscountType == "Amount") {
        labelDiscount.innerHTML = "RM " + dItemDiscountAmount;
    }

    if (dItemDiscountType == "Percentage") {
        labelDiscount.innerHTML = dItemDiscountAmount + "%";
    }

    tempDiscountInfo = {
        type: dItemDiscountType,
        amount: dItemDiscountAmount
    }

    console.log(tempDiscountInfo);
}