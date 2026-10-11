// Builds resume.html from resume.json + style.css, then prints it to resume.pdf with Chrome.
// Edit your words in resume.json and the look in style.css. You shouldn't need to touch this file.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const dir = import.meta.dir;
const data = JSON.parse(readFileSync(`${dir}/resume.json`, "utf8"));

const esc = (text: string) =>
	text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const icons: Record<string, string> = {
	github: `<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.72 1.22 1.88.87 2.33.66.07-.52.28-.87.5-1.07-1.77-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z"/></svg>`,
};

const list = (items: string[]) =>
	`<ul class="points">${items.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`;

const entry = (e: any) => `
  <article class="entry">
    <div class="entry-head">
      ${e.logo ? `<img src="${e.logo}" alt="">` : "<span></span>"}
      <span class="role">${esc(e.role)}</span>
      <span>${esc(e.company)}</span>
      <span class="dates">${esc(e.dates)}</span>
    </div>
    ${list(e.points)}
  </article>`;

const contact = (c: any) => {
	const value = c.url ? `<a href="${c.url}">${esc(c.value)}</a>` : esc(c.value);
	return `<div><dt>${c.icon ? icons[c.icon] : ""}${esc(c.label)}</dt><dd>${value}</dd></div>`;
};

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(data.name)} Resume</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=block" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="page">
  <aside class="sidebar">
    <img class="photo" src="${data.photo}" alt="">
    <section class="about">
      <h2>About me</h2>
      ${data.about.map((p: string) => `<p>${esc(p)}</p>`).join("")}
    </section>
    <section class="skills">
      ${data.skills
				.map(
					(s: any) =>
						`<h3>${esc(s.group)}</h3><ul>${s.items.map((i: string) => `<li>${esc(i)}</li>`).join("")}</ul>`,
				)
				.join("")}
    </section>
  </aside>
  <main class="main">
    <h1 class="name">${esc(data.name)}</h1>
    <p class="subtitle">${esc(data.subtitle)}</p>
    <dl class="contact">${data.contact.map(contact).join("")}</dl>

    <h2>Experience</h2>
    ${data.experience.map(entry).join("")}

    <h2>Projects</h2>
    ${data.projects
			.map(
				(p: any) => `
      <article class="entry project">
        <div class="title">${esc(p.title)}</div>
        ${list(p.points)}
        <div class="stack">${esc(p.stack)}</div>
      </article>`,
			)
			.join("")}

    <h2>Education</h2>
    ${data.education.map(entry).join("")}
  </main>
</div>
</body>
</html>
`;

writeFileSync(`${dir}/resume.html`, html);
console.log("Built: resume.html");

const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
if (!existsSync(chrome)) {
	console.log("Chrome not found, skipped PDF. Open resume.html and print to PDF instead.");
	process.exit(0);
}

execFileSync(chrome, [
	"--headless",
	"--disable-gpu",
	"--no-pdf-header-footer",
	"--virtual-time-budget=5000",
	`--print-to-pdf=${dir}/resume.pdf`,
	`file://${dir}/resume.html`,
], { stdio: "ignore" });
console.log("Built: resume.pdf");
