const io = require('./index.js').io
const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../Constants')
const uuidv4 = require('uuid/v4')

const createUser = ({name = "", socketId = null } = {})=>(
	{
		id:uuidv4(),
		name,
		socketId

	}
)

const createMessage = ({message = "", sender = ""} = { })=>(
		{
			id:uuidv4(),
			time:getTime(new Date(Date.now())),
			message,
			sender
		}

	)

const createChat = ({messages = [], name = "Users", users = []} = {})=>(
	{
		id:uuidv4(),
		name,
		messages,
		users,
		typingUsers:[]
	}
)

const getTime = (date)=>{
	return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`
}

let connectedUser = { }

module.exports = function(socket){
   console.log("socket id" + socket.id)


//Verify Username
socket.on(VERIFY_USER, (fullname, callback)=>{
  if(isUser(connectedUser, fullname)){
    callback({ isUser: true, user:null })
  }else{
    callback({ isUser: false, user:createUser({name: fullname})})
  }
})

//user connects Username
socket.on(USER_CONNECTED, (user)=>{
  connectedUser = addUser(connectedUser, user)
  socket.user = user;
  io.emit(USER_CONNECTED, connectedUser)
  console.log(connectedUser)
})

function isUser(userList, username){
  return username in userList
}

function addUser(userList, user){
	let newList = Object.assign({}, userList)
	newList[user.name] = user
	return newList
}

function removeUser(userList, username){
	let newList = Object.assign({}, userList)
	delete newList[username]
	return newList
}
}
