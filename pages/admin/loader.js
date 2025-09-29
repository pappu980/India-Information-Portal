async function loadTemplate(id, file) {
    try {
        const res = await fetch(`templates/${file}`);
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        document.getElementById(id).innerHTML = await res.text();
    } catch (error) {
        console.error(error);
        document.getElementById(id).innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    loadTemplate("header", "header.html");
    loadTemplate("footer", "footer.html");
});
