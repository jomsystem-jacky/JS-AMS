"use strict";

const paymentMethodOptionSection = "#PaymentMethodOptionSection";
//const itemWarrantyLabelSection = "#WarrantyLabelSection";

var loadedPaymentMethods = new Array();

const paymentMethodModal = $('#addPaymentMethodModal');
paymentMethodModal.on('shown.bs.modal', function () {
    //console.log('W Modal is open');
    //console.log(tempSelectedPaymentMethod);
    //console.log(selectedPaymentMethod);
});
paymentMethodModal.on('hidden.bs.modal', function () {
    //console.log('W Modal is closed');
    //console.log(tempSelectedPaymentMethod);
    //console.log(selectedPaymentMethod);

});

const multiPaymentMethodModal = $('#addMultiPaymentMethodModal');
multiPaymentMethodModal.on('shown.bs.modal', function () {
    //console.log('W Modal is open');
});
multiPaymentMethodModal.on('hidden.bs.modal', function () {
    //console.log('W Modal is closed');

    if (Object.keys(multiPaymentMethodInfo).length === 0) {

        paymentMethodLabel_W3.innerHTML = "<a class=''>Select a Payment Method</a>";
        return;
    }
});


async function RunPaymentMethodModal() {

    OpenPaymentModal();

    $("#PaymentMethodOptionSection div").remove();

    var paymentMethodSelectionResult = await GetPaymentMethodOption();

    DrawPaymentMethodSelection(paymentMethodSelectionResult);
}

function GetPaymentMethodOption() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            method: 'POST',
            url: '/Administration/GeneralSettings/PaymentMethod/GetAllPaymentMethods',
            contentType: 'application/x-www-form-urlencoded',
        })
            .done(function (paymentMethodResult) {
                resolve(paymentMethodResult);
            })
            .fail(function (jqxhr) {
                reject(new Error(jqxhr.responseText));
            });
    });
}

function DrawPaymentMethodSelection(paymentMethods) {

    for (var i = 0; i < paymentMethods.length; i++) {

        loadedPaymentMethods.push(paymentMethods[i]);

        var paymentMethodOptionRow = $("<div class='py-2'/>");

        $(paymentMethodOptionSection).append(paymentMethodOptionRow);

        paymentMethodOptionRow.append($("<div class='card w-100 py-3 d-flex justify-content-start' onclick='UpdateSelectedPaymentMethod(\"" + paymentMethods[i].id + "\")'>"
            + "<a class='d-block text-left font-size-h5 pl-5'>" + paymentMethods[i].name + "</a>"
            + "<span></span></div>"
        ));
    }

    return;
}



//function DrawWarrantySelection(warrantyOptions) {

//    $("#WarrantyOptionsSection div").remove();

//    for (var i = 0; i < warrantyOptions.length; i++) {

//        loadedItemWarranties.push(warrantyOptions[i]);

//        var warrantyOptionRow = $("<div class=''/>");

//        $(itemWarrantySection).append(warrantyOptionRow);

//        warrantyOptionRow.append($("<div class='card w-100 py-4 d-flex justify-content-start' onclick='UpdateSelectedItemWarranty(\"" + warrantyOptions[i].productWarrantyId + "\")'>"
//            + "<a class='d-block text-left font-size-h5 pl-5'>" + warrantyOptions[i].displayText + "</a>"
//            + "<span></span></div>"
//        ));
//    }

//    return;
//}

function UpdateSelectedPaymentMethod(paymentMethodId) {

    const selectedPaymentMethodOption = loadedPaymentMethods.find(itemLoadedPaymentMethods => itemLoadedPaymentMethods.id === paymentMethodId);

    tempSelectedPaymentMethod = selectedPaymentMethodOption;

    if (tempSelectedPaymentMethod.name == "MULTI PAYMENT") {
        ClosePaymentMethodModal();

        paymentMethodLabel_W3.innerHTML = "<a class=''>MULTI PAYMENT</a>";

        OpenMultiPaymentModal();
    }
    else {
        ClosePaymentMethodModal();
        paymentMethodLabel_W3.innerHTML = "<a class=''>" + tempSelectedPaymentMethod.name + "</a>";
        selectedPaymentMethod = tempSelectedPaymentMethod;

        UpdateFinalResult();
        DrawPaymentInfo();
    }

    return;
}

async function OpenPaymentModal() {

    $('#addPaymentMethodModal').modal('show');
    $('#addMultiPaymentMethodModal').modal('hide');
}

async function OpenMultiPaymentModal() {

    ClearMultiPaymentOptions(multiPaymentSelection_1);
    ClearMultiPaymentOptions(multiPaymentSelection_2);

    $('#addPaymentMethodModal').modal('hide');
    $('#addMultiPaymentMethodModal').modal('show');

    var paymentMethodSelectionResult = await GetPaymentMethodOption();

    paymentMethodSelectionResult = paymentMethodSelectionResult.filter(function (item) {
        return item.name !== "MULTI PAYMENT";
    });

    paymentMethodSelectionResult.forEach(function (paymentMethod) {
        var option = document.createElement('option');
        option.text = paymentMethod.name;
        option.value = paymentMethod.id;
        multiPaymentSelection_1.appendChild(option);
    });

    paymentMethodSelectionResult.forEach(function (paymentMethod) {
        var option = document.createElement('option');
        option.text = paymentMethod.name;
        option.value = paymentMethod.id;
        multiPaymentSelection_2.appendChild(option);
    });
}

function ClearMultiPaymentOptions(selectElementId) {

    selectElementId.innerHTML = "";
}

function UpdatePaymentModal() {

    selectedPaymentMethod = tempSelectedPaymentMethod;

    $('#addMultiPaymentMethodModal').modal('hide');

    multiPaymentMethodInfo = new Object();

    var selectedValue1 = multiPaymentSelection_1.value;
    var selectedOption1 = multiPaymentSelection_1.querySelector('option[value="' + selectedValue1 + '"]');
    var selectedText1 = selectedOption1.textContent;

    var selectedValue2 = multiPaymentSelection_2.value;
    var selectedOption2 = multiPaymentSelection_2.querySelector('option[value="' + selectedValue2 + '"]');
    var selectedText2 = selectedOption2.textContent;

    var multiPaymentDTO = {

        paymentMethodAmount_1: Number(paymentMethodAmount_1.value),
        paymentMethodAmount_2: Number(paymentMethodAmount_2.value),
        multiPaymentSelectionLabel_1: selectedText1,
        multiPaymentSelectionLabel_2: selectedText2,
        multiPaymentSelection_1: multiPaymentSelection_1.value,
        multiPaymentSelection_2: multiPaymentSelection_2.value
    }

    multiPaymentMethodInfo = multiPaymentDTO;

    const selectedPaymentMethodOption = loadedPaymentMethods.find(itemLoadedPaymentMethods => itemLoadedPaymentMethods.name === "MULTI PAYMENT");

    paymentMethodLabel_W3.innerHTML = "<a class=''>" + tempSelectedPaymentMethod.name + "</a>";
    selectedPaymentMethod = tempSelectedPaymentMethod;

    UpdateFinalResult();
    DrawPaymentInfo();
}

function DrawPaymentInfo() {

    console.log(orderDTO);

    $("#W3_PaymentMethod_Info div").remove();

    var paymentInfoRow = $("<div class='py-2'/>");

    $(orderPaymentSection_W3).append(paymentInfoRow);

    if (orderDTO.selectedPaymentMethod.name != "MULTI PAYMENT") {

        paymentInfoRow.append($("<div class='row pb-3'>"
            + "<div class='col-9'>"
            + "<a class=''>" + orderDTO.selectedPaymentMethod.name + "</a>"
            + "</div>"
            //+ "<div class='col-3'>"
            //+ "<a class='float-right'>RM " + tradeInAmount.toFixed(2) + "</a>"
            //+ "</div>"
            + "</div>"
        ));
    }

    if (orderDTO.selectedPaymentMethod.name == "MULTI PAYMENT") {

        paymentInfoRow.append($("<div class='row pb-3'>"
            + "<div class='col-9'>"
            + "<a class=''>" + orderDTO.selectedPaymentMethod.name + "</a>"
            + "</div>"
            + "</div>"
            + "<div class='row pb-3'>"
            + "<div class='col-9'>"
            + "<a class='text-muted'>" + orderDTO.multiPaymentMethodInfo.multiPaymentSelectionLabel_1 + "</a>"
            + "</div>"
            + "<div class='col-3'>"
            + "<a class='float-right'>RM " + orderDTO.multiPaymentMethodInfo.paymentMethodAmount_1.toFixed(2) + "</a>"
            + "</div>"
            + "</div>"
            + "<div class='row pb-3'>"
            + "<div class='col-9'>"
            + "<a class='text-muted'>" + orderDTO.multiPaymentMethodInfo.multiPaymentSelectionLabel_2 + "</a>"
            + "</div>"
            + "<div class='col-3'>"
            + "<a class='float-right'>RM " + orderDTO.multiPaymentMethodInfo.paymentMethodAmount_2.toFixed(2) + "</a>"
            + "</div>"
            + "</div>"
        ));
    }

}

function CloseMultiPaymentMethodModal() {

    $('#addMultiPaymentMethodModal').modal('hide');
}

function ClosePaymentMethodModal() {

    $('#addPaymentMethodModal').modal('hide');
}


//function DrawWarranty(tempWarrantyItem) {

//    console.log(tempWarrantyItem);

//    var warrantyDivId = 'warranty-' + tempWarrantyItem.productWarrantyId;

//    var warrantyRow = $("<div class=''/>");

//    // Add the unique ID to the trade-in item element
//    warrantyRow.attr('id', warrantyDivId);

//    $(itemWarrantyLabelSection).append(warrantyRow);

//    warrantyRow.append($("<div>"
//        + "<div class='d-flex justify-content-start align-items-center'>"
//        + "<span class='svg-icon svg-icon-danger' data onclick='RemoveWarranty(\"" + tempWarrantyItem.productWarrantyId + "\")' >"
//        + "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24px' height='24px' viewBox='0 0 24 24' version='1.1'>"
//        + "<g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>"
//        + "<rect x='0' y='0' width='24' height='24' /><circle fill='#000000' opacity='0.3' cx='12' cy='12' r='10' /><rect fill='#000000' x='6' y='11' width='12' height='2' rx='1' /></g></svg></span>"
//        + "<span class='px-3 text-primary'>" + tempWarrantyItem.displayText + "</span></div></div>"
//    ));
//}

//function RemoveWarranty(productWarrantyId) {

//    if (productWarrantyId == null) {

//        $("#WarrantyOptionsSection div").remove();
//        $("#WarrantyLabelSection div").remove();

//        var tempWarrantyItem = new Object();

//        checkBoxWarranty.checked = false;
//        checkBoxWarranty.disabled = false;

//        return;
//    }

//    var tempWarrantyItem = new Object();

//    var warrantyItemRow = document.getElementById('warranty-' + productWarrantyId);
//    if (warrantyItemRow) {
//        warrantyItemRow.remove();

//        checkBoxWarranty.checked = false;
//        checkBoxWarranty.disabled = false;
//    }

//    return;
//}