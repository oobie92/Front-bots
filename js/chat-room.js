// const ConnectChat = require('./client_socket.js')
let socket = null
let usersOnline = [];

const getParameters = (param) => {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for(var i = 0; i < sURLVariables.length; i++){
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == param){
      return sParameterName[1];
    }
  }
}

const usernameAgent = getParameters('User')

socket = io('http://localhost:3000', {transports: ['websocket'], upgrade: false})//ConnectChat.openChat()
console.log('message to send to agent: ')
socket.emit('new_agent',usernameAgent,function(data){
  console.log('start chat')
})
socket.emit('get_users', {
  room : usernameAgent
});

socket.on('send_users', function(data) {
  console.log("return users")
  console.log(data.message)
  updateUserConnected(data.message)
});

socket.on('agent_message', function(data){
  console.log(data)
})

const test = (param) => {
  console.log('executing... connection')

}

const updateUserConnected = (subscriber) => {
  console.log('here ')
  console.log(Object.keys(subscriber).length)


  if(Object.keys(subscriber).length>0){

    usersOnline.push(subscriber)

  }

  console.log(usersOnline.length)

  if(usersOnline.length>0){
    for(let user of usersOnline){
      console.log('this is user')
      console.log(user)
      let username = usersOnline.shift()
      delete user[username]
      // console.log(Object.keys(user))
      var div = document.createElement('div')
      // var br = document.createElement('br')
      var p = document.createElement('p')
      div.classList.add('chatbox__user--active')
      var usernameSpan = document.createTextNode(username);
      p.appendChild(usernameSpan)
      div.appendChild(p)
      $userList.appendChild(div)
    }
    // usersOnline.map((user) => {
    //   console.log(user)
    //   let username = Object.keys(user)[0]
    //   delete user[username]
    //   // console.log(Object.keys(user))
    //   var div = document.createElement('div')
    //   // var br = document.createElement('br')
    //   var p = document.createElement('p')
    //   div.classList.add('chatbox__user--active')
    //   var usernameSpan = document.createTextNode(username);
    //   p.appendChild(usernameSpan)
    //   div.appendChild(p)
    //   $userList.appendChild(div)
    // })
  }
}



const closeConnection = () => {
  console.log('envio desconexion to : ')
  console.log(actualUser)
  socket.emit('disconnet_user',actualUser)  

}

// const buildUsersOnline = () = {
//
// }
const $userList = document.getElementById('chatbox__user-list')
const $chat = document.getElementById('chatbox__messages')
const $who = document.getElementById('who-message')
const $button = document.getElementById('btn-send')
const $closeButton = document.getElementById('close')
const $text = document.getElementById('text-area')
// const toggleMessage = () => {
//   // console.log($button.classList.contains('--in'))
//   if(!$who.classList.contains('--in')){
//     $who.classList.toggle('--in')
//   }
// }
actualUser = 'kevin';
const sendMessage = () => {
  var div = document.createElement('div')
  var br = document.createElement('br')
  var p = document.createElement('p')
  var username = document.createTextNode("Kevin Mendez");
  p.classList.add('name')
  p.appendChild(username)
  var message = document.createElement('p')
  message.classList.add('message')
  var t = document.createTextNode($text.value);
  message.appendChild(t)
  div.classList.add('chatbox__messages__user-message--m')
  div.appendChild(p)
  div.appendChild(br)
  div.appendChild(message)
  $chat.appendChild(div)
  socket.emit('private_message', {
    agent : usernameAgent,
     user : actualUser,
     message : $text.value
   })
  $text.value = ''
}

$closeButton.addEventListener('click', closeConnection)
$button.addEventListener('click',sendMessage)


// test()
