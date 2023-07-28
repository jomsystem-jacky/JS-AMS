function InitRegionSelectOptions(selectId, regionId) {
    $.ajax({
        async: true,
        method: 'GET',
        url: "/api/v1/RegionAPI/All",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, item) {
                $(selectId).append('<option value="' + item.id + '">' + item.regionName + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof regionId != 'undefined')
                SetCountrySelectValue(selectId, regionId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        }

    });
}

function SetRegionSelectValue(selectId, regionId) {
    $(selectId).val(regionId);
    $(selectId).selectpicker('refresh');
}
