let animations, counter, sliderStyles, arrowsStyle, imgStyle, context, lftArrow, rgtArrow;
var query = window.matchMedia("(max-width : 600px)");
const slider = $("#slider");
let images = [];
let loopId;
init();

renderImg(counter);
myFunction(query);
loopId = loop();


//Event Listeners
query.addListener(myFunction);




addListenerMulti(slider, 'mouseenter click', (e) => {
    [].slice.call($('[data-class=text]')).forEach((el) => el.remove());
    renderTxt(counter);
});


rgtArrow.addEventListener('click', function nextImage() {
    counter = (++counter == images.length) ? 0 : counter;
    renderImg(counter);
    clear(counter, 0);
    resetLoop(loopId);
});

lftArrow.addEventListener('click', function () {
    counter = (--counter < 0) ? images.length - 1 : counter;
    renderImg(counter);
    // animate($(`.slide${indx}`), "fadeIn");
    clear(counter, 0);
    resetLoop(loopId);
});

function resetLoop(id) {
    clearInterval(id);
    loopId = loop();
}




/// loop on
function loop() {
    const id = setInterval(() => {
        renderImg(counter = (++counter == images.length) ? 0 : counter);
        clear(counter);
    }, 4e3);
    return id;
}


let lftStyle = Object.create(arrowsStyle);
lftStyle.left = "2%";

let rgtStyle = Object.create(arrowsStyle);
rgtStyle.right = "2%";
setStyles(lftArrow, lftStyle);
setStyles(rgtArrow, rgtStyle);
setStyles(slider, sliderStyles);











function animate(className, animation) {
    $(className).forEach(() => {
        anima[animation];
    });
}






const anima = {
    fadeIn: function (time) {
        return setInterval((el) => {
            el.style.opacity = 0;
        }, time)
    },
    fadeOut: function () {},
    fadeInLeft: function () {},
    fadeInRight: function () {}
}

// Utils
function renderImg(indx = 0) {
    let img = newElement('img', slider, `slide${indx}`, {
        src: images[indx].src
    })
    setStyles(img, imgStyle);
}

function renderTxt(indx = 0) {
    let text = newElement('div', slider, `slide${indx}`);
    text.setAttribute('data-class', "text");
    text.style.backgroundColor = `${images[indx].color}`;
    text.innerHTML = `<h2 style="margin:.6rem 0;">${images[indx].title}</h2>
    <p>${images[indx].text}</p>`;
    setStyles(text, context);
}

function newElement(tag, parent, className, attributes) {
    let el = document.createElement(tag);
    el.setAttribute('class', className);
    if (attributes)
        for (let a in attributes) {
            el.setAttribute(a, attributes[a]);
        }
    parent.appendChild(el);
    return parent.lastElementChild;
}

function setStyles(tag, styles) {
    for (key in styles) {
        tag.style[key] = styles[key];
    }
}

function clear(pos, delay) {
    setTimeout(() => {
        [].slice.call($('[class^="slide"]')).forEach((el, i, arr) => {
            if (el.className !== `slide${pos}`) {
                el.remove();
            }
        })
    }, delay);
}

function myFunction(query) {
    if (query.matches) { // If media query matches
        document.body.style.backgroundColor = "#ddd";
        slider.style.fontSize = "12px";
    } else {
        slider.style.fontSize = "16px";
        document.body.style.backgroundColor = "#aaa";
    }
}

//Selector
function $(param) {
    let query = document.querySelectorAll(param);
    return (query.length == 1) ? query[0] : query;
}

// multi listener
function addListenerMulti(el, events, fn) {
    events.split(' ').forEach(e => el.addEventListener(e, fn, false));
}



function init() {
    lftArrow = newElement("i", slider, "fas fa-arrow-alt-circle-left fa-3x");
    rgtArrow = newElement("i", slider, "fas fa-arrow-alt-circle-right fa-3x");
    counter = 0;

    // Styles 
    sliderStyles = {
        maxWidth: "800px",
        minHeight: "300px",
        height: "400px",
        width: "90vw",
        margin: "auto",
        backgroundColor: "#000",
        borderRadius: "6px",
        position: "relative",
        overflow: "hidden"
    };

    arrowsStyle = {
        position: "absolute",
        top: "45%",
        opacity: ".2",
        color: "#fff",
        zIndex: "100",
        cursor: "pointer"
    };
    imgStyle = {
        position: "absolute",
        width: "100%",
        transition: "all 1.5s ease-in",
        // top: "50%",
        // lef: "50%",
        // transform: "translateY(-50%)"
    };
    //Styles
    context = {
        width: "100%",
        height: "30%",
        position: "absolute",
        opacity: 0.7,
        padding: "0 2rem",
        fontFamily: "Verdana, Sans-serif",
        color: "#eee",
        zIndex: "100",
        bottom: "0"
    };

    images = [{
            title: "Parrot",
            text: "Lorem ipsum Parrot eti dei elium",
            src: "/img/parrot-min.jpg",
            color: "#880"
        },
        {
            title: "Frog",
            text: "Lorem ipsum Frog eti dei elium",
            src: "/img/frog-min.jpg",
            color: "#683"
        },
        {
            title: "Mandrill",
            text: "Lorem ipsum Mandrill eti dei elium",
            src: "/img/mandrill-min.jpg",
            color: "#633"
        },
        {
            title: "Kingfisher",
            text: "Lorem ipsum eti Kingfisher dei elium",
            src: "/img/kingfisher-min.jpg",
            color: "#067"
        },
        {
            title: "Orangutan",
            text: "Lorem ipsum eti Orangutan dei elium",
            src: "/img/orangutan-min.jpg",
            color: "#743"
        },
        {
            title: "Bear",
            text: "Lorem ipsum eti Bear dei elium",
            src: "/img/bear-min.jpg",
            color: "#777"
        },
        {
            title: "Fox",
            text: "Lorem ipsum  Fox eti dei elium",
            src: "/img/fox-min.jpg",
            color: "#954"
        }
    ]
}


// TISP
// [id^='someId'] will match all ids starting with someId.
// [id$='someId'] will match all ids ending with someId.
// [id*='someId'] will match all ids containing someId.
// transition: background[property] 1.5s[duration] ease-in[timing] 1[delay];
// media queries 
// https: //developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
// event types
// https://developer.mozilla.org/en-US/docs/Web/Events

////