
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

//user session.data?.user , can' t type it

export async function fetchSendComment(message:string, user:any) {   

  const response = await fetch('/api/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({message:message, user }), // Sending the message in the request body
  });

return response
}

export async function fetchComments() {

  const url = `/api/comments`
  const response = await fetch(url,{ next: { revalidate: 0 } })
  const data = await response.json()

  return data.comments
}

export async function fetchMessage(id:string) {

  const response = await fetch('/api/messageDetail', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
  });
  

return response
}

export async function fetchDeleteMessage(id:string) {
  
  const response = await fetch('/api/message', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id:id}), // Sending the message in the request body
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

type UserProps = {
  email :string,
  name:string,
  password: string,
  repeatPassword:string
}

export async function registerUser(values:UserProps) {

  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
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
    
