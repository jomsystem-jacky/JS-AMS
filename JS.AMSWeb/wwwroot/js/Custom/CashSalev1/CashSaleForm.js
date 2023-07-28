"use strict";

var currentPage = 0;
function RunWizard(page) {

    if (page == undefined) {

        page = 1;
    }

    let wizard = new KTWizard('CashSale_Wizard', {
        startStep: 1,
        clickableSteps: false,
    });

    if (currentPage != undefined) {

        if (page < currentPage) {

            wizard.goTo(page);
            currentPage = page;

            return;
        }

        var isValid = Validation(currentPage);
        if (isValid) {
            wizard.goTo(page);
            currentPage = page;
        }
        else {
            wizard.goTo(currentPage);
        }

    }

}

jQuery(document).ready(function () {
    RunWizard();
});

function Validation(p) {

    if (p == 0) {

        return true;
    }

    if (p == 1) {

        var items = selectedItemInfo.length;
        if (items == 0) {
            swal.fire(
                'Error!',
                'Please at least select an item!',
                'error'
            )

            return false;
        }
    }

    if (p == 2) {

        var csInfo = GetCustomerInfo();

        if (csInfo.dCustomerName == "") {

            swal.fire(
                'Error!',
                'Please fill in customer name!',
                'error'
            )

            return false;
        }
        if (csInfo.dCustomerPhoneNo == "") {

            swal.fire(
                'Error!',
                'Please fill in customer phone number!',
                'error'
            )

            return false;
        }
        //if (csInfo.dCustomerCarBrand == "") {

        //	swal.fire(
        //		'Error!',
        //		'Please fill in customer car brand!',
        //		'error'
        //	)

        //	return false;
        //}
        //if (csInfo.dCustomerCarModel == "") {

        //	swal.fire(
        //		'Error!',
        //		'Please fill in customer car model!',
        //		'error'
        //	)

        //	return false;
        //}
        if (csInfo.dCustomerPlateNumber == "") {

            swal.fire(
                'Error!',
                'Please fill in customer car plate number!',
                'error'
            )

            return false;
        }
    }

    if (p == 3) {
        if (orderDTO.selectedPaymentMethod.name == "MULTI PAYMENT") {
            var total = orderDTO.multiPaymentMethodInfo.paymentMethodAmount_1 + orderDTO.multiPaymentMethodInfo.paymentMethodAmount_2;
            if (total < orderDTO.totalOrderAmount) {
                swal.fire(
                    'Error!',
                    'The amount paid is not enough',
                    'error'
                )
                return false;
            }
        }
        if (Object.keys(orderDTO.selectedPaymentMethod).length === 0) {

            swal.fire(
                'Error!',
                'Please select at least a Payment Method!',
                'error'
            )

            return false;
        }
    }

    UpdateWizard4();

    return true;
}

function UpdateFinalResult() {

    orderDTO = new Object();

    let totalSubtotal = Number(0);
    let totalDiscount = Number(0);

    for (var i = 0; i < selectedItemInfo.length; i++) {

        let itemBeforeDiscount = Number(ItemTotal(selectedItemInfo[i].itemInfo.pricing, selectedItemInfo[i].itemQuantity));

        totalSubtotal += Number(itemBeforeDiscount);

        if (selectedItemInfo[i].itemDiscountInfo.dItemDiscountType == "Amount") {

            totalDiscount += Number(selectedItemInfo[i].itemDiscountInfo.dItemDiscountAmount);
        }

        if (selectedItemInfo[i].itemDiscountInfo.dItemDiscountType == "Percentage") {

            // Convert the percentage discount to a decimal value
            var discountPercentage = selectedItemInfo[i].itemDiscountInfo.dItemDiscountAmount / 100;

            // Calculate the discount amount
            var discountAmount = (selectedItemInfo[i].itemInfo.pricing * selectedItemInfo[i].itemQuantity) * discountPercentage;

            totalDiscount += discountAmount;
        }

        //totalDiscount += Number(selectedItemInfo[i].itemDiscountInfo.dDiscountAmount);
    }

    let totalOrderAmount = Number(totalSubtotal);

    for (var i = 0; i < selectedTradeInItemInfo.length; i++) {

        let tradeInAmount = Number(ItemTotal(selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemPrice, selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemQuantity));
        totalOrderAmount -= Number(tradeInAmount);
    }

    var finalDTO = {

        selectedItemInfo: selectedItemInfo,
        selectedTradeInItemInfo: selectedTradeInItemInfo,
        addressInfo: addressInfo,
        customerInfo: customerInfo,
        selectedPaymentMethod: selectedPaymentMethod,
        multiPaymentMethodInfo: multiPaymentMethodInfo,
        totalSubtotal: Number(totalSubtotal),
        totalOrderAmount: Number(totalOrderAmount - totalDiscount),
        totalDiscountAmount: Number(totalDiscount)
    }
    orderDTO = finalDTO;
}

function UpdateWizard3() {

    $("#W3_Order_Info div").remove();
    $("#W3_TradeIn_Info div").remove();

    let totalItemAmount_W3 = Number(orderDTO.totalSubtotal);
    let totalOrderAmount_W3 = Number(orderDTO.totalOrderAmount);
    let totalDiscount_W3 = Number(orderDTO.totalDiscountAmount);

    var orderInfoItemRow = $("<div />");

    $(orderInfoSection_W3).append(orderInfoItemRow);

    for (var i = 0; i < orderDTO.selectedItemInfo.length; i++) {

        let itemBeforeDiscount = Number(ItemTotal(selectedItemInfo[i].itemInfo.pricing, orderDTO.selectedItemInfo[i].itemQuantity));

        //totalItemAmount_W3 += itemBeforeDiscount;
        var warrantyText = orderDTO.selectedItemInfo[i].itemWarranty?.displayText ?? "No";

        orderInfoItemRow.append($("<div class='row pb-3'>"
            + "<div class='col-7'>"
            + "<a class=''>" + orderDTO.selectedItemInfo[i].itemInfo.brandName + " " + orderDTO.selectedItemInfo[i].itemInfo.name + "</a>"
            + "</div>"
            + "<div class='col-2'>"
            + "<a class=''>x" + orderDTO.selectedItemInfo[i].itemQuantity + "</a>"
            + "</div>"
            + "<div class='col-3'>"
            + "<a class='float-right'>RM " + itemBeforeDiscount.toFixed(2) + "</a>"
            + "</div>"
            + "<div class='col-7'>"
            + "<a class='text-muted'>" + warrantyText + " Warranty</a>"
            + "</div>"
            + "</div>"
        ));
    }

    var orderInfoTradeInItemRow = $("<div />");

    $(orderTradeInSection_W3).append(orderInfoTradeInItemRow);

    for (var i = 0; i < selectedTradeInItemInfo.length; i++) {

        let tradeInAmount = Number(ItemTotal(selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemPrice, selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemQuantity));

        orderInfoTradeInItemRow.append($("<div class='row pb-3'>"
            + "<div class='col-9'>"
            + "<a class='text-muted'>x " + selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemQuantity + " " + selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemLabel + "</a>"
            + "</div>"
            + "<div class='col-3'>"
            + "<a class='float-right'>-RM " + tradeInAmount.toFixed(2) + "</a>"
            + "</div>"
            + "</div>"
        ));
    }

    subtotal_W3.innerHTML = "RM " + totalItemAmount_W3.toFixed(2);
    orderTotal_W3.innerHTML = "RM " + totalOrderAmount_W3.toFixed(2);
    discountTotal_W3.innerHTML = "-RM " + totalDiscount_W3.toFixed(2);

}

function UpdateWizard4() {

    const today = new Date();

    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);

    $("#W4_Customer_Info div").remove();
    $("#W4_Order_Info div").remove();
    $("#W4_TradeIn_Info div").remove();

    let totalItemAmount_W4 = Number(orderDTO.totalSubtotal);
    let totalOrderAmount_W4 = Number(orderDTO.totalOrderAmount);
    let totalDiscount_W4 = Number(orderDTO.totalDiscountAmount);

    var orderInfoItemRow = $("<div />");

    $(orderInfoSection_W4).append(orderInfoItemRow);

    for (var i = 0; i < orderDTO.selectedItemInfo.length; i++) {

        let itemBeforeDiscount = Number(ItemTotal(selectedItemInfo[i].itemInfo.pricing, orderDTO.selectedItemInfo[i].itemQuantity));

        //totalItemAmount_W3 += itemBeforeDiscount;
        var warrantyText = orderDTO.selectedItemInfo[i].itemWarranty?.displayText ?? "No";

        orderInfoItemRow.append($("<div class='row pb-3'>"
            + "<div class='col-7'>"
            + "<a class=''>" + orderDTO.selectedItemInfo[i].itemInfo.brandName + " " + orderDTO.selectedItemInfo[i].itemInfo.name + "</a>"
            + "</div>"
            + "<div class='col-2'>"
            + "<a class=''>x" + orderDTO.selectedItemInfo[i].itemQuantity + "</a>"
            + "</div>"
            + "<div class='col-3'>"
            + "<a class='float-right'>RM " + itemBeforeDiscount.toFixed(2) + "</a>"
            + "</div>"
            + "<div class='col-7'>"
            + "<a class='text-muted'>" + warrantyText + " Warranty</a>"
            + "</div>"
            + "</div>"
        ));
    }

    var orderInfoTradeInItemRow = $("<div />");

    $(orderTradeInSection_W4).append(orderInfoTradeInItemRow);

    for (var i = 0; i < selectedTradeInItemInfo.length; i++) {

        let tradeInAmount = Number(ItemTotal(selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemPrice, selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemQuantity));

        orderInfoTradeInItemRow.append($("<div class='row pb-3'>"
            + "<div class='col-9'>"
            + "<a class='text-muted'>x " + selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemQuantity + " " + selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemLabel + "</a>"
            + "</div>"
            + "<div class='col-3'>"
            + "<a class='float-right'>-RM " + tradeInAmount.toFixed(2) + "</a>"
            + "</div>"
            + "</div>"
        ));
    }
    subtotal_W4.innerHTML = "RM " + totalItemAmount_W4.toFixed(2);
    orderTotal_W4.innerHTML = "RM " + totalOrderAmount_W4.toFixed(2);
    discountTotal_W4.innerHTML = "-RM " + totalDiscount_W4.toFixed(2);
    customerName_W4.innerHTML = customerInfo.dCustomerName;
    customerPhoneNo_W4.innerHTML = customerInfo.dCustomerPhoneNo;
    address_W4.innerHTML = customerInfo.dCustomerAddress;
    plateNumber_W4.innerHTML = customerInfo.dCustomerPlateNumber;
    orderDate_W4.innerHTML = formattedDate;

    $.ajax({
        type: "POST",
        url: "/api/v1/RunningNoAPI/GetCashSalesCurrentRunningNo",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            "branchId": branchId,
        }),
        beforeSend: function () {
            //swal.showLoading();
        },
        success: function (data, textStatus, jqXHR) {
            orderID_W4.innerHTML = data;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        },
        complete: function () {
            //swal.hideLoading();
        }
    })

}

function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function SubmitOrder(printReceipt, size) {

    var formData = new FormData();
    // Append data to the FormData object
    if (orderDTO.customerInfo.dCustomerIndividualClientId) {
        formData.append('IndividualClientId', orderDTO.customerInfo.dCustomerIndividualClientId);
    }
    else {
        formData.append('CustomerName', orderDTO.customerInfo.dCustomerName);
        formData.append('CustomerEmail', orderDTO.customerInfo.dCustomerEmail);
        formData.append('CustomerPhoneNo', orderDTO.customerInfo.dCustomerPhoneNo);
        formData.append('CityId', orderDTO.addressInfo.CityId ?? "");
        formData.append('Address1', orderDTO.addressInfo.Address1 ?? "");
        formData.append('Address2', orderDTO.addressInfo.Address2 ?? "");
        formData.append('Address3', orderDTO.addressInfo.Address3 ?? "");
        formData.append('AddressName', "Individual Address");
        formData.append('PostalCode', orderDTO.addressInfo.PostCode ?? "");
        formData.append('Latitude', orderDTO.addressInfo.Latitude ?? "");
        formData.append('Longitude', orderDTO.addressInfo.Longitude ?? "");
    }
    if (orderDTO.customerInfo.dVehicleId) {
        formData.append('VehicleId', orderDTO.customerInfo.dVehicleId);
    }
    else {
        formData.append('VehicleModelId', orderDTO.customerInfo.dCustomerCarModel);
        formData.append('VehicleBrandId', orderDTO.customerInfo.dCustomerCarBrand);
        formData.append('PlateNumber', orderDTO.customerInfo.dCustomerPlateNumber);
        formData.append('VehicleType', orderDTO.customerInfo.dCustomerVehicleType);
    }

    //add item
    for (let i = 0; i < orderDTO.selectedItemInfo.length; i++) {
        let selected = orderDTO.selectedItemInfo[i];
        formData.append(`SalesItems[${i}].ProductId`, selected.itemInfo.productId);
        formData.append(`SalesItems[${i}].ProductName`, selected.itemInfo.name);
        formData.append(`SalesItems[${i}].Quantity`, selected.itemQuantity);
        formData.append(`SalesItems[${i}].UnitPrice`, selected.itemInfo.pricing);
        formData.append(`SalesItems[${i}].CurrencyId`, selected.itemInfo.currencyId);

        let discountInfo = selected.itemDiscountInfo;
        if (!isObjectEmpty(discountInfo)) {
            formData.append(`SalesItems[${i}].DiscountAmount`, discountInfo.dItemDiscountAmount);
            formData.append(`SalesItems[${i}].DiscountType`, discountInfo.dItemDiscountType);
        }

        let warranty = selected.itemWarranty;
        if (!isObjectEmpty(warranty)) {
            formData.append(`SalesItems[${i}].WarrantyId`, warranty.warrantyId);
            formData.append(`SalesItems[${i}].WarrantyName`, warranty.displayText);
        }
    }
    console.log(orderDTO);
    //add payment
    if (selectedPaymentMethod.name == "MULTI PAYMENT") {

        let selected = orderDTO.multiPaymentMethodInfo;
        formData.append(`Payments[${0}].PaymentId`, selected.multiPaymentSelection_1);
        formData.append(`Payments[${0}].PaymentReceipt`, selected.paymentReceipt1);
        formData.append(`Payments[${0}].PaymentReceiptName`, selected.paymentReceiptName1);
        formData.append(`Payments[${0}].Amount`, selected.paymentMethodAmount_1);
        formData.append(`Payments[${0}].PaymentName`, selected.multiPaymentSelectionLabel_1);

        formData.append(`Payments[${1}].PaymentId`, selected.multiPaymentSelection_2);
        formData.append(`Payments[${1}].PaymentReceipt`, selected.paymentReceipt2);
        formData.append(`Payments[${1}].PaymentReceiptName`, selected.paymentReceiptName2);
        formData.append(`Payments[${1}].Amount`, selected.paymentMethodAmount_2);
        formData.append(`Payments[${1}].PaymentName`, selected.multiPaymentSelectionLabel_2);
    }
    else {
        let selected = orderDTO.selectedPaymentMethod;
        formData.append(`Payments[${0}].PaymentId`, selected.id);
        formData.append(`Payments[${0}].PaymentReceipt`, selected.paymentReceipt);
        formData.append(`Payments[${0}].PaymentReceiptName`, selected.paymentReceiptName);
        formData.append(`Payments[${0}].PaymentName`, selected.name);
        formData.append(`Payments[${0}].Amount`, orderDTO.totalOrderAmount);
    }

    //add trade in items
    for (let i = 0; i < orderDTO.selectedTradeInItemInfo.length; i++) {
        let selected = orderDTO.selectedTradeInItemInfo[i];
        formData.append(`TradeInItems[${i}].ProductId`, selected.tradeInInfo.dTradeInItemId);
        formData.append(`TradeInItems[${i}].Quantity`, selected.tradeInInfo.dTradeInItemQuantity);
        formData.append(`TradeInItems[${i}].TradeInPrice`, selected.tradeInInfo.dTradeInItemPrice);
        formData.append(`TradeInItems[${i}].ProductName`, selected.tradeInInfo.dTradeInItemLabel);
    }

    formData.append('CashSalesNo', orderID_W4.textContent);
    formData.append('CreatedBy', username);
    formData.append('CompanyId', companyId);
    formData.append('BranchId', branchId);
    formData.append('IsPrintReceipt', printReceipt);
    if (size == "A4") {
        formData.append('ReceiptType', 1);
    }
    else {
        formData.append('ReceiptType', 2);
    }

    if (printReceipt) {
        $.ajax({
            method: "POST",
            url: "/API/v1/CashSalesAPI/CreateCashSales",
            contentType: false,
            processData: false,
            data: formData,
            async: true,
            beforeSend: function () {
                ShowLoading("Generating Receipt");
            },
            xhr: function () {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 2) {
                        if (xhr.status == 200) {
                            xhr.responseType = "blob";
                        } else {
                            xhr.responseType = "text";
                        }
                    }
                };
                return xhr;
            },
            success: function (data) {
                var blob = new Blob([data], { type: "application/pdf" });
                var link = URL.createObjectURL(blob);

                var newWindow = window.open(link, "_blank");
                newWindow.onload = function () {
                    newWindow.print();
                };
                window.location.reload();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                ShowFailMessageBox(jqXHR.responseText);
            },
            complete: function () {
                swal.hideLoading();
            }
        });
    }
    else {
        $.ajax({
            method: "POST",
            url: "/API/v1/CashSalesAPI/CreateCashSales",
            contentType: false,
            processData: false,
            data: formData,
            async: true,
            beforeSend: function () {
                ShowLoading("Creating Cash Sales");
            },
            success: function (data, textStatus, jqXHR) {
                ShowSuccessfulMessageBox("Added Successfully!")
                    .then((result) => {
                        window.location.reload();
                    });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                ShowFailMessageBox(jqXHR.responseText);
            },
            complete: function () {
                swal.hideLoading();
            }
        });

    }



}