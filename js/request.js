// const { get } = require("request")

// api
const API = "https://randomuser.me/api/?results=9";

// for leader
const overlay = document.getElementById("overlay");

// toggle loader
const loaderToggle = (toggle) => {
    if (toggle) {
        overlay.classList.remove("hidden");
    } else {
        overlay.classList.add("hidden");
    }
};

//  request promise
const getDate = (resource) => {
    return new Promise((resove, reject) => {
        const request = new XMLHttpRequest();

        request.addEventListener("readystatechange", () => {
            if (request.readyState < 4) {
                loaderToggle(true);
            } else if (request.readyState == 4 && request.status == 200) {
                const date = JSON.parse(request.responseText);
                resove(date.results);
                loaderToggle(false);
            } else if (reject.readyState == 4) {
                reject("Error!!!");
                loaderToggle(false);
            }
        });

        request.open("GET", resource);
        request.send();
    });
};

// load
const reload = () => {
    getDate(API)
        .then((date) => {
            updateUI(date);
        })
        .catch((err) => { });
};

document.addEventListener("DOMContentLoaded", reload);
