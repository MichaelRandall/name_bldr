var snbApp = window.snbApp || {};

snbApp.modal = (function () {
    var info_msg = {};
    info_msg.secondary_activity_codes = "<div id='modal_content_hldr'>" +
                "<p><b>Operational Unit:&nbsp;</b> The operational unit (OU) of the server, from a financial/accounting perspective. " +
                "This is typically a division or district office.</p><p><b>Note:</b> The operational unit is not necessarily " +
                "the same as the physical location of the server.</p>" +
                "</div>";
    info_msg.primary_function_codes = "<div id='modal_content_hldr'>" +
                "<p><b>Primary Role:&nbsp;</b> The PRIMARY role served by this server, e.g., file server, email server, " +
                "database server. If a SECONDARY role exists, use the Secondary Role control on this form to specify.</p>" +
                "</div>";
    info_msg.secondary_function_codes = "<div id='modal_content_hldr'>" +
                "<p><b>Secondary Role:&nbsp;</b> If this server performs multiple roles, designate the SECONDARY " +
                "one of these roles here. If the server functions in a single role only, value should be NOT APPLICABLE.</p>" +
                "</div>";
    info_msg.secondary_function_numbers = "<div id='modal_content_hldr'>" +
                "<p><b>Sequence Numbers:&nbsp;</b> A sequential number assigned to this server to distinguish " +
                "it from other servers with the same OU and Primary Role. The list of available sequential numbers " +
                "is maintained by POC GROUP at DLL-EMAIL-ADDRESS." +
                "<p>(suggest that if this is maintained by a single group, the group be named " +
                "here and its DLL email specified. Suggest that if a DLL does not exist, one " +
                "is created, so that future personnel changes do not necessitate form updates.)</p></div>";
    info_msg.host_options = "<div id='modal_content_hldr'>" +
                "<p><b>Host Options:&nbsp;</b> Select the best characterization of the server's PHYSICAL Location.</p></div>";
    info_msg.site_locations = "<div id='modal_content_hldr'>" +
                "<p><b>Site Locations:&nbsp;</b> The server's location is at a local site.</p></div>";
    info_msg.dc_offpremise = "<div id='modal_content_hldr'>" +
                "<p><b>Usage Environment&nbsp;</b></p>" +
                "<p><b>Data Capability&nbsp;</b> The server is at a data capability locale, e.g., CPC, WPC.</p>" +
                "<p><b>Off Premise&nbsp:</b> The server is not at the OU or a Data Capability.</p>"
                "</div>";

    function getInfoMessage(elem_name) {
        switch (elem_name) {
            case "secondary_activity_codes_hlpr_id_mod":
                return info_msg.secondary_activity_codes;
                break;
            case "primary_function_codes_hlpr_id_mod":
                return info_msg.primary_function_codes;
                break;
            case "secondary_function_codes_hlpr_id_mod":
                return info_msg.secondary_function_codes;
                break;
            case "secondary_function_numbers_hlpr_id_mod":
                return info_msg.secondary_function_numbers;
                break;
            case "host_options_hlpr_id_mod":
                return info_msg.host_options;
                break;
            case "site_locations_hlpr_id_mod":
                return info_msg.site_locations;
                break;
            case "dc_offpremise_hlpr_id_mod":
                return info_msg.dc_offpremise;
                break;
        }
    }

    function buildModal(modalInfo, evnt) {
        if (modalInfo === 'help') {
            var modal = $("<div id='modal' class='modal modal_help'></div>").hide().fadeIn('slow');
            var modal_cntnt = $("<div id='modal_content_hldr'>" +
                "<h1>Instructions</h1>" +
                "<p>To build a server name:</p>" +
                "<ol>" +
                "<li>Select an operating system for the server you are requesting.</li>" +
                "<li>Select the operational unit that the server will be assigned to. </li>" +
                "<li>Select the functionality required for the server.</li>" +
                "<li>Select a secondary role for the server, if applicable. Otherwise leave the default 'Not Applicable'.</li>" +
                "<li>Select Select a sequence number for the server.</li>" +
                "<li>Select a hosting option or where the physical device will be placed.</li>" +
                "<li>Select the location where the physical device will be placed.</li>" +
                "<li>Click the <b>Validate Name</b> button to verify that the server name is available.<br /><b>Tip:</b>&nbsp; if the name is not available, select a different sequence number.</li>" +
                "<li>Using the cursor highlight the name and right-click to copy it.</li>" +
                "</ol>" +
                "</div>");

            $("#ui").append(modal);
            $("#modal").append(modal_cntnt);
        } else {
            var elem_name = evnt.currentTarget.id + "_mod";
            var ui = $("#ui");

            var modal = $("<div id='" + elem_name + "' class='modal modal_info'></div>").hide().fadeIn('slow');
            var modal_cntnt = $(getInfoMessage(elem_name));
            modal.appendTo(ui);
            modal_cntnt.appendTo(modal);
            
            var myModal = document.getElementById(elem_name);

            modal.css("top", evnt.currentTarget.offsetTop - (myModal.offsetHeight + 20));
            modal.css("left", evnt.currentTarget.offsetLeft - (myModal.offsetWidth * .10));
        }
    }

    return{
        displayModal:function(modalType, evnt) {
            buildModal(modalType, evnt);
    }
};

})();