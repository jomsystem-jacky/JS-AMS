"use strict";

const itemWarrantySection = "#WarrantyOptionsSection";
const itemWarrantyLabelSection = "#WarrantyLabelSection";

var loadedItemWarranties = new Array();

const warratyModal = $('#addWarrantyModal');
warratyModal.on('shown.bs.modal', function () {
    console.log('W Modal is open');
});
warratyModal.on('hidden.bs.modal', function () {
    console.log('W Modal is closed');

    if (Object.keys(tempWarrantyItem).length === 0) {

        $("#WarrantyOptionsSection div").remove();

        checkBoxWarranty.checked = false;

        return;
    }
});


function RunWarrantyModal() {

    var warrantyModal = document.getElementById("addWarrantyModal");

    if (Object.keys(tempItem).length === 0) {

        checkBoxWarranty.checked = false;

        swal.fire(
            'Error!',
            'Item not found! Please select an item!',
            'error'
        )

        return;
    }

    var bootstrapModal = new bootstrap.Modal(warrantyModal);
    bootstrapModal.show();

    var warrantySelectionResult =
        $.ajax({
            method: "GET",
            url: "/api/v1/WarrantyAPI/GetProductWarrantyWithOptions/?productId=" + tempItem.productId + "&companyId=" + companyId,
            contentType: "application/x-www-form-urlencoded",
        })
            .done(function (warrantySelectionResult) {

                DrawWarrantySelection(warrantySelectionResult);
            })
            .fail(function (jqxhr) {
                swal.fire(
                    'Error!',
                    jqxhr.responseText,
                    'error'
                )
            })

}

function DrawWarrantySelection(warrantyOptions) {

    $("#WarrantyOptionsSection div").remove();

    for (var i = 0; i < warrantyOptions.length; i++) {

        loadedItemWarranties.push(warrantyOptions[i]);

        var warrantyOptionRow = $("<div class=''/>");

        $(itemWarrantySection).append(warrantyOptionRow);

        warrantyOptionRow.append($("<div class='card w-100 py-4 d-flex justify-content-start' onclick='UpdateSelectedItemWarranty(\"" + warrantyOptions[i].productWarrantyId + "\")'>"
            + "<a class='d-block text-left font-size-h5 pl-5'>" + warrantyOptions[i].displayText + "</a>"
            + "<span></span></div>"
        ));
    }

    return;
}

function UpdateSelectedItemWarranty(warrantyId) {

    const selectedWarranty = loadedItemWarranties.find(itemloadedItemWarranty => itemloadedItemWarranty.productWarrantyId === warrantyId);

    tempWarrantyItem = selectedWarranty;

    $('#btnWarrantyModalClose').trigger('click');

    DrawWarranty(tempWarrantyItem);

    checkBoxWarranty.disabled = true;

    return;
}

function DrawWarranty(tempWarrantyItem) {

    console.log(tempWarrantyItem);

    var warrantyDivId = 'warranty-' + tempWarrantyItem.productWarrantyId;

    var warrantyRow = $("<div class=''/>");

    // Add the unique ID to the trade-in item element
    warrantyRow.attr('id', warrantyDivId);

    $(itemWarrantyLabelSection).append(warrantyRow);

    warrantyRow.append($("<div>"
        + "<div class='d-flex justify-content-start align-items-center'>"
        + "<span class='svg-icon svg-icon-danger' data onclick='RemoveWarranty(\"" + tempWarrantyItem.productWarrantyId + "\")' >"
        + "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24px' height='24px' viewBox='0 0 24 24' version='1.1'>"
        + "<g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>"
        + "<rect x='0' y='0' width='24' height='24' /><circle fill='#000000' opacity='0.3' cx='12' cy='12' r='10' /><rect fill='#000000' x='6' y='11' width='12' height='2' rx='1' /></g></svg></span>"
        + "<span class='px-3 text-primary'>" + tempWarrantyItem.displayText + "</span></div></div>"
    ));
}

function RemoveWarranty(productWarrantyId) {

    if (productWarrantyId == null) {

        $("#WarrantyOptionsSection div").remove();
        $("#WarrantyLabelSection div").remove();

        var tempWarrantyItem = new Object();

        checkBoxWarranty.checked = false;
        checkBoxWarranty.disabled = false;

        return;
    }

    var tempWarrantyItem = new Object();

    var warrantyItemRow = document.getElementById('warranty-' + productWarrantyId);
    if (warrantyItemRow) {
        warrantyItemRow.remove();

        checkBoxWarranty.checked = false;
        checkBoxWarranty.disabled = false;
    }

    return;
}