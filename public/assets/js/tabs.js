// Plans
function changeAtiveTab(event, tabID) {
    let element = event.target;
    while (element.nodeName !== "A") {
        element = element.parentNode;
    }
    ulElement = element.parentNode.parentNode;
    aElements = ulElement.querySelectorAll("div > a");
    tabContents = document
        .getElementById("tabs-id")
        .querySelectorAll(".tab-content > div");
    for (let i = 0; i < aElements.length; i++) {
        aElements[i].classList.remove("text-gray-800");
        aElements[i].classList.remove("border-b-4");
        aElements[i].classList.add("text-gray-600");
        aElements[i].classList.add("border-0");
        tabContents[i].classList.add("hidden");
        tabContents[i].classList.remove("block");
    }
    element.classList.remove("text-gray-600");
    element.classList.remove("border-0");
    element.classList.add("text-gray-800");
    element.classList.add("border-b-4");
    document.getElementById(tabID).classList.remove("hidden");
    document.getElementById(tabID).classList.add("block");
}
