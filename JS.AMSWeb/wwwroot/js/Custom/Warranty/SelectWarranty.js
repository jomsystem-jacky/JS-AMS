function InitWarrantyWithoutSelectedOptions(selectId, productId, companyId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: {
            "productId": productId,
            "companyId": companyId,
        },
        url: "/api/v1/WarrantyAPI/GetUnselectedWarranty",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, warranty) {
                $(selectId).append('<option value="' + warranty.warrantyId + '">' + `${warranty.period}` + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}
