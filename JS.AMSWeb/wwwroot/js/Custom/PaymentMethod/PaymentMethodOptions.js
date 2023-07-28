"use strict";
// Class definition
const paymentMethodOptionSection = "#paymentMethodOptions";

var currentPaymentMethod = "";

function GetPaymentMethodOption() {

    $("#paymentMethodOptions div").remove();

    var result =
        $.ajax({
            method: "POST",
            url: "/Administration/GeneralSettings/PaymentMethod/GetAllPaymentMethods",
            contentType: "application/x-www-form-urlencoded",
        })
            .done(function (result) {
                DrawOptions(result);
            })
            .fail(function (jqxhr) {
                swal.fire(
                    'Error!',
                    jqxhr.responseText,
                    'error'
                )
            })
}

function DrawOptions(result) {

    for (var i = 0; result.length; i++) {
        Draw(result[i]);
    }
}

function Draw(data) {

    var row = $("<div class='my-2'/>")
    $(paymentMethodOptionSection).append(row);

    if (currentPaymentMethod == data.name) {

        row.append($("<div class='card pb-3 pt-5 pl-4 d-flex justify-content-start'>"
            + "<label class='checkbox checkbox-outline checkbox-primary checkbox-circle checkbox-lg'>"
            + "<input type='checkbox' checked='checked' class=''>"
            + "<a class='d-block text-left font-size-h4 pl-3' onclick='UpdatePaymentMethod(\"" + data.name + "\")' >" + data.name + "</a>"
            + "<span></span></label></div>"
        ));

        return;
    }

    row.append($("<div class='card pb-3 pt-5 pl-4 d-flex justify-content-start'>"
        + "<label class='checkbox checkbox-outline checkbox-primary checkbox-circle checkbox-lg'>"
        + "<input type='checkbox' class=''>"
        + "<a class='d-block text-left font-size-h4 pl-3' onclick='UpdatePaymentMethod(\"" + data.name + "\")' >" + data.name + "</a>"
        + "<span></span></label></div>"
    ));

}

function UpdatePaymentMethod(pm) {

    currentPaymentMethod = pm;

    $('#btnPaymentMethodModalClose').trigger('click');

    var pmLabel = document.getElementById("labelPaymentMethod");
    pmLabel.innerHTML = "<a class='font-size-h4'>" + pm + "</a>";

    if (currentPaymentMethod == "MULTI PAYMENT") {
        MultiPaymentModal();
    }

}

function MultiPaymentModal() {

    $('#btnPaymentMethodModalClose').trigger('click');

    $('#btnPaymentMethodModalClose').trigger('click');

    var multiPaymentModal = document.getElementById("addMultiPaymentMethodModal");
    $(multiPaymentModal).modal("show");
}