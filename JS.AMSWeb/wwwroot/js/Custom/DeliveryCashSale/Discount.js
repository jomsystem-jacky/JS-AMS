function UpdateDiscount() {

    itemDiscountInfo = new Object();

    var dItemDiscountAmount = itemDiscountAmount.value;
    var dItemDiscountType = itemDiscountType.value;

    var selectedDiscountInfoDTO = {

        dItemDiscountAmount: dItemDiscountAmount,
        dItemDiscountType: dItemDiscountType,
    }

    itemDiscountInfo = selectedDiscountInfoDTO;

    $('#btnDiscountModalClose').trigger('click');

    if (itemDiscountInfo.dItemDiscountType == "Amount") {
        labelDiscount.innerHTML = "RM " + itemDiscountInfo.dItemDiscountAmount;
    }

    if (itemDiscountInfo.dItemDiscountType == "Percentage") {
        labelDiscount.innerHTML = itemDiscountInfo.dItemDiscountAmount + "%";
    }
    return;
}