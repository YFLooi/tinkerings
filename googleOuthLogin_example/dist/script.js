//getBasicProfile() is a method to get info from GId that signed in
function onSignIn(googleUser) {
    var profileParameters = []
    
    var profile = googleUser.getBasicProfile();
    profileParameters.splice(0, 0, profile.getId()) // Do not send to your backend! Use an ID token instead.
    profileParameters.splice(1, 0, profile.getName())
    profileParameters.splice(2, 0, profile.getImageUrl())
    profileParameters.splice(3, 0, profile.getEmail()) // This is null if the 'email' scope is not present.

    console.log(profileParameters)
    renderProfile(profileParameters)
}
function renderProfile(parameters){
    var profileParameterNames = ["ID", "Name", "Image URL", "Email"];
    var renderedItems = [];
    var renderTarget = document.getElementById("userDetails");
    
    for (i=0; i<parameters.length; i++) {
      var childDiv = document.createElement("div");
      childDiv.appendChild(document.createTextNode(`${profileParameterNames[i]}: ${parameters[i]}`));
      renderTarget.appendChild(childDiv);
      renderedItems.splice(renderedItems.length, 0, childDiv)
    }

    return renderedItems; //For testing only
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function productTestFunction(a, b){
    return a*b
}
function arrayTestFunction(a){
    let testArray = new Array(a.length)

    testArray = a.map(function (currVal, index) {
        return `${index}: ${currVal}`;
    })
    console.log(testArray) //Outputs to Jest test console
    return testArray
}

module.exports = {
    productTestFunction,
    arrayTestFunction
}