function InitUOMSelectOptions(selectId, productId, companyId, uomId) {
    $.ajax({
        async: true,
        data: {
            "productId": productId,
            "companyId": companyId
        },
        method: 'GET',
        url: "/api/v1/UOMAPI/GetUnbindProductUOMs",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, item) {
                $(selectId).append('<option value="' + item.id + '">' + item.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof uomId != 'undefined')
                SetUOMSelectValue(selectId, uomId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        }

    });
}

function SetUOMSelectValue(selectId, uomId) {
    $(selectId).val(uomId);
    $(selectId).selectpicker('refresh');
}
