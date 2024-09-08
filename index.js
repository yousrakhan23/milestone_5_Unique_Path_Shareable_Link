document.addEventListener("DOMContentLoaded", () => {
    
    let form = document.getElementById("resume-form");
    let resumeContent = document.getElementById("resume-content");
    let shareableLink = document.getElementById("shareable-link");
    let copyLinkBtn = document.getElementById("copy-link-btn");
    let downloadBtn = document.getElementById("download-btn");
  
   
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        degree: document.getElementById("degree").value,
        school: document.getElementById("school").value,
        gradYear: parseInt(document.getElementById("gradYear").value),
        jobTitle: document.getElementById("jobTitle").value,
        company: document.getElementById("company").value,
        years: parseInt(document.getElementById("years").value),
        skills: document
          .getElementById("skills")
          .value.split(",")
          .map((skill) => skill.trim()),
      };
  
      
      generateResume(formData);
  
      
      const userName = formData.name.toLowerCase().replace(/\s+/g, "");
      const uniqueUrl = `resume-viewer.html?username=${userName}`;
      localStorage.setItem(userName, JSON.stringify(formData)); 

      
      shareableLink.href = uniqueUrl;
      shareableLink.textContent = `Open Resume: ${uniqueUrl}`;
      shareableLink.style.display = "inline"; 
      
      copyLinkBtn.style.display = "inline-block";
      copyLinkBtn.addEventListener("click", function () {
        copyToClipboard(`/${uniqueUrl}`);
        alert("Link copied to clipboard!");
      });
    });
  
    
    function generateResume(data) {
      resumeContent.innerHTML = `
              <h3>${data.name}</h3>
              <p>Email: ${data.email}</p>
              <h4>Education</h4>
              <p>${data.degree} from ${data.school} (Class of ${
        data.gradYear
      })</p>
              <h4>Work Experience</h4>
              <p>${data.jobTitle} at ${data.company} (${data.years} years)</p>
              <h4>Skills</h4>
              <ul>
                  ${data.skills.map((skill) => `<li>${skill}</li>`).join("")}
              </ul>
          `;
    }
  
    
    function copyToClipboard(text) {
      const tempInput = document.createElement("input");
      document.body.appendChild(tempInput);
      tempInput.value = text;
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    }
  
    downloadBtn.addEventListener("click", function () {
      const resumeElement = document.getElementById("resume");
      const opt = {
        margin: 1,
        filename: "Resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      html2pdf().from(resumeElement).set(opt).save();
    });
  });