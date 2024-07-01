import "./style.css";

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

window.addEventListener("DOMContentLoaded", () => {
  let nav = document.querySelector(".nav");
  let content = nav.querySelector(".content");
  let triggers = nav.querySelectorAll(".header > *");
  let contents = content.querySelectorAll(".content > *");
  let active = null;

  nav.addEventListener("mouseenter", () => console.log("enter"));
  nav.addEventListener("mouseleave", () => content.classList.remove("active"));

  triggers.forEach((trigger) => {
    let handleMouseEnter = debounce(() => {
      content.classList.add("active");
      nav.style.width = trigger.dataset.width;
      active = trigger.dataset.target;

      contents.forEach((c) => c.classList.remove("active"));
      content
        .querySelector(`[data-target="${active}"]`)
        .classList.add("active");
    });

    trigger.addEventListener("mouseenter", handleMouseEnter);
  });
});
