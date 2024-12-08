const { WebSocketServer } = require('ws');
const { saveChatMessage, getChatHistory, markMessagesAsRead } = require('./database_methods');

function webSocket(httpServer) {
    const wss = new WebSocketServer({ noServer: true });
    const connections = new Map();

    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });

    wss.on('connection', (ws, request) => {
        const username = extractUsernameFromRequest(request);

        if (!username) {
            ws.close(1008, 'Authentication required');
            return;
        }

        connections.set(username, ws);

        // When a client connects, send any unread messages
        sendUnreadMessages(username, ws);

        ws.on('message', async (data) => {
            try {
                const message = JSON.parse(data);

                if (message.type === 'sendMessage') {
                    const { to: recipient, text } = message;

                    // Save message to database
                    await saveChatMessage(username, recipient, text);

                    // Try to send message directly if recipient is online
                    const recipientWs = connections.get(recipient);
                    if (recipientWs) {
                        recipientWs.send(JSON.stringify({ 
                            type: 'newMessage', 
                            from: username, 
                            message: text 
                        }));
                    }

                    // Optionally send a delivery confirmation back to sender
                    ws.send(JSON.stringify({ 
                        type: 'messageSent', 
                        to: recipient 
                    }));
                }
                else if (message.type === 'getChatHistory') {
                    const { with: otherUser } = message;
                    const chatHistory = await getChatHistory(username, otherUser);
                    
                    // Mark messages as read
                    await markMessagesAsRead(otherUser, username);

                    ws.send(JSON.stringify({ 
                        type: 'chatHistory', 
                        messages: chatHistory 
                    }));
                }
            } catch (error) {
                console.error('WebSocket message handling error:', error);
                ws.send(JSON.stringify({ 
                    type: 'error', 
                    message: 'Failed to process message' 
                }));
            }
        });

        ws.on('close', () => {
            connections.delete(username);
        });
    });

    async function sendUnreadMessages(username, ws) {
        try {
            // Retrieve and send unread messages for this user
            const chatHistory = await getChatHistory(username);
            const unreadMessages = chatHistory.filter(msg => 
                msg.recipient === username && !msg.read
            );

            if (unreadMessages.length > 0) {
                ws.send(JSON.stringify({ 
                    type: 'unreadMessages', 
                    messages: unreadMessages 
                }));

                // Mark these messages as read
                await markMessagesAsRead(username);
            }
        } catch (error) {
            console.error('Error sending unread messages:', error);
        }
    }

    function extractUsernameFromRequest(request) {
        try {
            const url = new URL(request.url, `http://${request.headers.host}`);
            const username = url.searchParams.get('username');
            
            if (!username) {
                console.error('No username provided in WebSocket connection');
                return null;
            }
            
            return username;
        } catch (error) {
            console.error('Error extracting username from WebSocket request:', error);
            return null;
        }
    }
}

module.exports = { webSocket };