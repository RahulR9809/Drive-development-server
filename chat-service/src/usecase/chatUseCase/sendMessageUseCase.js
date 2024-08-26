import { sendMessage } from "../../utils/socket.js"
export class SendMessageUseCase{
    constructor(dependencies){
this.chatRepository = new dependencies.repository.MongoChatRepository()
    }
    async execute(data){
        try {
            console.log('data in usecase',data);
            
const isChatExist = await this.chatRepository.findChatByTripId(data?.tripId)
console.log('ischatexist',isChatExist);

let chat
if(!isChatExist){
    console.log('entry');
    
   chat =  await this.chatRepository.createChat(data)
}
const latestMessage = await this.chatRepository.createNewMessage(data)


sendMessage('latestMessage',latestMessage,data?.receiverId)
return
            
        } catch (error) {
            console.error(error)
        }
    }
}