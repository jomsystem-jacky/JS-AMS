"use strict";

var itemCategorySection = "#ItemCategorySection";
var itemBrandSection = "#ItemBrandSection";
var itemSection = "#ItemSection";

let loadedTempItems = new Array();
let checkedItemCategory = new Array();

function RunItemModal() {

    $("#ItemCategorySection div").remove();
    $("#ItemBrandSection div").remove();
    $("#ItemSection div").remove();

    var dto = {

    }

    var itemCategoryResult =
        $.ajax({
            method: "POST",
            url: "/ItemManagement/Configuration/ItemCategory/GetAllItemCategories/",
            data: JSON.stringify(dto),
            contentType: "application/x-www-form-urlencoded",
        })
            .done(function (itemCategoryResult) {

                var resultCheckedItemCategory = DrawItemCategory(itemCategoryResult);

                GetItemBrandByCategory(resultCheckedItemCategory);
            })
            .fail(function (jqxhr) {
                swal.fire(
                    'Error!',
                    jqxhr.responseText,
                    'error'
                )
            })
}

function GetItemBrandByCategory(resultCheckedItemCategory) {

    var dtoAds = {
        categoryIds: resultCheckedItemCategory,
        companyId: companyId,
    }

    var itemBrandResult =
        $.ajax({
            method: "POST",
            url: "/api/v1/ItemBrandAPI/GetAllItemBrandsByCategory/",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(dtoAds),
            async: true,
        })
            .done(function (itemBrandResult) {

                DrawItemBrand(itemBrandResult);
            })
            .fail(function (jqxhr) {
                swal.fire(
                    'Error!',
                    jqxhr.responseText,
                    'error'
                )
            })
}

function DrawItemCategory(itemCategories) {

    for (var i = 0; i < itemCategories.length; i++) {

        // Generate a unique ID for the trade-in item element
        var categorySelectionDivId = 'category-selection-' + itemCategories[i].id;

        var itemCategoryRow = $("<div class='mx-5'/>");

        $(itemCategorySection).append(itemCategoryRow);

        itemCategoryRow.append($("<div class='col-12 py-2 d-flex align-items-center justify-content-start checkbox-inline'>"
            + "<label class='checkbox checkbox-primary'>"
            + "<input id='" + categorySelectionDivId + "' onclick='UpdateCategory(\"" + itemCategories[i].id + "\")' type='checkbox' checked='checked' class=''>"
            + "<a class='d-block text-left font-size-h6 pl-3 text-muted'>" + itemCategories[i].name + "</a>"
            + "<span></span></label></div>"
        ));

        checkedItemCategory.push(itemCategories[i].id);
    }

    return checkedItemCategory;
}

function DrawItemBrand(itemBrands) {

    $("#ItemBrandSection div").remove();
    $("#ItemSection div").remove();

    for (var i = 0; i < itemBrands.length; i++) {

        var itemBrandRow = $("<div class='pt-3 col-5 col-lg-3 m-2 m-lg-3' />");

        $(itemBrandSection).append(itemBrandRow);

        itemBrandRow.append($("<div class='row p-8 rounded d-flex align-items-center justify-content-center bg-secondary' onclick='GetBrandItemList(\"" + itemBrands[i].id + "\")'>"
            + "<div class='col-12 d-flex align-items-center justify-content-center'>"
            + "<img src='/Media/users/default.jpg'/>"
            + "</div>"
            + "<div class='col-12 pt-3 text-center'>"
            + "<a>" + itemBrands[i].name + "</a>"
            + "</div></div>"
        ));
    }

    return;
}

function GetBrandItemList(brandId) {

    $("#ItemBrandSection div").remove();
    $("#ItemSection div").remove();

    var dto = {
        brandId: brandId,
        companyId: companyId,
        debtorId: debtorId
    }

    var brandItemResult =
        $.ajax({
            method: "GET",
            url: "/api/v1/ItemMasterAPI/GetProductWithPriceByDebtor/",
            data: dto,
            contentType: "application/x-www-form-urlencoded",
        })
            .done(function (brandItemResult) {
                DrawItem(brandItemResult);
            })
            .fail(function (jqxhr) {
                swal.fire(
                    'Error!',
                    jqxhr.responseText,
                    'error'
                )
            })
}

function DrawItem(result) {

    for (var i = 0; i < result.length; i++) {
        loadedTempItems.push(result[i]);

        var itemRow = $("<div class='pt-3 col-5 col-lg-3 m-2 m-lg-3' />");

        $(itemSection).append(itemRow);

        itemRow.append($("<div class='row p-8 rounded d-flex align-items-center justify-content-center bg-light' onclick='UpdateTempItem(\"" + result[i].priceBookItemId + "\")'>"
            + "<div class='col-12 d-flex align-items-center justify-content-center'>"
            + "<img class='d-md-block d-md-none d-xl-none d-lg-none d-sm-none d-none' width='100px' src='" + result[i].productImageUrl + "' />"
            + "<img class='d-lg-block d-md-none d-xl-none d-sm-none d-none' width='100px' src='" + result[i].productImageUrl + "' />"
            + "<img class='d-sm-block d-md-none d-xl-none d-lg-none d-none' width='100px' src='" + result[i].productImageUrl + "' />"
            + "<img class='d-xl-block d-lg-none d-md-none d-sm-none' width='70px' src='" + result[i].productImageUrl + "' />"
            + "</div>"
            + "<div class='col-12 pt-3 text-center'>"
            + "<a>" + result[i].name + "</a>"
            + "</div>"
            + "<div class='col-12 pt-3 text-center'>"
            + "<a>" + result[i].currency + " " + result[i].pricing.toFixed(2) + "</a>"
            + "</div></div>"
        ));
    }

    return;
}


function UpdateTempItem(itemId) {

    tempItem = new Object();

    let item = loadedTempItems.find(item => item.priceBookItemId === itemId);
    tempItem = item;

    $('#btnItemModalClose').trigger('click');

    labelItem.innerHTML = "<a class=''>" + item.name + "</a>";
}

function AddSubItemInfo() {

    var dItemQuantity = itemQuantity.value;

    if (dItemQuantity.trim() && Object.keys(tempItem).length !== 0) {

        let addItemDTO = {
            addedItemDivId: CreateGuid(),
            itemInfo: tempItem,
            itemDiscountInfo: itemDiscountInfo,
            itemQuantity: dItemQuantity,
            itemWarranty: tempWarrantyItem
        }

        selectedItemInfo.push(addItemDTO);

        for (var t = 0; t < tempTradeInItem.length; t++) {

            let addTradeInItemDTO = {
                addedTradeInItemDivId: CreateGuid(),
                tradeInInfo: tempTradeInItem[t]
            }

            selectedTradeInItemInfo.push(addTradeInItemDTO);
        }

        var totalAddedItemAmount = DrawAddedItem(selectedItemInfo);
        var totalTradeInAmount = DrawAddedTradeInItem(selectedTradeInItemInfo);

        var w1_orderLabel_DisplayAmount = totalAddedItemAmount - totalTradeInAmount;

        orderTotalLabel_W1.innerHTML = "RM " + w1_orderLabel_DisplayAmount.toFixed(2);

        UpdateFinalResult();
        UpdateWizard3();
        ClearTempData();

        return;
    }

    swal.fire(
        'Error!',
        'Please fill in all neccessary info!',
        'error'
    )

    return;
}

function DrawAddedItem(selectedItemInfo) {

    $("#W1_AddedItemsSection div").remove();

    let totalItemAmount = Number(0);

    for (var i = 0; i < selectedItemInfo.length; i++) {

        var addedItemRow = $("<div />");

        // Generate a unique ID for the trade-in item element
        var addedItemDivId = 'added-item' + selectedItemInfo.addedItemDivId;

        // Add the unique ID to the trade-in item element
        addedItemRow.attr('id', addedItemDivId);

        $(addedItemsSection).append(addedItemRow);

        let itemBeforeDiscount = Number(ItemTotal(selectedItemInfo[i].itemInfo.pricing, selectedItemInfo[i].itemQuantity));
        let itemAfterDiscount = Number(ItemSubtotal(selectedItemInfo[i].itemDiscountInfo, selectedItemInfo[i].itemInfo.pricing, selectedItemInfo[i].itemQuantity) ?? itemBeforeDiscount);

        totalItemAmount += itemAfterDiscount;

        let addedItemWarrantyText = selectedItemInfo[i].itemWarranty.displayText ?? "No Warranty";

        if (itemAfterDiscount != itemBeforeDiscount) {
            addedItemRow.append($("<div class='w-100 pt-2'>"
                + "<div class='d-flex align-items-start justify-content-center w-100'>"
                + "<div class='row bg-light w-100 rounded'>"
                + "<div class='col-2 col-lg-4 col-xl-2 d-flex align-items-center justify-content-center'>"
                + "<div class='btn btn-outline-primary btn-sm py-1'>"
                + "<a class='font-size-h5'>" + selectedItemInfo[i].itemQuantity + "</a>"
                + "</div></div>"
                + "<div class='col-2 col-lg-8 col-xl-2 d-flex align-items-center justify-content-center'>"
                + "<div class='p-5'>"
                + "<img class='d-md-block d-md-none d-xl-none d-lg-none d-sm-none d-none' width='100px' src='" + selectedItemInfo[i].itemInfo.productImageUrl + "' />"
                + "<img class='d-lg-block d-md-none d-xl-none d-sm-none d-none' width='100px' src='" + selectedItemInfo[i].itemInfo.productImageUrl + "' />"
                + "<img class='d-sm-block d-md-none d-xl-none d-lg-none d-none' width='100px' src='" + selectedItemInfo[i].itemInfo.productImageUrl + "' />"
                + "<img class='d-xl-block d-lg-none d-md-none d-sm-none' width='70px' src='" + selectedItemInfo[i].itemInfo.productImageUrl + "' />"
                + "</div></div>"
                + "<div class='col-5 col-lg-12 col-xl-5 d-flex align-items-center justify-content-center text-center text-lg-left'>"
                + "<div class='py-5'>"
                + "<div>"
                + "<a class='font-size-h6 text-darker'>" + selectedItemInfo[i].itemInfo.brandName + " " + selectedItemInfo[i].itemInfo.name + "</a>"
                + "</div>"
                + "<div class='pt-2'>"
                + "<div class='d-flex justify-content-start align-items-center'>"
                + "<span class='svg-icon svg-icon-info'>"
                + "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24px' height='24px' viewBox='0 0 24 24' version='1.1'>"
                + "<g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>"
                + "<rect x='0' y='0' width='24' height='24' />"
                + "<path d='M4,4 L11.6314229,2.5691082 C11.8750185,2.52343403 12.1249815,2.52343403 12.3685771,2.5691082 L20,4 L20,13.2830094 C20,16.2173861 18.4883464,18.9447835 16,20.5 L12.5299989,22.6687507 C12.2057287,22.8714196 11.7942713,22.8714196 11.4700011,22.6687507 L8,20.5 C5.51165358,18.9447835 4,16.2173861 4,13.2830094 L4,4 Z' fill='#000000' opacity='0.3' />"
                + "<path d='M11.1750002,14.75 C10.9354169,14.75 10.6958335,14.6541667 10.5041669,14.4625 L8.58750019,12.5458333 C8.20416686,12.1625 8.20416686,11.5875 8.58750019,11.2041667 C8.97083352,10.8208333 9.59375019,10.8208333 9.92916686,11.2041667 L11.1750002,12.45 L14.3375002,9.2875 C14.7208335,8.90416667 15.2958335,8.90416667 15.6791669,9.2875 C16.0625002,9.67083333 16.0625002,10.2458333 15.6791669,10.6291667 L11.8458335,14.4625 C11.6541669,14.6541667 11.4145835,14.75 11.1750002,14.75 Z' fill='#000000' />"
                + "</g></svg></span><span class='px-3 text-info'>" + addedItemWarrantyText + "</span></div>"
                + "</div></div></div>"
                + "<div class='col-3 col-lg-12 col-xl-3 d-flex align-items-center justify-content-center text-center text-lg-left'>"
                + "<div class='p-lg-3'>"
                + "<div>"
                + "<a class='font-size-h6 text-primary font-weight-bold'>RM " + itemAfterDiscount.toFixed(2) + "</a>"
                + "</div>"
                + "<div>"
                + "<a class='font-size-sm text-darker'><del>RM " + itemBeforeDiscount.toFixed(2) + "</del></a>"
                + "</div></div></div></div>"
                + "<a onclick='RemoveItem(\"" + selectedItemInfo[i].addedItemDivId + "\")' class= 'btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow'>"
                + "<i class='flaticon2-cross icon-sm text-muted'></i>"
                + "</a>"
            ));
        }
        if (itemAfterDiscount == itemBeforeDiscount) {
            addedItemRow.append($("<div class='w-100 pt-2'>"
                + "<div class='d-flex align-items-start justify-content-center w-100'>"
                + "<div class='row bg-light w-100 rounded'>"
                + "<div class='col-2 col-lg-4 col-xl-2 d-flex align-items-center justify-content-center'>"
                + "<div class='btn btn-outline-primary btn-sm py-1'>"
                + "<a class='font-size-h5'>" + selectedItemInfo[i].itemQuantity + "</a>"
                + "</div></div>"
                + "<div class='col-2 col-lg-8 col-xl-2 d-flex align-items-center justify-content-center'>"
                + "<div class='p-5'>"
                + "<img class='d-md-block d-md-none d-xl-none d-lg-none d-sm-none d-none' width='100px' src='" + selectedItemInfo[i].itemInfo.productImageUrl + "' />"
                + "<img class='d-lg-block d-md-none d-xl-none d-sm-none d-none' width='100px' src='" + selectedItemInfo[i].itemInfo.productImageUrl + "' />"
                + "<img class='d-sm-block d-md-none d-xl-none d-lg-none d-none' width='100px' src='" + selectedItemInfo[i].itemInfo.productImageUrl + "' />"
                + "<img class='d-xl-block d-lg-none d-md-none d-sm-none' width='70px' src='" + selectedItemInfo[i].itemInfo.productImageUrl + "' />"
                + "</div></div>"
                + "<div class='col-5 col-lg-12 col-xl-5 d-flex align-items-center justify-content-center text-center text-lg-left'>"
                + "<div class='py-5'>"
                + "<div>"
                + "<a class='font-size-h6 text-darker'>" + selectedItemInfo[i].itemInfo.brandName + " " + selectedItemInfo[i].itemInfo.name + "</a>"
                + "</div>"
                + "<div class='pt-2'>"
                + "<div class='d-flex justify-content-start align-items-center'>"
                + "<span class='svg-icon svg-icon-info'>"
                + "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24px' height='24px' viewBox='0 0 24 24' version='1.1'>"
                + "<g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>"
                + "<rect x='0' y='0' width='24' height='24' />"
                + "<path d='M4,4 L11.6314229,2.5691082 C11.8750185,2.52343403 12.1249815,2.52343403 12.3685771,2.5691082 L20,4 L20,13.2830094 C20,16.2173861 18.4883464,18.9447835 16,20.5 L12.5299989,22.6687507 C12.2057287,22.8714196 11.7942713,22.8714196 11.4700011,22.6687507 L8,20.5 C5.51165358,18.9447835 4,16.2173861 4,13.2830094 L4,4 Z' fill='#000000' opacity='0.3' />"
                + "<path d='M11.1750002,14.75 C10.9354169,14.75 10.6958335,14.6541667 10.5041669,14.4625 L8.58750019,12.5458333 C8.20416686,12.1625 8.20416686,11.5875 8.58750019,11.2041667 C8.97083352,10.8208333 9.59375019,10.8208333 9.92916686,11.2041667 L11.1750002,12.45 L14.3375002,9.2875 C14.7208335,8.90416667 15.2958335,8.90416667 15.6791669,9.2875 C16.0625002,9.67083333 16.0625002,10.2458333 15.6791669,10.6291667 L11.8458335,14.4625 C11.6541669,14.6541667 11.4145835,14.75 11.1750002,14.75 Z' fill='#000000' />"
                + "</g></svg></span><span class='px-3 text-info'>" + addedItemWarrantyText + "</span></div>"
                + "</div></div></div>"
                + "<div class='col-3 col-lg-12 col-xl-3 d-flex align-items-center justify-content-center text-center text-lg-left'>"
                + "<div class='p-lg-3'>"
                + "<div>"
                + "<a class='font-size-h6 text-primary font-weight-bold'>RM " + itemAfterDiscount.toFixed(2) + "</a>"
                + "</div>"
                + "<div>"
                + "</div></div></div></div>"
                + "<a onclick='RemoveItem(\"" + selectedItemInfo[i].addedItemDivId + "\")' class= 'btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow'>"
                + "<i class='flaticon2-cross icon-sm text-muted'></i>"
                + "</a>"
            ));
        }

    }
    totalItemAmount = parseFloat(totalItemAmount.toFixed(2));
    return totalItemAmount;
}


function DrawAddedTradeInItem(selectedTradeInItemInfo) {

    $("#W1_AddedTradeInItemsSection div").remove();

    let totalTradeInAmount = 0;

    for (var i = 0; i < selectedTradeInItemInfo.length; i++) {

        var addedTradeInItemRow = $("<div />");

        // Generate a unique ID for the trade-in item element
        var addedTradeInItemDivId = 'added-tradein-item' + selectedTradeInItemInfo.addedTradeInItemDivId;

        // Add the unique ID to the trade-in item element
        addedTradeInItemRow.attr('id', addedTradeInItemDivId);

        $(addedTradeInItemsSection).append(addedTradeInItemRow);

        let tradeInItemTotal = ItemTotal(selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemPrice, selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemQuantity);

        totalTradeInAmount += tradeInItemTotal;

        addedTradeInItemRow.append($("<div class='w-100 pt-2'>"
            + "<div class='d-flex align-items-start justify-content-center w-100'>"
            + "<div class='row bg-light w-100 rounded'>"
            + "<div class='col-2 col-lg-4 col-xl-2 d-flex align-items-center justify-content-center'>"
            + "<div class='btn btn-outline-primary btn-sm py-1'>"
            + "<a class='font-size-h5'>" + selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemQuantity + "</a>"
            + "</div></div>"
            + "<div class='col-2 col-lg-8 col-xl-2 d-flex align-items-center justify-content-center'>"
            + "<div class='p-5'>"
            + "<img class='d-md-block d-md-none d-xl-none d-lg-none d-sm-none d-none' width='100px' src='" + selectedTradeInItemInfo[i].tradeInInfo.dTradeInPhotoUrl + "' />"
            + "<img class='d-lg-block d-md-none d-xl-none d-sm-none d-none' width='100px' src='" + selectedTradeInItemInfo[i].tradeInInfo.dTradeInPhotoUrl + "' />"
            + "<img class='d-sm-block d-md-none d-xl-none d-lg-none d-none' width='100px' src='" + selectedTradeInItemInfo[i].tradeInInfo.dTradeInPhotoUrl + "' />"
            + "<img class='d-xl-block d-lg-none d-md-none d-sm-none' width='70px' src='" + selectedTradeInItemInfo[i].tradeInInfo.dTradeInPhotoUrl + "' />"
            + "</div></div>"
            + "<div class='col-5 col-lg-12 col-xl-5 d-flex align-items-center justify-content-center text-center text-lg-left'>"
            + "<div class='p-5'>"
            + "<div>"
            + "<a class='font-size-h5 text-darker'>" + selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemLabel + "</a>"
            + "</div>"
            + "</div></div>"
            + "<div class='col-3 col-lg-12 col-xl-3 d-flex align-items-center justify-content-center text-center text-lg-left'>"
            + "<div class='p-lg-3'>"
            + "<div>"
            + "<a class='font-size-h5 text-primary font-weight-bold'>RM" + tradeInItemTotal.toFixed(2) + "</a>"
            + "</div>"
            + "</div></div></div>"
            + "<a onclick='RemoveTradeInItem(\"" + selectedTradeInItemInfo[i].addedTradeInItemDivId + "\")' class= 'btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow'>"
            + "<i class='flaticon2-cross icon-sm text-muted'></i>"
            + "</a>"
        ));
    }

    return totalTradeInAmount;
}

function ClearTempData() {

    RemoveTradeIn();
    RemoveWarranty();

    tempItem = new Object();
    itemDiscountInfo = new Object();
    loadedTempItems = new Array();
    tempTradeInItem = new Array();
    tempWarrantyItem = new Object();
    loadedItemWarranties = new Array();

    itemQuantity.value = "";
    labelItem.innerHTML = "<a class=''>Select Item</a>";
    labelDiscount.innerHTML = "<a class=''>No Discount</a>";
    itemDiscountAmount.value = "";
    itemDiscountType.value = "";
}

function ItemSubtotal(discountInfo, unitPrice, quantity) {

    if (discountInfo.dItemDiscountType == "Amount") {

        var result = (unitPrice * quantity) - discountInfo.dItemDiscountAmount;

        return result.toFixed(2);
    }

    if (discountInfo.dItemDiscountType == "Percentage") {

        // Convert the percentage discount to a decimal value
        var discountPercentage = discountInfo.dItemDiscountAmount / 100;

        // Calculate the discount amount
        var discountAmount = (unitPrice * quantity) * discountPercentage;

        // Calculate the discounted price
        var result = (unitPrice * quantity) - discountAmount;

        return Number(result.toFixed(2));
    }

    return null;
}

function ItemTotal(unitPrice, quantity) {

    var result = Number(unitPrice) * Number(quantity);

    return Number(result.toFixed(2));
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

function UpdateCategory(categoryId) {

    var selection = document.getElementById('category-selection-' + categoryId);

    if (selection.checked) {
        var uncheckedCategoryIndex = checkedItemCategory.findIndex(function (item) {
            return item === categoryId;
        });

        if (uncheckedCategoryIndex < 0) {
            checkedItemCategory.push(categoryId);
        }

        GetItemBrandByCategory(checkedItemCategory);
    }
    if (!selection.checked) {
        var uncheckedCategoryIndex = checkedItemCategory.findIndex(function (item) {
            return item === categoryId;
        });

        // If the element was found, remove it from the array
        if (uncheckedCategoryIndex >= 0) {
            checkedItemCategory.splice(uncheckedCategoryIndex, 1);
        }

        GetItemBrandByCategory(checkedItemCategory);
    }
}

function RemoveItem(id) {
    var indexToRemove = selectedItemInfo.findIndex(function (item) {
        return item.addedItemDivId === id;
    });

    if (indexToRemove !== -1) {
        selectedItemInfo.splice(indexToRemove, 1);
    }

    var totalAddedItemAmount = DrawAddedItem(selectedItemInfo);
    var totalTradeInAmount = DrawAddedTradeInItem(selectedTradeInItemInfo);

    var w1_orderLabel_DisplayAmount = totalAddedItemAmount - totalTradeInAmount;

    orderTotalLabel_W1.innerHTML = "RM " + w1_orderLabel_DisplayAmount.toFixed(2);

}

function RemoveTradeInItem(id) {
    var indexToRemove = selectedTradeInItemInfo.findIndex(function (item) {
        return item.addedTradeInItemDivId === id;
    });

    if (indexToRemove !== -1) {
        selectedTradeInItemInfo.splice(indexToRemove, 1);
    }

    var totalAddedItemAmount = DrawAddedItem(selectedItemInfo);
    var totalTradeInAmount = DrawAddedTradeInItem(selectedTradeInItemInfo);

    var w1_orderLabel_DisplayAmount = totalAddedItemAmount - totalTradeInAmount;

    orderTotalLabel_W1.innerHTML = "RM " + w1_orderLabel_DisplayAmount.toFixed(2);

}