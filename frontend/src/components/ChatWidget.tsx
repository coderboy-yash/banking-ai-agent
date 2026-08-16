import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  Banknote,
  CreditCard,
  LifeBuoy,
  Maximize2,
  MessageCircle,
  Minimize2,
  Search,
  Send,
  Wallet,
  X,
  type LucideIcon,
} from 'lucide-react'
import { sendMessage } from '../api/chat'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
}

interface QuickAction {
  icon: LucideIcon
  label: string
  message: string
}

function getSessionId() {
  const key = 'yash_chat_session_id'
  let id = localStorage.getItem(key)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(key, id)
  }
  return id
}

const GREETING: ChatMessage = {
  id: 'greeting',
  role: 'assistant',
  text: "Hi! I'm the Yash Bank Assistant. Here's what I can help with:",
}

const QUICK_ACTIONS: QuickAction[] = [
  { icon: Wallet, label: 'Explore accounts', message: 'What accounts do you offer?' },
  { icon: CreditCard, label: 'Explore cards', message: 'What cards do you offer?' },
  { icon: Banknote, label: 'Explore loans', message: 'What loans do you offer?' },
  { icon: LifeBuoy, label: 'Raise a support ticket', message: "I'd like to raise a support ticket." },
  { icon: Search, label: 'Check a ticket status', message: 'I want to check the status of a support ticket.' },
]

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages, sending])

  async function sendText(text: string) {
    if (!text || sending) return

    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', text }])
    setSending(true)

    try {
      const { reply } = await sendMessage(text, getSessionId())
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'assistant', text: reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ])
    } finally {
      setSending(false)
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setInput('')
    await sendText(text)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div
          className={
            expanded
              ? 'mb-4 fixed inset-6 md:inset-12 rounded-xl border-2 border-maroon-400 bg-white shadow-2xl flex flex-col overflow-hidden'
              : 'mb-4 w-96 max-w-[calc(100vw-3rem)] h-[520px] max-h-[70vh] rounded-xl border-2 border-maroon-400 bg-white shadow-2xl flex flex-col overflow-hidden'
          }
        >
          <div className="flex items-center justify-between bg-maroon-900 px-4 py-3">
            <span className="text-white text-sm font-semibold">Yash Bank Assistant</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setExpanded((v) => !v)}
                className="text-white/70 hover:text-white"
                aria-label={expanded ? 'Minimize chat' : 'Maximize chat'}
              >
                {expanded ? (
                  <Minimize2 className="size-4.5" strokeWidth={1.75} />
                ) : (
                  <Maximize2 className="size-4.5" strokeWidth={1.75} />
                )}
              </button>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white" aria-label="Close chat">
                <X className="size-5" strokeWidth={1.75} />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className={`flex-1 overflow-y-auto px-4 py-4 space-y-3 ${expanded ? 'max-w-3xl mx-auto w-full' : ''}`}>
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-3.5 py-2 leading-relaxed ${expanded ? 'text-base px-4 py-2.5' : 'text-sm'} ${
                    m.role === 'user' ? 'bg-maroon-800 text-white' : 'bg-slate-100 text-slate-900'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="flex flex-col items-start gap-2">
                {QUICK_ACTIONS.map(({ icon: Icon, label, message }) => (
                  <button
                    key={label}
                    onClick={() => sendText(message)}
                    disabled={sending}
                    className="flex items-center gap-2 rounded-full border border-maroon-300 bg-white px-3.5 py-2 text-sm text-maroon-800 hover:bg-maroon-50 disabled:opacity-50 transition-colors"
                  >
                    <Icon className="size-4" strokeWidth={1.75} />
                    {label}
                  </button>
                ))}
              </div>
            )}

            {sending && (
              <div className="flex justify-start">
                <div className="rounded-xl bg-slate-100 px-3.5 py-2 text-sm text-slate-400">Typing…</div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className={`flex items-center gap-2 border-t border-slate-200 p-3 ${expanded ? 'max-w-3xl mx-auto w-full' : ''}`}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about accounts, cards, loans…"
              className={`flex-1 rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-maroon-600 ${expanded ? 'text-base py-2.5' : 'text-sm'}`}
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="shrink-0 rounded-lg bg-maroon-800 p-2.5 text-white hover:bg-maroon-700 disabled:opacity-50 transition-colors"
            >
              <Send className="size-4" strokeWidth={2} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="size-14 rounded-full bg-maroon-800 text-white shadow-xl flex items-center justify-center hover:bg-maroon-700 transition-colors"
        aria-label="Open chat assistant"
      >
        {open ? <X className="size-6" strokeWidth={1.75} /> : <MessageCircle className="size-6" strokeWidth={1.75} />}
      </button>
    </div>
  )
}
