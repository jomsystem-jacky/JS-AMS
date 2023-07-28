function InitModelByBrandSelectOptions(brandId, selectId, modelId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: { "brandId": brandId },
        url: "/api/v1/VehicleModelAPI/AllByBrand",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, model) {
                $(selectId).append('<option value="' + model.id + '">' + model.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof modelId != 'undefined')
                SetModelSelectValue(selectId, modelId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        }

    });
}

function SetModelSelectValue(selectId, modelId) {
    $(selectId).val(modelId);
    $(selectId).selectpicker('refresh');
}