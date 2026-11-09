const quill = new Quill("#editor", {
    theme: "snow",
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image', 'formula'],

            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, false] }],
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']  
        ]
    }
});

quill.on("text-change", (delta, oldDelta, source) => {
    if (source === "user") {
        updatePreview();
    }
});

updatePreview();

function updatePreview() {
    let preview = document.getElementById("preview");
    preview.innerHTML = quill.root.innerHTML;
}