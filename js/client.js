const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container") 
 
const append = (message, position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
    audio.play();
    }

}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.Value;
    append('You: ${message}','right');
    socket.emit('send', message)
    messageInput.Value = ''

})

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name) 

socket.on('user-joined', name =>{
append('${name} joined the chat','right')    
})
socket.on('receive', data =>{
append('${data.name} : ${data.message}', 'left')  
})
socket.on('left', name =>{
    append('${name} left the chat', 'left')  
    })

//  when joinging any audio then 
// write the following code :
//var audio = new Audio('ting.mp3'); //ting.mp3 if the file which u saved

