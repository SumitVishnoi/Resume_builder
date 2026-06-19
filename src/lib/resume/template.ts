import { IResume } from "@/types/resume.types";

export function esc(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function generateResumeHTML(resume: IResume): string {
  const p = resume.personalInfo || {
    fullname: "",
    email: "",
    mobile: "",
    location: "",
    githubUrl: "",
    linkedIn: "",
    portfolio: "",
  };

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>${esc(p.fullname || "Resume")}</title>

    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: Arial, sans-serif;
        padding: 40px;
        color: #222;
        line-height: 1.6;
      }

      .header {
        text-align: center;
        margin-bottom: 24px;
      }

      .name {
        font-size: 28px;
        font-weight: bold;
      }

      .contact {
        margin-top: 8px;
        font-size: 13px;
      }

      .section {
        margin-top: 24px;
      }

      .section-title {
        font-size: 18px;
        font-weight: bold;
        border-bottom: 2px solid #000;
        padding-bottom: 4px;
        margin-bottom: 12px;
      }

      .item {
        margin-bottom: 14px;
      }

      .item-header {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
      }

      .subtitle {
        color: #555;
        margin-bottom: 4px;
      }

      .skills {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .skill {
        border: 1px solid #ccc;
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 12px;
      }

      ul {
        padding-left: 20px;
      }

      a {
        text-decoration: none;
        color: blue;
      }
    </style>
  </head>

  <body>

    <div class="header">
      <div class="name">${esc(p.fullname)}</div>

      <div class="contact">
        ${esc(p.email)}
        ${p.mobile ? ` | ${esc(p.mobile)}` : ""}
        ${p.location ? ` | ${esc(p.location)}` : ""}
      </div>

      <div class="contact">
        ${
          p.githubUrl
            ? `GitHub:
          <a href="${esc(p.githubUrl)}" target="_blank">
            ${esc(p.githubUrl)}
          </a>`
            : ""
        } 
        ${
          p.linkedIn
            ? ` | LinkedIn:
          <a href="${esc(p.linkedIn)}" target="_blank">
            ${esc(p.linkedIn)}
          </a>`
            : ""
        }

        ${
          p.portfolio
            ? ` | Portfolio:
              <a href="${esc(p.portfolio)}" target="_blank">
                ${esc(p.portfolio)}
              </a>`
            : ""
        }
      </div>
    </div>

    ${
      resume.summary
        ? `
      <div class="section">
        <div class="section-title">Summary</div>
        <p>${esc(resume.summary)}</p>
      </div>
    `
        : ""
    }

    ${
      resume.workExperience?.length
        ? `
      <div class="section">
        <div class="section-title">Experience</div>

        ${resume.workExperience
          .map(
            (exp) => `
          <div class="item">
            <div class="item-header">
              <span>${esc(exp.position)}</span>
              <span>${esc(exp.startDate)} - ${esc(exp.endDate)}</span>
            </div>

            <div class="subtitle">
              ${esc(exp.company)}
            </div>

            <p>${esc(exp.description)}</p>
          </div>
        `,
          )
          .join("")}

      </div>
    `
        : ""
    }

    ${
      resume.projects?.length
        ? `
      <div class="section">
        <div class="section-title">Projects</div>

        ${resume.projects
          .map(
            (project) => `
          <div class="item">

            <div class="item-header">
              <span>${esc(project.title)}</span>
            </div>

            <p>${esc(project.description)}</p>

            ${
              project.techStack?.length
                ? `
                <p>
                  <strong>Tech Stack:</strong>
                  ${project.techStack.map((tech) => esc(tech)).join(", ")}
                </p>
              `
                : ""
            }

            ${
              project.githubUrl
                ? `<p>GitHub: ${esc(project.githubUrl)}</p>`
                : ""
            }

            ${
              project.liveUrl
                ? `
              <p>
                Live:
                <a href="${esc(project.liveUrl)}" target="_blank">
                  ${esc(project.liveUrl)}
                </a>
              </p>
            `
              : ""
            }

          </div>
        `,
          )
          .join("")}
      </div>
    `
        : ""
    }

    ${
      resume.skills?.length
        ? `
      <div class="section">
        <div class="section-title">Skills</div>

        <div class="skills">
          ${resume.skills
            .map(
              (skill) => `
            <span class="skill">${esc(skill)}</span>
          `,
            )
            .join("")}
        </div>
      </div>
    `
        : ""
    }

    ${
      resume.education?.length
        ? `
      <div class="section">
        <div class="section-title">Education</div>

        ${resume.education
          .map(
            (edu) => `
          <div class="item">

            <div class="item-header">
              <span>${esc(edu.degree)}</span>
              <span>${esc(edu.startDate)} - ${esc(edu.endDate)}</span>
            </div>

            <div class="subtitle">
              ${esc(edu.institute)}
            </div>

          </div>
        `,
          )
          .join("")}
      </div>
    `
        : ""
    }

    ${
      resume.certification?.length
        ? `
      <div class="section">
        <div class="section-title">Certifications</div>

        <ul>
          ${resume.certification
            .map((cert) => `<li>${esc(cert)}</li>`)
            .join("")}
        </ul>
      </div>
    `
        : ""
    }

  </body>
  </html>
  `;
}
