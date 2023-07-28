function ShowConfirmMessage() {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, do it!'
        }).then((result) => {
            if (result.value) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    });
}

function ShowConfirmRequestMessage() {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'All transfer will be confirmed.The action cannot be undo!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, do it!'
        }).then((result) => {
            if (result.value) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    });
}

function ShowSuccessfulMessageBox(message) {
    return new Promise((resolve) => {
        Swal.fire({
            title: 'Successful',
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then((result) => {
            //even though click outside need to navigate them back to index page so no need check
            resolve(true);
        });
    });
}

function ShowFailMessageBox(message) {
    Swal.fire({
        title: 'Opps...Something went wrong!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Ok'
    });
}

function ShowLoading(title) {
    swal.fire({
        title: title,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            swal.showLoading();
        }
    });
}

function HideLoading() {
    swal.close();
}

function ShowConfirmWithCustomMessage(message) {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: 'Are you sure?',
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, do it!'
        }).then((result) => {
            if (result.value) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    });
}
