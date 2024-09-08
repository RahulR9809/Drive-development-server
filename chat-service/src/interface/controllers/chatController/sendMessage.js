import { verifyAccessToken } from "../../../utils/jwt.js";

export class SendMessageController {
  constructor(dependencies) {
    this.sendMessageUseCase = new dependencies.useCase.SendMessageUseCase(
      dependencies
    );
  }
  async sendMessage(req, res, next) {
    try {
      console.log(req.body);
      const sender = await verifyAccessToken(req.body.token);
      console.log(sender);

      const senderId = sender.role == "DRIVER" ? sender._id : sender.id;
      console.log(senderId);
      const data = {
        senderId,
        receiverId: req.body.recieverId,
        message: req.body?.message,
        tripId: req.body.tripId,
      };
      const message = await this.sendMessageUseCase.execute(data);
      res.status(201).json({ message: "success" });
    } catch (error) {
      console.error(error);
    }
  }
}
