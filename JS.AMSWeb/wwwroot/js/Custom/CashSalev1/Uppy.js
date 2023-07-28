"use strict";

// Class definition
var KTUppy = function () {

    const Dashboard = Uppy.Dashboard;
    const Webcam = Uppy.Webcam;

    // Private functions
    var initUppy1 = function () {
        var id = '#kt_uppy_1';

        var options = {
            proudlyDisplayPoweredByUppy: false,
            target: id,
            inline: true,
            replaceTargetContent: true,
            showProgressDetails: true,
            note: 'Upload your receipt here',
            height: 250,
            metaFields: [
                { id: 'name', name: 'Name', placeholder: 'file name' },
                { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
            ],
            browserBackButtonClose: true,
            hideUploadButton: true,
            locale: {
                strings: {
                    dropPasteImport: 'Upload your receipt here'
                }
            }
        }

        var uppyDashboard = Uppy.Core({
            autoProceed: true,
            restrictions: {
                maxFileSize: 1000000, // 1mb
                maxNumberOfFiles: 1,
                minNumberOfFiles: 1,
                allowedFileTypes: ['image/*']
            }
        });

        uppyDashboard.use(Dashboard, options);
        //uppyDashboard.use(Tus, { endpoint: 'https://master.tus.io/files/' });
        uppyDashboard.use(Webcam, { target: Dashboard });


        uppyDashboard.on('file-added', (file) => {
            // Handle file added event
            console.log('File added:', file);
        });
    }

    return {
        // public functions
        init: function () {
            initUppy1();
        }
    };
}();

KTUtil.ready(function () {
    //KTUppy.init();
});
