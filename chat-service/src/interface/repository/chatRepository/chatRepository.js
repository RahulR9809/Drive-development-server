import { chatModel } from "../../database/schema/ChatSchema/chatSchema.js"
import { messageModel } from "../../database/schema/ChatSchema/messageSchema.js"
export class ChatRepository{
    constructor(){}

    async findChatByTripId(id){

const data =  await chatModel.findOne({tripId:id})
console.log("log data",data);
return data
    }
    async createChat(data){
        try {
            console.log('data',data);
            
         return  await chatModel.create({
                tripId:data?.tripId,
                participants:[data?.senderId,data?.receiverId],
            })
        } catch (error) {
            console.error(error)
        }
    }

    async createNewMessage(data){
        try {
          const newMessage =    await messageModel.create({
                senderId:data?.senderId,
                recieverId:data?.receiverId,
                message:data?.message
            })
            console.log('newMessage',newMessage);
            
            const updateChat_LatestMessage = await chatModel.findOneAndUpdate({tripId:data?.tripId},{$push:{messages:newMessage._id}},{new:true})
            console.log('updatelatest',updateChat_LatestMessage);
            
            return newMessage
        } catch (error) {
            console.error(error)
        }
    }

    async getAllMessages(id){
        try {
 const chats = await chatModel.findOne({tripId:id}).populate("messages")
 if(!chats){
    return []
 }
 return chats.messages
            
        } catch (error) {
            
        }
    }
}