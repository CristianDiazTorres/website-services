function faq1() {
    var element = document.getElementById("faq1");

    if (element.classList) {
        element.classList.toggle("faq-icon");
    } else {
        var classes = element.className.split(" ");
        var i = classes.indexOf("faq-icon");

        if (i >= 0)
            classes.splice(i, 1);
        else
            classes.push("faq-icon");
        element.className = classes.join(" ");
    }
}
function faq2() {
    var element = document.getElementById("faq2");

    if (element.classList) {
        element.classList.toggle("faq-icon");
    } else {
        var classes = element.className.split(" ");
        var i = classes.indexOf("faq-icon");

        if (i >= 0)
            classes.splice(i, 1);
        else
            classes.push("faq-icon");
        element.className = classes.join(" ");
    }
}
function faq3() {
    var element = document.getElementById("faq3");

    if (element.classList) {
        element.classList.toggle("faq-icon");
    } else {
        var classes = element.className.split(" ");
        var i = classes.indexOf("faq-icon");

        if (i >= 0)
            classes.splice(i, 1);
        else
            classes.push("faq-icon");
        element.className = classes.join(" ");
    }
}
function faq4() {
    var element = document.getElementById("faq4");

    if (element.classList) {
        element.classList.toggle("faq-icon");
    } else {
        var classes = element.className.split(" ");
        var i = classes.indexOf("faq-icon");

        if (i >= 0)
            classes.splice(i, 1);
        else
            classes.push("faq-icon");
        element.className = classes.join(" ");
    }
}
