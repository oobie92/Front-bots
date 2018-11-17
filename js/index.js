
const $form = document.getElementById('form1')
const user = document.getElementById('username-id')

function login(username) {
    const requestOptions = {
        method: 'GET',
        headers: {
          accept: 'application/json'
          // 'Content-Type': 'application/json'
        }
        // body: JSON.stringify({ user })
    };
    console.log(requestOptions)
    return fetch("http://localhost:9000/chat-room.html", requestOptions)
        .then(response => {
          console.log(response)
        } )
        // .then(user => {
        //     // login successful if there's a jwt token in the response
        //     if (user.jwt) {
        //         // store user details and jwt token in local storage to keep user logged in between page refreshes
        //         localStorage.setItem('user', JSON.stringify(user));
        //     }
        //
        //     return user;
        // });
}

$form.addEventListener('submit', login)

// window.addEventListener("beforeunload", function (e) {
//   if(socket != null){
//     socket.close()
//   }
//   var confirmationMessage = "\o/";
//
//   (e || window.event).returnValue = confirmationMessage;     //Gecko + IE
//   return confirmationMessage;                                //Webkit, Safari, Chrome etc.
// });
