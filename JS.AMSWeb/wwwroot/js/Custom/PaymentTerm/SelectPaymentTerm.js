function InitPaymentTermrOptions(companyId, selectId, termId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: {
            "companyId": companyId,
        },
        url: "/api/v1/PaymentTermAPI/GetTermByCompanyId",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, term) {
                $(selectId).append('<option value="' + term.id + '">' + term.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof termId != 'undefined')
                SetSelectTermValue(selectId, termId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function SetSelectTermValue(selectId, termId) {
    $(selectId).val(termId);
    $(selectId).selectpicker('refresh');
}
