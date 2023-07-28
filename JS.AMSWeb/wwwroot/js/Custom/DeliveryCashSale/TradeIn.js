"use strict";

const tradeInLabelSection = "#TradeInLabelSection";
const tradeInCheckBoxSection = "#TradeInCheckBoxSection";

var secondHandCategoryId = new Array();
var loadedItemCategories = new Array();
var loadedTradeInItems = new Array();
var tempTradeInInfo = new Object();

const tradeInBatteryModal = $('#addTradeInBatteryModal');
tradeInBatteryModal.on('shown.bs.modal', function () {
    console.log('Modal is open');
});
tradeInBatteryModal.on('hidden.bs.modal', function () {
    console.log('Modal is closed');

    if (tempTradeInItem.length == 0) {

        checkBoxTradeIn.checked = false;
    }
});

function RunTradeInModal() {

    var secondHandCategoryInfo =
        $.ajax({
            method: "POST",
            url: "/ItemManagement/Configuration/ItemCategory/GetAllItemCategories/",
            contentType: "application/x-www-form-urlencoded",
        })
            .done(function (result) {

                loadedItemCategories = new Array();

                for (var i = 0; i < result.length; i++) {

                    loadedItemCategories.push(result[i]);
                }

                secondHandCategoryId.push(loadedItemCategories.find(category => category.name === "TRADE IN").id);

                GetTradeInItemInfo();
            })
            .fail(function (jqxhr) {
                swal.fire(
                    'Error!',
                    jqxhr.responseText,
                    'error'
                )
            })

}

function GetTradeInItemInfo() {

    var secondHandCategoryDto = {
        itemCategoryList: secondHandCategoryId
    }

    var result =
        $.ajax({
            method: "POST",
            url: "/ItemManagement/ItemMaster/GetAllProducts/",
            data: secondHandCategoryDto,
            contentType: "application/x-www-form-urlencoded",
        })
            .done(function (result) {

                tradeInItemSelection.innerHTML = "";

                //$("#TradeInLabelSection div").remove();

                for (var i = 0; i < result.length; i++) {

                    loadedTradeInItems.push(result[i]);

                    var option = document.createElement("option");
                    option.text = result[i].name;
                    option.value = result[i].id;

                    tradeInItemSelection.appendChild(option);
                }
            })
            .fail(function (jqxhr) {
                swal.fire(
                    'Error!',
                    jqxhr.responseText,
                    'error'
                )
            })

}

function UpdateTradeInInfo() {

    var dTradeInItemId = tradeInItem.options[tradeInItem.selectedIndex].value;
    var dTradeInItemLabel = tradeInItem.options[tradeInItem.selectedIndex].text;
    var dTradeInItemQuantity = tradeInItemQuantity.value ?? 0;
    var dTradeInItemPrice = tradeInItemPrice.value ?? 0;

    tempTradeInInfo = new Object();

    console.log(loadedTradeInItems);

    let tradeInInfo = loadedTradeInItems.find(item => item.id === dTradeInItemId);
    tempTradeInInfo = tradeInInfo;

    console.log(tradeInInfo);

    var dTradeInPhotoUrl = tempTradeInInfo.photoUrl;

    if (dTradeInItemId.trim() && dTradeInItemQuantity.trim() && dTradeInItemPrice.trim()) {

        var selectedTradeInInfoDTO = {
            dTradeInDivId: CreateGuid(),
            dTradeInItemId: dTradeInItemId,
            dTradeInItemLabel: dTradeInItemLabel,
            dTradeInItemQuantity: dTradeInItemQuantity,
            dTradeInItemPrice: dTradeInItemPrice,
            dTradeInPhotoUrl: dTradeInPhotoUrl
        }

        tempTradeInItem.push(selectedTradeInInfoDTO);

        DrawTradeInBattery(selectedTradeInInfoDTO);

        if (tempTradeInItem.length > 0) {

            $('#btnTradeInBatteryModalClose').trigger('click');
            checkBoxTradeIn.disabled = true;
            addTradeInBtnSection.style.display = "block";
        }

        tradeInItemQuantity.value = "";
        tradeInItemPrice.value = "";
        tradeInItem.value = "";

        return;
    }

    swal.fire(
        'Error!',
        'Please fill in all trade in info!',
        'error'
    )

    return;

    //$('#btnDiscountModalClose').trigger('click');

    //if (itemDiscountInfo.dItemDiscountType == "Amount") {
    //    labelDiscount.innerHTML = "RM " + itemDiscountInfo.dItemDiscountAmount;
    //}

    //if (itemDiscountInfo.dItemDiscountType == "Percentage") {
    //    labelDiscount.innerHTML = itemDiscountInfo.dItemDiscountAmount + "%";
    //}
    //return;
}

function DrawTradeInBattery(selectedTradeInInfoDTO) {

    var deductAmount = selectedTradeInInfoDTO.dTradeInItemQuantity * selectedTradeInInfoDTO.dTradeInItemPrice;

    // Generate a unique ID for the trade-in item element
    var tradeInDivId = 'trade-in-' + selectedTradeInInfoDTO.dTradeInDivId;

    var tradeInRow = $("<div class=''/>");

    // Add the unique ID to the trade-in item element
    tradeInRow.attr('id', tradeInDivId);

    $(tradeInLabelSection).append(tradeInRow);

    tradeInRow.append($("<div>"
        + "<div class='d-flex justify-content-start align-items-center'>"
        + "<span class='svg-icon svg-icon-danger' data onclick='RemoveTradeIn(\"" + selectedTradeInInfoDTO.dTradeInDivId + "\")' >"
        + "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24px' height='24px' viewBox='0 0 24 24' version='1.1'>"
        + "<g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>"
        + "<rect x='0' y='0' width='24' height='24' /><circle fill='#000000' opacity='0.3' cx='12' cy='12' r='10' /><rect fill='#000000' x='6' y='11' width='12' height='2' rx='1' /></g></svg></span>"
        + "<span class='px-3 text-primary'>Old Battery " + selectedTradeInInfoDTO.dTradeInItemLabel + " ( -RM" + deductAmount + " )</span></div></div>"
    ));
}

function RemoveTradeIn(tradeInDivId) {

    if (tradeInDivId == null) {

        $("#TradeInLabelSection div").remove();
        addTradeInBtnSection.style.display = "none";

        var tempTradeInItem = new Object();

        checkBoxTradeIn.checked = false;
        checkBoxTradeIn.disabled = false;

        return;
    }

    // Find the index of the element with the given tradeInItemId
    var tradeInIndex = tempTradeInItem.findIndex(function (item) {
        return item.dTradeInDivId === tradeInDivId;
    });

    // If the element was found, remove it from the array
    if (tradeInIndex >= 0) {
        tempTradeInItem.splice(tradeInIndex, 1);
    }

    var tradeInItemRow = document.getElementById('trade-in-' + tradeInDivId);
    if (tradeInItemRow) {
        tradeInItemRow.remove();

        if (tempTradeInItem.length > 0) {

            addTradeInBtnSection.style.display = "block";
        }
        else {

            checkBoxTradeIn.checked = false;
            checkBoxTradeIn.disabled = false;
            addTradeInBtnSection.style.display = "none";
        }
    }

}

function CreateGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}