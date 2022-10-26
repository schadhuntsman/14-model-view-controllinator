async function commentFormHandler(event) {
     event.preventDefault();
 
     const content = document.querySelector('#content').value.trim();
 
  try {
       const response = await fetch(`/api/comments`, {
               method: 'POST',
               body: JSON.stringify({
                content
               }),
               headers: {
                   'Content-Type': 'application/json'
               }
           });
     
     if (response.ok) {
         document.location.reload('/comment');}
     } catch (err) {
         alert(response.statusText);
     }
   }
 

 document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);

 async function editFormHandler(event) {
    event.preventDefault();

    let element = event.target;
    var commentId = element.getAttribute("data-commentId");
    
    const title="yes";
    const content="yes";


    if (title && content) { 
      const response = await fetch('/api/comment/edit', {
        method: 'POST',
        body: JSON.stringify({ commentId }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/editcomment');
      } else {
        alert(response.statusText);
      }
    }
  };
  
    document
      .querySelector('#main')
      .addEventListener('click', editFormHandler);