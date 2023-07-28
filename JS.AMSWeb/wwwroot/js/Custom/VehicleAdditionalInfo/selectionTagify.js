// Class definition
var SelectionTagifyDemos = function () {

    // Private functions
    var initTagify = function () {
        var input = document.getElementById('selection_tagify'),
            // init Tagify script on the above inputs
            tagify = new Tagify(input, {
                whitelist: [],
                blacklist: [], // <-- passed as an attribute in this demo
            })


        // "remove all tags" button event listener
        //document.getElementById('selection_tagify_remove').addEventListener('click', tagify.removeAllTags.bind(tagify))

        // Chainable event listeners
        tagify.on('add', onAddTag)
            .on('remove', onRemoveTag)
            .on('input', onInput)
            .on('edit', onTagEdit)
            .on('invalid', onInvalidTag)
            .on('click', onTagClick)
            .on('dropdown:show', onDropdownShow)
            .on('dropdown:hide', onDropdownHide)

        // tag added callback
        function onAddTag(e) {
            tagify.off('add', onAddTag) // exmaple of removing a custom Tagify event
        }

        // tag remvoed callback
        function onRemoveTag(e) {

        }

        // on character(s) added/removed (user is typing/deleting)
        function onInput(e) {
        }

        function onTagEdit(e) {
        }

        // invalid tag added callback
        function onInvalidTag(e) {
        }

        // invalid tag added callback
        function onTagClick(e) {
        }

        function onDropdownShow(e) {
        }

        function onDropdownHide(e) {
        }
    }

    return {
        // public functions
        init: function () {
            initTagify();
        }
    };
}();

jQuery(document).ready(function () {
    SelectionTagifyDemos.init();
});
