// cache for loaded JSON
let FAQ_DATA_BY_POST_ID = null;
let FAQ_LOADING_PROMISE = null;

function loadFaqJson() {
  if (FAQ_DATA_BY_POST_ID) return Promise.resolve(FAQ_DATA_BY_POST_ID);
  if (FAQ_LOADING_PROMISE) return FAQ_LOADING_PROMISE;

  // faqs.json is next to faq-config.js
  FAQ_LOADING_PROMISE = fetch("https://assets.codevichar.com/faq/faqData.json")
    .then((res) => {
      if (!res.ok) throw new Error("FAQ JSON load failed");
      return res.json();
    })
    .then((data) => {
      console.log("[FAQ] JSON loaded:", data);
      FAQ_DATA_BY_POST_ID = data || {};
      return FAQ_DATA_BY_POST_ID;
    })
    .catch((err) => {
      console.error("[FAQ] JSON load error:", err);
      FAQ_DATA_BY_POST_ID = {};
      return FAQ_DATA_BY_POST_ID;
    });

  return FAQ_LOADING_PROMISE;
}

// main function called from Blogger template
function getFAQHTML(postId) {
  console.log("[FAQ] called with postId:", postId);
  loadFaqJson().then((map) => {
    console.log("[FAQ] available keys:", Object.keys(map));
    const faqs = map[postId];
    console.log("[FAQ] matched faqs:", faqs);
    if (!faqs || !faqs.length) return;

    // Use explicit ID (REQUIRED)
    const scriptEl = document.getElementById("faq-inline-script");
    console.log("[FAQ] scriptEl:", scriptEl);
    if (!scriptEl) {
      console.warn(
        "[FAQ] inline script element not found (needs id='faq-inline-script')"
      );
      return;
    }

    const parent = scriptEl.parentElement;
    console.log("[FAQ] parent:", parent);
    if (!parent) {
      console.warn("[FAQ] parent element missing");
      return;
    }

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

    parent.insertBefore(wrapper, scriptEl);
    scriptEl.remove();
  });
}

// expose globally for inline <script> call
window.getFAQHTML = getFAQHTML;
