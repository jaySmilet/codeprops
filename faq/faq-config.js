import { FAQ_DATA_BY_POST_ID } from "./faqData.js";

//Function called directly from template
export function getFAQHTML(postId) {
  const faqs = FAQ_DATA_BY_POST_ID[postId];
  if (!faqs || !faqs.length) return; // no FAQ for this post

  // The script tag that called us
  const scriptEl = document.currentScript; // works in all modern browsers [web:71]
  if (!scriptEl) return;

  // Parent is the div[itemprop="description"]
  const parent = scriptEl.parentElement;
  if (!parent) return;

  const wrapper = document.createElement("section");
  wrapper.className = "faq-wrapper";

  const heading = document.createElement("h2");
  heading.className = "faq-title";
  heading.textContent = "Frequently Asked Questions";
  wrapper.appendChild(heading);

  const accordion = document.createElement("div");
  accordion.className = "faq-accordion";

  faqs.forEach((item, index) => {
    const faqItem = document.createElement("div");
    faqItem.className = "faq-item";

    const header = document.createElement("button");
    header.type = "button";
    header.className = "faq-header";
    header.setAttribute("aria-expanded", index === 0 ? "true" : "false");

    const qSpan = document.createElement("span");
    qSpan.className = "faq-question";
    qSpan.textContent = item.question;

    const icon = document.createElement("span");
    icon.className = "faq-icon";
    icon.textContent = index === 0 ? "−" : "+";

    header.appendChild(qSpan);
    header.appendChild(icon);

    const body = document.createElement("div");
    body.className = "faq-body";

    const p = document.createElement("p");
    p.textContent = item.answer;
    body.appendChild(p);

    if (index === 0) {
      faqItem.classList.add("is-open");
      body.style.maxHeight = "1000px";
    }

    header.addEventListener("click", () => {
      const isOpen = faqItem.classList.contains("is-open");

      accordion.querySelectorAll(".faq-item").forEach((it) => {
        it.classList.remove("is-open");
        const b = it.querySelector(".faq-body");
        const h = it.querySelector(".faq-header");
        const ic = it.querySelector(".faq-icon");
        if (b) b.style.maxHeight = null;
        if (h) h.setAttribute("aria-expanded", "false");
        if (ic) ic.textContent = "+";
      });

      if (!isOpen) {
        faqItem.classList.add("is-open");
        body.style.maxHeight = body.scrollHeight + "px";
        header.setAttribute("aria-expanded", "true");
        icon.textContent = "−";
      }
    });

    faqItem.appendChild(header);
    faqItem.appendChild(body);
    accordion.appendChild(faqItem);
  });

  wrapper.appendChild(accordion);

  // insert FAQ just before the script tag (i.e., at end of description)
  parent.insertBefore(wrapper, scriptEl);

  // optional: remove the script node itself from DOM
  scriptEl.remove();
}
