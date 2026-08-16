import axios from 'axios'

const agentClient = axios.create({
  baseURL: import.meta.env.VITE_AGENT_SERVICE_URL ?? 'http://localhost:8001',
})

export interface ChatReply {
  reply: string
  session_id: string
}

export async function sendMessage(message: string, sessionId: string): Promise<ChatReply> {
  const res = await agentClient.post<ChatReply>('/chat', { message, session_id: sessionId })
  return res.data
}
