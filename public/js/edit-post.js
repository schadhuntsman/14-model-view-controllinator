async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    
    const response = await fetch(`/api/posts/${post_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        post_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
    document.location.replace('/dashboard');
  };
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);

  async function deleteFormHandler(event) {
    event.preventDefault();
  
    const title = "test";
    const content = "test";
  
    if (title && content) {
      const response = await fetch('/api/post/delete/', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        console.log("your code failed for the create button. check out ./js/dashboard.js line 65");

        alert(response.statusText);
      }
    }
  };
  document
    .querySelector('#delete')
    .addEventListener('click', deleteFormHandler);
