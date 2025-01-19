/* Constants */
const menuItems = document.querySelectorAll(".menu__item");
const currentItem = document.querySelector("#current");
const moveDistance = 140;

/* Function to handle menu item click */
const getItem = (event) => {
    const [x, y] = event.currentTarget.id.split("-").map(Number); // Split ID and convert to numbers

    if (!isNaN(x) && !isNaN(y)) {
        // Move the indicator
        currentItem.style.left = `${x * moveDistance}px`;
        setTimeout(() => {
            currentItem.style.top = `${y * moveDistance}px`;
        }, 200);

        // Open the link if data-link exists
        const link = event.currentTarget.dataset.link;
        if (link) {
            window.open(link, "_blank"); // Open in a new tab
        }
    } else {
        console.error("Invalid ID format. Expected 'x-y'.");
    }
};

/* Main function to initialize event listeners */
const mainFunction = () => {
    menuItems.forEach((item) => {
        item.addEventListener("click", getItem);
    });
};

/* Initialize on window load */
window.addEventListener("load", mainFunction);