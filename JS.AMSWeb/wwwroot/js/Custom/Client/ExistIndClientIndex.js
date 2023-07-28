"use strict";
// Class definition
const tableName = "existing_customer_datatable";
const searchField = "ExistingSearchName";

var ExistingCustomerDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Client/IndividualClient/GetAllIndividualClient",
                        dataType: 'json',
                        params: {
                            "name": "",
                        },

                        map: function (raw) {
                            $('#existing_loading').hide();
                            $('#' + tableName).show();
                            // sample data mapping
                            var dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                            }
                            return dataSet;
                        },
                    },
                },
                pageSize: 10,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                //    saveState: false
            },

            // layout definition
            layout: {
                scroll: false,
                footer: false,
                spinner: {
                    message: true,
                    message: "Loading..."
                }
            },

            // column sorting
            sortable: true,
            pagination: true,

            // columns definition
            columns: [
                {
                    field: 'fullName',
                    title: 'Name',
                    sortable: true,
                },
                {
                    field: 'branchName',
                    title: 'Branch',
                    sortable: false,
                },
                {
                    field: 'icPassport',
                    title: 'IC/Passport',
                    sortable: false,
                },
                {
                    field: '',
                    title: '',
                    sortable: false,
                    width: 75,
                    overflow: 'visible',
                    template: function (row) {
                        var fullAddress = row.fullAddress ? row.fullAddress.replace(/\n/g, "\\n") : "";
                        return "<div class='dropdown dropdown-inline'/>"
                            + "<a onclick='SelectClient(\"" + row.individualId + "\",\"" + row.fullName + "\",\"" + row.phoneNumber + "\",\"" + fullAddress + "\",\"" + row.email + "\")' class='btn btn-sm btn-clean btn-icon mr-2' title='Select'>"
                            + "<i class='fas fa-search-plus'></i>"
                            + "</button>"
                            ;
                    },
                }
            ]
        });
        document.getElementById(searchField).value = datatable.getDataSourceParam("name");
    };


    return {
        init: function () {
            demo();
        },
    };
}();


function ResetTable() {
    $('#loading').show();
    $('#' + tableName).hide();

    document.getElementById(searchField).value = "";
    localStorage.removeItem(tableName + '-1-meta');

    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("name", "");
    datatable.reload();
}

function ExistingStaffSearch() {

    $('#existing_loading').show();
    $('#' + tableName).hide();
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("name", document.getElementById(searchField).value.toLowerCase());
    datatable.reload();
}

jQuery(document).ready(function () {
    ExistingCustomerDatatableRemoteAjaxDemo.init();
});

function OpenExistingCustomer() {

    if (addExistingCustomerBtn.textContent == "Existing Customer?") {
        $('#addExistingCustomerModal').modal('show');
        var datatable = $('#' + tableName).KTDatatable();
        datatable.reload();
    }
    else {
        ResetCustomerField();
    }
}

function ResetCustomerField() {
    addExistingCustomerBtn.innerHTML = "<u>Existing Customer?</u>";
    customerName.value = "";
    customerPhoneNo.value = "";
    customerEmail.value = "";
    customerAddress.value = "";
    individualClientId = null;
    DisableOrEnableClientInput(false);

    //Hide existing vechileButton
    addExistingVehicleBtn.style.display = "none";
}

function CloseExistingCustomer() {
    $('#addExistingCustomerModal').modal('hide');
}

function SelectClient(id, name, phone, address, email) {
    CloseExistingCustomer();
    addExistingVehicleBtn.style.display = "";
    addExistingCustomerBtn.innerHTML = "<u>Click here to cancel</u>";
    customerName.value = name;
    customerPhoneNo.value = phone;
    customerEmail.value = email == 'null' ? "" : email;
    customerAddress.value = address ?? "";
    individualClientId = id;
    DisableOrEnableClientInput(true);
    ClearAddress();
}

function DisableOrEnableClientInput(isDisabled) {
    customerName.disabled = isDisabled;
    customerPhoneNo.disabled = isDisabled;
    customerEmail.disabled = isDisabled;
    customerAddress.disabled = isDisabled;
}

function OpenAddressModal() {
    $('#addAddressModal').modal('show');
}

function CloseAddressModal() {
    $('#addAddressModal').modal('hide');
}

function SetAddress() {
    addressInfo.Address1 = address1.value;
    addressInfo.Address2 = address2.value;
    addressInfo.Address3 = address3.value;
    addressInfo.PostCode = postCode.value;
    addressInfo.CityId = city.value;
    addressInfo.Latitude = latitude.value;
    addressInfo.Longitude = longtitude.value;
    customerInfo.AddressInfo = addressInfo;
    customerAddress.value = combineLocationToAddress(address1.value, address2.value, address3.value, postCode.value, country.options[country.selectedIndex].textContent,
        city.options[city.selectedIndex].textContent, state.options[state.selectedIndex].textContent);

    CloseAddressModal();
}

function ClearAddress() {
    addressInfo = new Object();
}

function combineLocationToAddress(add1, add2, add3, postCode, countryName, cityName, stateName) {
    let address = add1;

    if (add2 && add2 !== "") {
        address += ", " + add2;
    }

    if (add3 && add3 !== "") {
        address += ", " + add3;
    }

    if (postCode && postCode !== "") {
        address += ", " + postCode;
    }

    if (cityName && cityName !== "") {
        address += " ," + cityName;
    }

    if (stateName && stateName !== "") {
        address += " ," + stateName;
    }

    if (countryName && countryName !== "") {
        address += " ," + countryName;
    }

    return address;
}