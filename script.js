const sectionLinks = [...document.querySelectorAll('nav a[href^="#"]')];

if ("IntersectionObserver" in window && sectionLinks.length > 0) {
  const linksById = new Map(
    sectionLinks.map((link) => [link.getAttribute("href").slice(1), link]),
  );
  const intersecting = new Map();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        intersecting.set(entry.target.id, entry.isIntersecting);
      }
      for (const link of sectionLinks) link.removeAttribute("aria-current");
      for (const id of linksById.keys()) {
        if (intersecting.get(id)) {
          linksById.get(id)?.setAttribute("aria-current", "true");
          break;
        }
      }
    },
    { rootMargin: "-20% 0px -65%", threshold: 0 },
  );

  for (const id of linksById.keys()) {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  }
}

for (const el of document.querySelectorAll("[data-user][data-domain]")) {
  const user = el.getAttribute("data-user");
  const domain = el.getAttribute("data-domain");
  const address = `${user}@${domain}`;
  el.setAttribute("href", `mailto:${address}`);
  el.setAttribute("title", address);
}
