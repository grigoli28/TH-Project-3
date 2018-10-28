window.onload = () => {
    const removePersonBtn = document.getElementById('remove');
    const disablePersonBtn = document.getElementById('disable');
    const editPersonBtn = document.getElementById('edit');
    const editPersonForm = document.getElementById('editForm');
    const saveEditedDetails = document.getElementById('saveEdited');


    editPersonBtn.addEventListener('click', () => {
        editPersonForm.classList.toggle('hidden');
    });


    removePersonBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const requestUrl = e.target.formAction;
        (async function(url) {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "Accept": "text/plain"
                }
            });
            if (response.status == '200') {
                alert('Person Removed!');
                window.location.replace('/persons');
            } else {
                alert('Error Occured!');
            }
        })(requestUrl);
    });


    disablePersonBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const requestUrl = e.target.formAction;
        const requestBody = new URLSearchParams("disabled=true");

        (async function(url, body) {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "Accept": "text/plain"
                },
                body
            });
            if (response.status == '200') {
                alert('Person Disabled!');
                // disablePersonBtn.textContent = "Enable";
            } else {
                alert('Error Occured!');
            }
        })(requestUrl, requestBody);
    });


    saveEditedDetails.addEventListener('click', (e) => {
        e.preventDefault();
        const editInputs = document.querySelectorAll('.editInput');
        const requestUrl = e.target.formAction;
        const requestBody = new URLSearchParams();
        editInputs.forEach(input => {
            requestBody.set(input.name, input.value);
        });

        (async function(url, body) {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "Accept": "text/plain"
                },
                body
            });
            if (response.status == '200') {
                alert('Details Updated!');
                window.location.reload();
            } else {
                alert('Error Occured!');
            }
        })(requestUrl, requestBody);
    });
};