function InitSelectProductOptions(selectId, productId) {
    $.ajax({
        async: true,
        method: 'GET',
        url: "/api/v1/VehicleModelBindingAPI/GetProduct",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, product) {
                $(selectId).append('<option value="' + product.id + '">' + product.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof productId != 'undefined')
                SetSelectProductValue(selectId, productId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

/*function InitSelectBrandExceptCurrentBrandOptions(selectId, brandId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: {
            "brandId": brandId
        },
        url: "/api/v1/VehicleBrandAPI/GetBrand",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, brand) {
                $(selectId).append('<option value="' + brand.id + '">' + brand.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}*/

function SetSelectProductValue(selectId, productId) {
    $(selectId).val(productId);
    $(selectId).selectpicker('refresh');
}