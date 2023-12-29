import { ref } from 'vue'
import { defineStore } from 'pinia'

// #region types
type Contact = {
  username: string
  name: string
  ref: string
  date: string
}

type Message = {
  sender: string
  receiver: string
  text: string
  date: string
  id: number
}
// #endregion

export const useCounterStore = defineStore('counter', () => {
  // #region Refs
  const selectedContact = ref<Contact | null>(null)
  const contacts = ref<Contact[]>([])
  const chats = ref<Message[]>([])
  const lastMessages = ref<Map<Contact, Message>>(new Map<Contact, Message>())
  const searchedChat = ref<Message | null>()
  // #endregion
  // #region Socket
  const socket = new WebSocket('wss://farawin.iran.liara.run/api/ws/' + localStorage.token)
  socket.addEventListener('message', (e) => {
    const newChat = JSON.parse(e.data)
    chats.value = [...chats.value, newChat]
  })
  // #endregion
  // #region Functions
  function getContacts(): void {
    fetch('https://farawin.iran.liara.run/api/contact', {
      headers: {
        authorization: `${localStorage.token}`
      },
      method: 'GET',
      mode: 'cors'
    }).then((r) =>
      r.json().then((res) => {
        if (res.code == '200')
          contacts.value = res.contactList.filter(
            (contact: Contact) => contact.ref == localStorage.username
          )
      })
    )
  }
  getContacts()
  function getMessage(): void {
    fetch('https://farawin.iran.liara.run/api/chat', {
      headers: {
        authorization: `${localStorage.token}`
      },
      method: 'GET',
      mode: 'cors'
    }).then((r) =>
      r.json().then((res) => {
        chats.value = res.chatList.filter(
          (chat: Message) =>
            contacts.value.filter(
              (contact) => contact.username == chat.receiver || contact.username == chat.sender
            ).length > 0 &&
            chat.sender != chat.receiver &&
            (chat.sender == localStorage.username || chat.receiver == localStorage.username)
        )
      })
    )
  }
  getMessage()

  function spilitStr(st: string | undefined): string | undefined {
    if (st) {
      const arr = st.split(' ').map((e) => e[0])
      let strr: string = ''
      for (const char in arr) {
        strr += arr[char]
      }
      return strr
    }
    return undefined
  }
  function dirr(text: string | undefined): string {
    let str: string = ''
    if (text)
      (text.charCodeAt(0) <= 122 && text.charCodeAt(0) >= 97) ||
      (text.charCodeAt(0) <= 90 && text.charCodeAt(0) >= 65)
        ? (str = 'ltr')
        : (str = 'rtl')
    return str
  }
  // #endregion
  return {
    selectedContact,
    contacts,
    chats,
    lastMessages,
    searchedChat,
    getContacts,
    spilitStr,
    getMessage,
    dirr
  }
})
