const main_container = document.createElement("div");
const moving_div = document.createElement("div");
const property_name = document.createElement("div");
const contact_name = document.createElement("div");
const contact_number_type = document.createElement("div");
const contact_number = document.createElement("input");

main_container.classList.add("main_container");
main_container.id = "main_container";
property_name.id = "property_name";
contact_name.id = "contact_name";
contact_number.id = "contact_number";
contact_number_type.id = "contact_number_type";
moving_div.id = "main_containerheader";
main_container.appendChild(moving_div);
main_container.appendChild(property_name);
main_container.appendChild(contact_name);
main_container.appendChild(contact_number_type);
main_container.appendChild(contact_number);

property_name.innerHTML = 'this is a test';

document.querySelector('body').insertBefore(main_container, document.body.firstChild);

replaceText(document.body);

function replaceText(element) {
  if (element.hasChildNodes()) {
    element.childNodes.forEach(replaceText);
  } else if (element.nodeType === Text.TEXT_NODE) {
    if (
      element.textContent.match(
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gi
      )
    ) {
      const newElement = document.createElement('span');

      newElement.innerHTML = element.textContent.replace(
        /(^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$)/gi,
        '<span id="goodNumber" >$1</span>'
      );
      element.replaceWith(newElement);
      console.log(newElement.innerHTML);
      newElement.addEventListener("click", (e) => {
        const number_dropdown = document.createElement('ul');
        const goodNumber = document.createElement('div');
        // goodNumber.id = "goodNumber";
        goodNumber.innerHTML = newElement.textContent;
        main_container.appendChild(goodNumber);
      });
    }
  }
}


dragElement(document.getElementById("main_container"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 200, pos3 = 0, pos4 = 0;
  // if (document.getElementById(elmnt.id + "header")) {
  //   /* if present, the header is where you move the DIV from:*/
  //   document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  // } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  // }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}