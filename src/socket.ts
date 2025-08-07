import { createServer } from "node:http";
import { Server } from "socket.io"
import config from "config"

const ws_server = createServer()

const ALLOWED_DOMAINS = [config.get("frontend.clientUI"), config.get("frontend.adminUI")]


const io = new Server(ws_server, { cors: { origin: ALLOWED_DOMAINS } })

io.on("connection", (socket) => {
    console.log("Client connected", socket.id);

    socket.on("join", (data) => {
        socket.join(String(data.tenantId))
        socket.emit("join", { roomId: String(data.tenantId) })
    })

})

export default {
    ws_server,
    io
}