function InitSelectBranchOptions(companyId, selectId, branchId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: { "companyId": companyId },
        url: "/api/v1/CompanyBranchAPI/GetBranchByCompanyId",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, branch) {
                $(selectId).append('<option value="' + branch.id + '">' + branch.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof branchId != 'undefined')
                SetSelectBranchValue(selectId, branchId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function InitSelectBranchExceptCurrentBranchOptions(companyId, selectId, branchId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: {
            "companyId": companyId,
            "branchId": branchId
        },
        url: "/api/v1/CompanyBranchAPI/GetBranchByCompanyId",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, branch) {
                $(selectId).append('<option value="' + branch.id + '">' + branch.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function InitStaffNotExistBranchOptions(companyId, selectId, staffId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: {
            "companyId": companyId,
            "staffId": staffId
        },
        url: "/api/v1/CompanyBranchAPI/GetStaffNotExistBranch",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, branch) {
                $(selectId).append('<option value="' + branch.id + '">' + branch.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function InitNotAddedStorageBranch(companyId, selectId, branchId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: {
            "companyId": companyId,
            "branchId": branchId
        },
        url: "/api/v1/CompanyBranchAPI/GetNotAddedStorageBranch",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, branch) {
                $(selectId).append('<option value="' + branch.id + '">' + branch.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof branchId != 'undefined')
                SetSelectBranchValue(selectId, branchId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function InitValidAccessBranch(userId, companyId, selectId, branchId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: {
            "companyId": companyId,
            "userId": userId
        },
        url: "/api/v1/CompanyBranchAPI/GetValidAccessCompanyBranch",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, branch) {
                $(selectId).append('<option value="' + branch.id + '">' + branch.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof branchId != 'undefined')
                SetSelectBranchValue(selectId, branchId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function SetSelectBranchValue(selectId, branchId) {
    $(selectId).val(branchId);
    $(selectId).selectpicker('refresh');
}

//function InitSelectBranchOptionsSetFirstValue(companyId, selectId) {
//    $.ajax({
//        async: true,
//        method: 'GET',
//        data: { "companyId": companyId },
//        url: "/api/v1/CompanyBranchAPI/GetBranchByCompanyId",
//        success: function (data, textStatus, jqXHR) {
//            $(selectId).empty();
//            // add new options
//            $.each(data, function (index, branch) {
//                $(selectId).append('<option value="' + branch.id + '">' + branch.name + '</option>');
//            });

//            // refresh selectpicker
//            $(selectId).selectpicker('refresh');
//            $(selectId).val($(selectId).options[0].value);
//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//            ShowFailMessageBox(jqXHR.responseText);
//        }

//    });
//}

