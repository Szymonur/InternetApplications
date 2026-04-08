function addBook() {
    const table = document.getElementById("table");
    const tr = document.createElement("tr");

    // title
    const td_title = document.createElement("td");
    const input_title = document.createElement("input");
    const span_title = document.createElement("span");
    span_title.style.display = "none";
    tr.appendChild(td_title);
    td_title.appendChild(input_title);
    td_title.appendChild(span_title);

    // author
    const td_author = document.createElement("td");
    const input_author = document.createElement("input");
    const span_author = document.createElement("span");

    span_author.style.display = "none";
    tr.appendChild(td_author);
    td_author.appendChild(input_author);
    td_author.appendChild(span_author);

    // buttons
    const td_buttons = document.createElement("td");

    // save
    const btn_save = document.createElement("button");
    btn_save.appendChild(document.createTextNode("Save"));
    btn_save.onclick = () => {
        // asign values
        span_title.textContent = input_title.value;
        span_author.textContent = input_author.value;

        // hide inputs
        input_title.style.display = "none";
        input_author.style.display = "none";

        // show spans
        span_title.style.display = "inline";
        span_author.style.display = "inline";

        // toogle buttons
        btn_save.style.display = "none";
        btn_edit.style.display = "inline";
    };

    // edit
    const btn_edit = document.createElement("button");
    btn_edit.appendChild(document.createTextNode("Edit"));
    btn_edit.style.display = "none";
    btn_edit.onclick = () => {
        // show inputs
        input_title.style.display = "inline";
        input_author.style.display = "inline";

        // hide spans
        span_title.style.display = "none";
        span_author.style.display = "none";

        // togle buttons
        btn_save.style.display = "inline";
        btn_edit.style.display = "none";
    };

    // remove
    const btn_remove = document.createElement("button");
    btn_remove.appendChild(document.createTextNode("Remove"));
    btn_remove.onclick = () => {
        tr.remove();
    };

    tr.appendChild(td_buttons);
    td_buttons.appendChild(btn_save);
    td_buttons.appendChild(btn_edit);
    td_buttons.appendChild(btn_remove);

    table.appendChild(tr);
}
