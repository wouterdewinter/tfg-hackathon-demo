import '../styles/index.scss';

var sprequest = {
    "request": {
        "content": [
            {
                "label": "18+",
                "attributes": ["irma-demo.MijnOverheid.ageLower.over18"]
            },
        ]
    }
};
var success = function (jwt) {
    console.log("Success:", jwt);
    alert("Success");
}
var warning = function () {
    console.log("Warning:", arguments);
}
var error = function () {
    console.log("Error:", arguments);
}

window.addEventListener('DOMContentLoaded', function() {
  var jwt = IRMA.createUnsignedVerificationJWT(sprequest);
  IRMA.verify(jwt, success, warning, error);

  var $modal = $('#irma-server-modal');
  $('.modal-backdrop').remove();
  $modal.removeClass('modal fade').appendTo('.box-content');
});