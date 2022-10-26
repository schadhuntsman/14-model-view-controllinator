async function editFormHandler(event) {
    event.preventDefault();

    let element = event.target;
    console.log("status: "+ element);
    var postid = element.getAttribute("data-postid");
        console.log("getAttribute: "+postid);

    const title="yes";
    const content="yes";
      if (title && content) {
        const response = await fetch('/api/post/edit/', {
          method: 'POST',
          body: JSON.stringify({ postid }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          document.location.replace('/editpost');
        } else {
          alert(response.statusText);
        }
      }
};

document
.querySelector('#main')
.addEventListener('click', editFormHandler);