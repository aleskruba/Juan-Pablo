
export async function fetchUsers() {

        const response = await fetch(`/api/users`)
        const data = await response.json()

    return data.users
}

export async function fetchMessages() {

  const response = await fetch(`/api/messages`)
  const data = await response.json()

return data.messages
}


export async function sendMessage(message: string) {
    try {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }), // Sending the message in the request body
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      return { success: false, message: 'Failed to send the message' };
    }
  }
    
