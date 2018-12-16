let animations, index, sliderStyles, arrowsStyle, imgStyle, context, lftArrow, rgtArrow, loopSec, loopId, outDelay, toggle;
let md = window.matchMedia("(max-width : 700px)"); //screen media query
let sm = window.matchMedia("(max-width : 450px)"); //screen media query
const slider = $("#slider");
let images = [];


//START development

init(); // sets the slider attributes
renderImg(index); // index is the index of the image. default starts at 0 
mediaQuery(md); // beta. needs further implementation for responsive design
loopId = loop(true); // pass "false" to stop the default loop



function init() {
    // customize 
    index = 0; //the index of the starting image
    loopDelay = 4; //the delay for the loop in Seconds
    outDelay = 800; //the delay for the outSlide in milliseconds

    // Change Styles  Here
    sliderStyles = {
        // maxWidth: "800px",
        width: "80vw",
        height: "40vw",
        margin: "auto",
        backgroundColor: "#000",
        borderRadius: "4px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 .5rem 2rem #000a",
        textAlign: "center"
    };

    //Style for the context box
    context = {
        width: "100%",
        fontSize: "1em",
        height: "20%",
        position: "absolute",
        padding: "0 2em",
        fontFamily: "Verdana, Sans-serif",
        color: "#eee",
        zIndex: "100",
        bottom: "0",
        transition: "all .5s ease-in-out",
        animationDuration: ".5s",
        animationFillMode: "both",
        animationName: "fadeIn"
    };

    //image style
    imgStyle = {
        position: "absolute",
        width: "80%",
        left: "10%",
        top: "0",

        transition: "all 1.5s ease-in-out",
        animationDuration: ".8s",
        animationFillMode: "both",
        animationName: "fadeIn"
    };

    // arrowsStyle
    arrowsStyle = {
        position: "absolute",
        top: "45%",
        opacity: ".2",
        color: "#fff",
        zIndex: "100",
        cursor: "pointer"
    };



    images = [{
            title: "Parrot",
            text: "Lorem ipsum Parrot eti dei elium",
            src: "/img/parrot-min.jpg",
            color: "#880" //optional
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

    lftArrow = newElement("i", slider, "fas fa-arrow-alt-circle-left fa-3x");
    rgtArrow = newElement("i", slider, "fas fa-arrow-alt-circle-right fa-3x");
    toggle = true; //avoid double clicking on arrows
}


//Event Listeners
md.addListener(mediaQuery);
sm.addListener(mediaQuery);


//delete duplicate box context when the arrow is clicked 
addListenerMulti(slider, 'mouseenter click', (e) => {
    [].slice.call($('[data-class=text]')).forEach((el) => el.remove());
    renderTxt(index);
});


// right arrow function
rgtArrow.addEventListener('click', function nextImage() {
    if (toggle) {
        slideImage(true);
        resetLoop(loopId);
    }
});


//left Arrow function
lftArrow.addEventListener('click', function () {
    if (toggle) {
        slideImage(false);
        resetLoop(loopId);
    }
});

//starts index from zero
function resetLoop(id) {
    clearInterval(id);
    loopId = loop(true);
}

/// loop on
function loop(loop) {
    if (!loop) return;
    const id = setInterval(() => {
        slideImage(true);
    }, loopDelay * 1000);
    return id;
}

function slideImage(right) {
    let slideOut = (right) ? "fadeOutLeft" : "fadeOutRight";
    animate(slideOut, index); //previous

    index = (right) ? (++index == images.length) ? 0 : index :
        (--index < 0) ? images.length - 1 : index;

    renderImg(index);
    let slideIn = (right) ? "fadeInRight" : "fadeInLeft";
    animate(slideIn, index);
    clear(index, outDelay);
}


//add the default style for arrow and add left position
let lftStyle = Object.create(arrowsStyle);
lftStyle.left = "2%";

//add the default style for arrow and add right position
let rgtStyle = Object.create(arrowsStyle);
rgtStyle.right = "2%";

// add all styles to Node elements
setStyles(lftArrow, lftStyle);
setStyles(rgtArrow, rgtStyle);
setStyles(slider, sliderStyles);

// still in development to add transitions and fade ins/outs
function animate(animation, index) {
    try {

        let node = $("img.slide" + index);
        node.style.animationName = animation;


    } catch (TypeError) {
        console.log("Dont! you are going to break it");
        toggle = false
        setTimeout(() => {
            toggle = true;
        }, 2000);
    }

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
    text.style.backgroundColor = `${images[indx].color || "#777"}`;
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

//add all the styles in the style constructor 
function setStyles(tag, styles) {
    for (key in styles) {
        tag.style[key] = styles[key];
    }
}

// delete the previous slide 
function clear(pos, delay) {

    setTimeout(() => {
        [].slice.call($('[class^="slide"]')).forEach((el, i, arr) => {

            if (el.className !== `slide${pos}`) {
                el.remove();
            }
        })
    }, delay);
}

// in beta
function mediaQuery(query) {
    if (query.media === "(max-width: 700px)" && query.matches) {
        // document.body.style.backgroundColor = "#aaa";
        // slider.style.height = "30vh";

        slider.style.fontSize = "12px";
        slider.style.width = "95vw";
        slider.style.height = "50vw";
    } else if (query.media == "(max-width: 450px)" && query.matches) {
        slider.style.width = "100vw";
        // document.body.style.backgroundColor = "#afa";
        slider.style.fontSize = "10px";
    } else { //default
        // slider.style.height = "height:400px";
        slider.style.width = "80vw";
        slider.style.height = "40vw";
        slider.style.fontSize = "16px";
        document.body.style.backgroundColor = "#ddd";
    }
}

//Selector
function $(param) {
    let query = document.querySelectorAll(param);
    return (query.length == 1) ? query[0] : query;
}

//Custom multi listener to add multiple events that require the same functionality
function addListenerMulti(el, events, fn) {
    events.split(' ').forEach(e => el.addEventListener(e, fn, false));
}





// [id^='someId'] will match all ids starting with someId.
// [id$='someId'] will match all ids ending with someId.
// [id*='someId'] will match all ids containing someId.
// transition: background[property] 1.5s[duration] ease-in[timing] 1[delay];
// media queries 
// https: //developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
// event types
// https://developer.mozilla.org/en-US/docs/Web/Events

////