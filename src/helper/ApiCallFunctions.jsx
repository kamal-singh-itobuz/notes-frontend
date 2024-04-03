import { SweetAlert } from "./SweetAlert";
import { SweetAlertError } from "./SweetAlert";
import axios from "axios";
const ROOT_PATH = `https://notes-app-fullstack-cnwf.onrender.com`;

async function fetchData(category, setCategoryNotes) {
    const token = JSON.parse(localStorage.getItem("nameAndToken"))?.token;
    const response = await axios({
        method: "get",
        url: `${ROOT_PATH}/notes/${category}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    setCategoryNotes(response.data.data);
}

async function handleDelete(currentId, setAnyChange) {
    const token = JSON.parse(localStorage.getItem("nameAndToken"))?.token;
    await axios({
        method: "delete",
        url: `${ROOT_PATH}/notes/delete/?id=${currentId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    setAnyChange((prev) => !prev);
    SweetAlert("Note Deleted Successfully!");
}

async function handleMultiDelete(setAnyChange, multiDeleteNotes) {
    const token = JSON.parse(localStorage.getItem("nameAndToken"))?.token;
    await axios({
        method: "delete",
        url: `${ROOT_PATH}/notes/delete`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: multiDeleteNotes,
    });
    setAnyChange((prev) => !prev);
    SweetAlert("Notes Deleted Successfully!");
}

async function handleHide(currentId, setAnyChange) {
    const token = JSON.parse(localStorage.getItem("nameAndToken"))?.token;
    await axios({
        method: "put",
        url: `${ROOT_PATH}/notes/hide/?id=${currentId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    setAnyChange((prev) => !prev);
}

async function addTaskApiCall(title, description) {
    const token = JSON.parse(localStorage.getItem("nameAndToken"))?.token;
    try {
        const response = await axios({
            method: "post",
            url: `${ROOT_PATH}/notes/upload`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { title, description },
        });
        if (response.data.message === 'EXISTS') {
            SweetAlertError("Title Is Already Exists!");
        }
    } catch (e) {
        console.log('Error');
    }
}
async function updateTaskApiCall(title, description, id) {
    const token = JSON.parse(localStorage.getItem("nameAndToken"))?.token;
    try {
        const response = await axios({
            method: "put",
            url: `${ROOT_PATH}/notes/update/?id=${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { title, description },
        });
        if (response.data.message === 'EXISTS') {
            SweetAlertError("Title Is Already Exists!");
        }
    } catch (e) {
        console.log(e.message);
    }
}

async function loginUser(email, password, setAnyChange) {
    try {
        const response = await axios({
            method: 'post',
            url: `${ROOT_PATH}/users/login`,
            data: { email, password }
        });

        if (response.data.message === "MISSING") {
            SweetAlertError('All Fields Are Mandatory!');
            return 0;
        }
        else if (response.data.message === "NOT REGISTERED") {
            SweetAlertError('Your Are Not Registered');
            return 0;
        }
        else if (response.data.message === "UNMATCHED") {
            SweetAlertError('Email or Password is Wrong');
            return 0;
        }
        else if (response.data.accessToken) {
            localStorage.setItem("nameAndToken", JSON.stringify({ token: response.data.accessToken, name: response.data.name }));
            setAnyChange(prev => !prev);
            SweetAlert("Loggin Successfully!");
            return 1;
        }
    }
    catch (e) {
        console.log(e.message);
    }
}

async function registerUser(name, email, phone, password) {
    console.log(name, email, phone, password);
    try {
        const response = await axios({
            method: 'post',
            url: `${ROOT_PATH}/users/register`,
            data: { name, email, phone, password }
        });

        if (response.data.message === "EXISTS") {
            SweetAlertError("User Is Already Exists!");
            return 0;
        }
        if (response.data.message === "MISSING") {
            SweetAlertError("All Fields Are Mandatory!");
            return 0;
        }
    }
    catch {
        console.log('Error');
    }
}

async function searchItems(searchValue, setCategoryNotes) {
    const token = JSON.parse(localStorage.getItem("nameAndToken"))?.token;
    const response = await axios({
        method: 'get',
        url: `${ROOT_PATH}/notes/get-notes/?search=${searchValue}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    setCategoryNotes(response.data.data);
}

export {
    fetchData,
    handleDelete,
    handleMultiDelete,
    handleHide,
    addTaskApiCall,
    updateTaskApiCall,
    loginUser,
    registerUser,
    searchItems,
};
