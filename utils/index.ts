
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


export async function fetchComments() {

  const response = await fetch(`/api/comments`)
  const data = await response.json()

return data.comments
}

export async function fetchMessage(id:string) {

  const response = await fetch('/api/messageDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
  });
  

return response
}

export async function fetchComment(id:string) {

  const response = await fetch('/api/commentDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
  });
  

return response
}

export async function fetchUser(id:string) {

  const response = await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
  });
  

return response
}

type Values = {
  id: string;
  activeUser: boolean;
};

export async function fetchActiveUser(values: Values) {
  try {
    const response = await fetch('/api/activeUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values }), // Sending the message in the request body
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    return { success: false, message: 'Failed to save Actve User state' };
  }
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
    
