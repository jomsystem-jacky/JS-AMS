'use strict';

// Class definition
var ImageInputDemo = function () {
    // Private functions
    var initDemos = function () {
        var image = new KTImageInput('image_input');
    }

    return {
        // public functions
        init: function () {
            initDemos();
        }
    };
}();

KTUtil.ready(function () {
    ImageInputDemo.init();
});
