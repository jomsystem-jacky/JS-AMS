function InitPriceBookOptions(companyId, selectId, priceBookId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: {
            "companyId": companyId,
        },
        url: "/api/v1/PriceBookAPI/GetPriceBooksByCompanyId",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, term) {
                $(selectId).append('<option value="' + term.id + '">' + term.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof priceBookId != 'undefined')
                SetSelectPriceBookValue(selectId, priceBookId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function SetSelectPriceBookValue(selectId, priceBookId) {
    $(selectId).val(priceBookId);
    $(selectId).selectpicker('refresh');
}
