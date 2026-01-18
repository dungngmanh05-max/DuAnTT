document.addEventListener("DOMContentLoaded", () => {

    // Lấy thư mục gốc project (không phụ thuộc file:// hay http)
    const basePath = window.location.pathname.includes("/pages/")
        ? "../pages/"
        : "pages/";

    loadComponent("header-include", basePath + "header.html", setActiveMenu);
    loadComponent("footer-include", basePath + "footer.html");
    loadComponent("sidebar-include", basePath + "sidebar.html");
});

function loadComponent(id, url, callback) {
    const container = document.getElementById(id);
    if (!container) return;

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("Không tìm thấy: " + url);
            return res.text();
        })
        .then(html => {
            container.innerHTML = html;
            if (callback) callback();
        })
        .catch(err => {
            console.error("Lỗi load component:", err);
            container.innerHTML = "<!-- Load component failed -->";
        });
}

// Active menu
function setActiveMenu() {
    const links = document.querySelectorAll(".nav-item-link");
    const current = window.location.pathname;

    links.forEach(link => {
        const href = link.getAttribute("href");
        if (current.endsWith(href)) {
            link.classList.add("active");
        }
    });
}

// Header shrink
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header-fixed");
    if (header) header.classList.toggle("shrink", window.scrollY > 80);
});
