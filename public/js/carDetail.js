window.onload = () => {
    const removeCarBtn = document.getElementById('remove');
    const disableCarBtn = document.getElementById('disable');
    const editCarBtn = document.getElementById('edit');
    const editCarForm = document.getElementById('editForm');
    const saveEditedDetails = document.getElementById('saveEdited');


    editCarBtn.addEventListener('click', () => {
        editCarForm.classList.toggle('hidden');
    });


    removeCarBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const requestUrl = e.target.formAction;
        (async function (url) {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "Accept": "text/plain"
                }
            });
            if (response.status == '200') {
                alert('Car Removed!');
                window.location.replace('/cars');
            } else {
                alert('Error Occured!');
            }
        })(requestUrl);
    });


    disableCarBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const requestUrl = e.target.formAction;
        const requestBody = new URLSearchParams("disabled=true");

        (async function (url, body) {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "Accept": "text/plain"
                },
                body
            });
            if (response.status == '200') {
                alert('Car Disabled!');
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

        (async function (url, body) {
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