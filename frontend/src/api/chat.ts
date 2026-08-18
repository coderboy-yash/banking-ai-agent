import axios from 'axios'

const agentClient = axios.create({
  baseURL: import.meta.env.VITE_AGENT_SERVICE_URL ?? 'http://localhost:8001',
})

export interface ChatReply {
  reply: string
  session_id: string
}

export type ChatMode = 'bank' | 'personal'

export async function sendMessage(message: string, sessionId: string, mode: ChatMode): Promise<ChatReply> {
  const token = localStorage.getItem('yash_token')
  const res = await agentClient.post<ChatReply>(
    '/chat',
    { message, session_id: sessionId, mode },
    token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
  )
  return res.data
}
