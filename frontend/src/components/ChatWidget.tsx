import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import {
  Banknote,
  CreditCard,
  LifeBuoy,
  Maximize2,
  MessageCircle,
  Minimize2,
  Search,
  Send,
  TrendingUp,
  User as UserIcon,
  Wallet,
  X,
  type LucideIcon,
} from 'lucide-react'
import { sendMessage, type ChatMode } from '../api/chat'
import { useAuth } from '../context/AuthContext'

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

const GREETINGS: Record<ChatMode, ChatMessage> = {
  bank: {
    id: 'greeting-bank',
    role: 'assistant',
    text: "Hi! I'm the Yash Bank Assistant. Ask me anything, or pick a topic below.",
  },
  personal: {
    id: 'greeting-personal',
    role: 'assistant',
    text: "Hi! I'm your Personal Assistant — ask me about your balances, spending, or transactions.",
  },
}

const QUICK_ACTIONS: QuickAction[] = [
  { icon: Wallet, label: 'Explore accounts', message: 'What accounts do you offer?' },
  { icon: CreditCard, label: 'Explore cards', message: 'What cards do you offer?' },
  { icon: Banknote, label: 'Explore loans', message: 'What loans do you offer?' },
  { icon: LifeBuoy, label: 'Raise a support ticket', message: "I'd like to raise a support ticket." },
  { icon: Search, label: 'Check a ticket status', message: 'I want to check the status of a support ticket.' },
]

const QUICK_ACTIONS_PERSONAL: QuickAction[] = [
  { icon: Wallet, label: 'Account summary', message: "What's my current balance across all accounts?" },
  { icon: TrendingUp, label: "This month's spending", message: 'How much have I spent this month?' },
  { icon: Banknote, label: 'Highest-spend month', message: 'Which month did I spend the most?' },
  { icon: CreditCard, label: 'Interest earned', message: 'How much interest have I earned?' },
  { icon: Search, label: 'Search transactions', message: 'Show me my transactions above ₹2000 last month.' },
]

const markdownComponents = {
  p: ({ children }: { children?: ReactNode }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="mb-2 list-disc space-y-0.5 pl-4 last:mb-0">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="mb-2 list-decimal space-y-0.5 pl-4 last:mb-0">{children}</ol>
  ),
  li: ({ children }: { children?: ReactNode }) => <li className="pl-0.5">{children}</li>,
  strong: ({ children }: { children?: ReactNode }) => <strong className="font-semibold">{children}</strong>,
  a: ({ children, href }: { children?: ReactNode; href?: string }) => (
    <a href={href} target="_blank" rel="noreferrer" className="underline underline-offset-2">
      {children}
    </a>
  ),
}

export function ChatWidget() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [mode, setMode] = useState<ChatMode>('bank')
  const [messagesByMode, setMessagesByMode] = useState<Record<ChatMode, ChatMessage[]>>({
    bank: [GREETINGS.bank],
    personal: [GREETINGS.personal],
  })
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const messages = messagesByMode[mode]
  const locked = mode === 'personal' && !user

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages, sending])

  async function sendText(text: string) {
    if (!text || sending || locked) return

    setMessagesByMode((prev) => ({
      ...prev,
      [mode]: [...prev[mode], { id: crypto.randomUUID(), role: 'user', text }],
    }))
    setSending(true)

    try {
      const { reply } = await sendMessage(text, getSessionId(), mode)
      setMessagesByMode((prev) => ({
        ...prev,
        [mode]: [...prev[mode], { id: crypto.randomUUID(), role: 'assistant', text: reply }],
      }))
    } catch {
      setMessagesByMode((prev) => ({
        ...prev,
        [mode]: [
          ...prev[mode],
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
          },
        ],
      }))
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

          <div className="flex gap-1 border-b border-slate-200 bg-slate-50 p-1.5">
            <button
              onClick={() => setMode('bank')}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors ${
                mode === 'bank' ? 'bg-maroon-800 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <LifeBuoy className="size-3.5" strokeWidth={1.75} />
              Bank Assistant
            </button>
            <button
              onClick={() => setMode('personal')}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors ${
                mode === 'personal' ? 'bg-maroon-800 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <UserIcon className="size-3.5" strokeWidth={1.75} />
              My Account
            </button>
          </div>

          <div ref={scrollRef} className={`flex-1 overflow-y-auto px-4 py-4 space-y-3 ${expanded ? 'max-w-3xl mx-auto w-full' : ''}`}>
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-3.5 py-2 leading-relaxed ${expanded ? 'text-base px-4 py-2.5' : 'text-sm'} ${
                    m.role === 'user' ? 'bg-maroon-800 text-white whitespace-pre-wrap' : 'bg-slate-100 text-slate-900'
                  }`}
                >
                  {m.role === 'assistant' ? (
                    <ReactMarkdown components={markdownComponents}>{m.text}</ReactMarkdown>
                  ) : (
                    m.text
                  )}
                </div>
              </div>
            ))}

            {sending && (
              <div className="flex justify-start">
                <div className="rounded-xl bg-slate-100 px-3.5 py-2 text-sm text-slate-400">Typing…</div>
              </div>
            )}
          </div>

          {locked ? (
            <div className={`border-t border-slate-200 p-4 text-center ${expanded ? 'max-w-3xl mx-auto w-full' : ''}`}>
              <p className="text-sm text-slate-600">Log in to ask the Personal Assistant about your accounts.</p>
              <Link
                to="/login"
                className="mt-2 inline-block rounded-lg bg-maroon-800 px-4 py-2 text-xs font-medium text-white hover:bg-maroon-700 transition-colors"
              >
                Log in
              </Link>
            </div>
          ) : (
            <>
              <div className={`flex items-center gap-2 overflow-x-auto border-t border-slate-200 px-3 py-2.5 ${expanded ? 'max-w-3xl mx-auto w-full' : ''}`}>
                {(mode === 'personal' ? QUICK_ACTIONS_PERSONAL : QUICK_ACTIONS).map(({ icon: Icon, label, message }) => (
                  <button
                    key={label}
                    onClick={() => sendText(message)}
                    disabled={sending}
                    className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-maroon-300 bg-white px-3 py-1.5 text-xs font-medium text-maroon-800 hover:bg-maroon-50 disabled:opacity-50 transition-colors"
                  >
                    <Icon className="size-3.5" strokeWidth={1.75} />
                    {label}
                  </button>
                ))}
              </div>

              <form
                onSubmit={handleSubmit}
                className={`flex items-center gap-2 border-t border-slate-200 p-3 ${expanded ? 'max-w-3xl mx-auto w-full' : ''}`}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={mode === 'personal' ? 'Ask about your balance, spending, transactions…' : 'Ask about accounts, cards, loans…'}
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
            </>
          )}
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
