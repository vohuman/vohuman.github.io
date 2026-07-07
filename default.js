let currentLang = 'en';
let changelanges = false;
let resumeData = null;

let isfirstload = true; // Add this line at the top

const i18n = {
    en: {
        headers: {
            intro: "Introduction",
            languages: "Languages",
            skills: "Technical Skills",
            experience: "Employment History",
            education: "Education",
            certificates: "Certificates",
            universities: "Universities"
        },
        labels: {
            techStack: "Tech Stack",
            contact: "Contact",
            present: "Present"
        },
        nav: {
            home: "Profile",
            intro: "About",
            history: "Experience",
            skills: "Skills",
            education: "Education"
        },
        categories: {
            backend: "Backend",
            frontend: "Frontend",
            database: "Database",
            sourceControl: "DevOps & Tools",
            projectManagement: "Management",
            general: "General"
        },
        phrases: [
                "Senior Full Stack Developer.",
                ".NET Core Architect.",
                "Problem Solver."
            ],
        "languages": [
            {
                "language": "English",
                "fluency": "Fluent",
                "percent": 90
            },
            {
                "language": "German",
                "fluency": "Intermediate",
                "percent": 60
            },
            {
                "language": "Persian",
                "fluency": "Mother tongue",
                "percent": 100
            }
        ],
    },
    de: {
        headers: {
            intro: "Einführung",
            languages: "Sprachkenntnisse",
            skills: "Technische Fähigkeiten",
            experience: "Berufserfahrung",
            education: "Ausbildung",
            certificates: "Zertifikate",
            universities: "Universitäten"
        },
        labels: {
            techStack: "Technologien",
            contact: "Kontakt",
            present: "Aktuell"
        },
        nav: {
            home: "Profil",
            intro: "Über mich",
            history: "Erfahrung",
            skills: "Fähigkeiten",
            education: "Ausbildung"
        },
        categories: {
            backend: "Backend",
            frontend: "Frontend",
            database: "Datenbank",
            sourceControl: "DevOps & Tools",
            projectManagement: "Management",
            general: "Allgemein"
        },
        phrases: [
                "Senior Full-Stack-Entwickler.",
                ".NET Core-Architekt.",
                "Problemlöser."
        ],
        "languages": [
            {
                "language": "Englisch",
                "fluency": "Fließend",
                "percent": 90
            },
            {
                "language": "Deutsch",
                "fluency": "Fortgeschritten",
                "percent": 60
            },
            {
                "language": "Deutsch",
                "fluency": "Muttersprache",
                "percent": 100
            }
        ],
    }
};




function load() {
     $('#loading').show();
    if (resumeData == null) {
       
        $.ajax({
            url: 'https://vohuman.github.io/site/resume.json',
            method: 'GET',
            success: function (data) {
                resumeData = data;
                
                $('#btn-en').prop('disabled', false);
                $('#btn-de').prop('disabled', false);

                renderAll();

                $if (isfirstload) {
                    setTimeout(function() {
                        $('#loading').fadeOut(5000);
                    }, 20000); 
                    isfirstload = false; 
                } else {
                    $('#loading').fadeOut(5000); 
                }
            },
            error: function (jqxhr, textStatus, error) {
                console.log(error);
                 $('#loading').hide(500); 
            }
        });
    }
    else {
        $('#loading').fadeOut(1000); 
    }
}

function translate(key, subkey) {
    return i18n[currentLang][key][subkey];
}

function formatText(text) {
    if (text === "Present") return i18n[currentLang].labels.present;
    if (text === "Aktuell") return i18n[currentLang].labels.present;
    return text;
}

function setLanguage(lang) {

    if (!resumeData) 
        load();
    
    currentLang = lang;

    changelanges = true;

    updateLangBtns();
    renderAll();

    if ($('main').hasClass('intro')) {
        loadintro();        
    }

    if ($('main').hasClass('history')) {
        loadhistory();
    }

    if ($('main').hasClass('skills')) {
        loadskills();
    }

    if ($('main').hasClass('education')) {
        loadedu();
    }

    toggleSidebar();

    if (currentLang === 'en') {
        $('#btn-en').addClass('active');
        $('#btn-de').removeClass('active');
    } else {
        $('#btn-de').addClass('active');
        $('#btn-en').removeClass('active');
    }

}

renderHero = function () {    
    console.log(resumeData);
    if (!resumeData) return;
    let langs = resumeData[currentLang].languages;

    var langdiv = '';

    $.each(langs, function (index, l) {
        langdiv += `<div class="mb-3">
                   <div class="mb-1">
                           <b id="english">${l.language}</b>
                           <span style="font-size: 0.8rem; color: #777" id="fluent">${l.fluency}</span>
                   </div>
                   <div class="progress" style="height: 8px;">
                           <div class="progress-bar" role="progressbar" style="width: ${l.percent}%" aria-valuenow="${l.percent}" aria-valuemin="0" aria-valuemax="100"></div>
                   </div>
            </div>`;
    });

    let div = $(langdiv);
    let target = $('#langbar');
    target.empty();
    target.append(div);

    if (currentLang === 'en') {
        $('#germany').html('Germany');
        $('#title').html('Senior Full Stack Developer');
        $('#contact').html('Contact');
    } else {
        $('#germany').html('Deutschland');
        $('#title').html('Senior Full Stack Entwickler');
        $('#contact').html('Kontakt');
    }

    $('#about').html(i18n[currentLang].nav.intro);
    $('#ex').html(i18n[currentLang].nav.history);
    $('#skill').html(i18n[currentLang].nav.skills);
    $('#edu').html(i18n[currentLang].nav.education);

    $('#lang').html(i18n[currentLang].headers.languages);
}

loadintro = function () {
    if (resumeData == null)
        load();

    var fade = !changelanges ? 'fadein' : '';
    var html = `<section id="section-intro" class="${fade}">
       <div class="card project-card border-0 shadow-sm rounded-4 custom-card-hover">
           <div class="card-body p-4 p-md-5">
               <div class="d-flex align-items-center gap-3 mb-4">
                   <div class="bg-primary bg-opacity-10 text-primary p-2 rounded">
                      <i class="fa-solid fa-circle-info fs-5"></i>
                   </div>
                   <h4 class="fw-bold text-dark mb-0">${i18n[currentLang].headers.intro}</h4>
               </div>
               <div class="text-secondary" style="line-height: 1.8; text-align: justify;">
                   <p class="fw-bold fs-5 mb-2">${resumeData[currentLang].introduction}</p>
               </div>
           </div>
       </div>
   </section>`;

    let div = $(html);
    let target = $('main');
    target.empty();
    target.append(div);

    $('main').removeClass('history');
    $('main').removeClass('skills');
    $('main').removeClass('education');

    if (!$('main').hasClass('intro')) {
        $('main').addClass('intro');
    }

    var links = $('a.navlinkcustom');
    $.each(links, function(index, link) {
        console.log(link);
        $(link).removeClass('active');
    });
    $('.about').addClass('active');

    changelanges = false;
}


loadhistory = function () {
    var fade = !changelanges ? 'fadein' : '';
    var html = `<section id="section-intro" class="${fade}">
       <div class="d-flex align-items-center gap-3 mb-4 pb-2 border-bottom">
           <div class="bg-primary bg-opacity-10 text-primary p-2 rounded">
               <i class="fa-solid fa-briefcase fs-5"></i>
           </div>
           <h2 class="h3 fw-bold text-dark mb-0">${i18n[currentLang].headers.experience}</h2>
       </div>`;

    var history = resumeData[currentLang].employmentHistory;

    $.each(history, function (index, h) {

        if (index == 0) {
            html += `<div class="timeline-item">
               <div class="timeline-dot first"></div>

               <div class="card border-0 shadow-sm rounded-4 custom-card-hover p-4">
                   <div class="d-flex flex-column flex-md-row justify-content-between align-items-start gap-2 mb-3">
      <div>
          <h5 class="fw-bold text-dark mb-1">${h.role}</h5>
          <div class="d-flex flex-wrap align-items-center gap-2 text-secondary small">
              <span class="fw-semibold text-primary"><i class="fa-regular fa-building me-1"></i>${h.company}</span>
              <span>•</span>
              <span><i class="fa-solid fa-location-dot me-1"></i>${h.location}</span>
          </div>
      </div>
      <span class="badge rounded-pill text-bg-success bg-opacity-75 px-3 py-2">
          ${h.startDate} — ${h.endDate}
      </span>
                   </div>

                   <div class="mb-3">
      <ul class="list-unstyled d-flex flex-column gap-2 mb-0">`;

            $.each(h.responsibilities, function (i, r) {
                html += `<li class="d-flex gap-2 text-secondary">
                           <i class="fa-solid fa-circle-check text-primary mt-1" style="font-size: 0.8rem;"></i>
                           <span>${r}</span>
                     </li>`;
            });
        }
        else {
            html += `<div class="timeline-item">
               <div class="timeline-dot"></div>

               <div class="card border-0 shadow-sm rounded-4 custom-card-hover p-4">
                   <div class="d-flex flex-column flex-md-row justify-content-between align-items-start gap-2 mb-3">
              <div>
                  <h5 class="fw-bold text-dark mb-1">${h.role}</h5>
                  <div class="d-flex flex-wrap align-items-center gap-2 text-secondary small">
                      <span class="fw-semibold text-primary"><i class="fa-regular fa-building me-1"></i>${h.company}</span>
                      <span>•</span>
                      <span><i class="fa-solid fa-location-dot me-1"></i>${h.location}</span>
                  </div>
              </div>
              <span class="badge rounded-pill text-bg-light border text-secondary px-3 py-2">
                  ${h.startDate} — ${h.endDate}
              </span>
              </div>

                   <div class="mb-3">
                  <ul class="list-unstyled d-flex flex-column gap-2 mb-0">`;

            $.each(h.responsibilities, function (i, r) {
                html += `<li class="d-flex gap-2 text-secondary">
       <i class="fa-solid fa-circle-check text-primary mt-1" style="font-size: 0.8rem;"></i>
       <span>${r}</span>
                  </li>`;
            });
        }

        html += `</ul>
                </div>

      <div class="pt-3 border-top">
      <small class="text-uppercase fw-bold text-muted d-block mb-2" style="font-size: 0.7rem;">Tech Stack</small>
      <div class="d-flex flex-wrap gap-1">`;

        $.each(h.techStack, function (j, t) {
            html += `<span class="badge rounded-1 text-primary bg-light border tech-badge">${t}</span>`;
        })

        html += `</div>
                   </div>
               </div>
           </div>`
    });

    html += '</section>';

    let div = $(html);
    let target = $('main');
    target.empty();
    target.append(div);

    $('main').removeClass('intro');
    $('main').removeClass('skills');
    $('main').removeClass('education');

    if (!$('main').hasClass('history')) {
        $('main').addClass('history');
    }
     
    var links = $('a.navlinkcustom');
    $.each(links, function(index, link) {
        $(link).removeClass('active');
    });
    $('.ex').addClass('active');

    changelanges = false;
}

loadskills = function () {
    const skills = resumeData[currentLang].technicalSkills;
    const config = {
        backend: { color: "primary", icon: "fa-solid fa-server" },
        frontend: { color: "pink", icon: "fa-solid fa-desktop" },
        database: { color: "success", icon: "fa-solid fa-database" },
        sourceControl: { color: "warning", icon: "fa-solid fa-code-branch" },
        projectManagement: { color: "info", icon: "fa-solid fa-list-check" },
        general: { color: "secondary", icon: "fa-solid fa-gears" }
    };

    var fade = !changelanges ? 'fadein' : '';
    var html = `<section id="section-intro" class="${fade}">
       <div class="d-flex align-items-center gap-3 mb-4 pb-2 border-bottom">
           <h2 class="h3 fw-bold text-dark mb-0">${translate('headers', 'skills')}</h2>
       </div>
       <div class="row g-4">`;

    $.each(config, function (key, conf) {
        const label = i18n[currentLang].categories[key] || key;
        const textClass = `text-${conf.color}`;

        const badgeBg = 'bg-' + conf.color + '-subtle';
        const badgeText = 'text-' + conf.color + '-emphasis';
        const badgeBorder = 'border-' + conf.color + '-subtle';

        html += `<div class="col-md-6">
           <div class="card h-100 border-0 shadow-sm rounded-4 custom-card-hover p-4">
               <div class="d-flex align-items-center gap-2 mb-3">
                   <i class="${conf.icon} ${textClass} fs-5"></i>
                   <h6 class="fw-bold text-secondary text-capitalize ${label} mb-0">${label}</h6>
               </div>
               <div class="d-flex flex-wrap gap-2">`;
        $.each(skills[key], function (index, skill) {

            html += `<span style="font-weight:normal" class="badge rounded-pill border bg-light ${badgeText} ${badgeBorder} tech-badge">
          ${skill}
      </span>`;
        });

        html += `</div>
           </div>
       </div>`;
    });

    html += `</div></section>`;

    let div = $(html);
    let target = $('main');
    target.empty();
    target.append(div);

    $('main').removeClass('intro');
    $('main').removeClass('history');
    $('main').removeClass('education');

    if (!$('main').hasClass('skills')) {
        $('main').addClass('skills');
    }
     
    var links = $('a.navlinkcustom');
    $.each(links, function(index, link) {
        $(link).removeClass('active');
    });
    $('.skill').addClass('active');

    changelanges = false;
}

loadedu = function () {
    var edu = resumeData[currentLang].education;
    var cer = resumeData[currentLang].certificates;

    var fade = !changelanges ? 'fadein' : '';
    var d = `<section id="section-intro" class="${fade}">
       <div class="d-flex align-items-center gap-3 mb-4 p-4 border-bottom">
           <h2 class="h3 fw-bold text-dark mb-0">${translate('headers', 'education')}</h2>
       </div>
       <div class="row g-4"><div class="col-md-6">
           <div class="card h-100 border-0 shadow-sm rounded-4 custom-card-hover p-4">
              <div class="d-flex align-items-center gap-3 mb-4">
                 <div class="bg-success bg-opacity-10 text-success p-2 rounded">
                     <i class="fa-solid fa-graduation-cap fs-5"></i>
                 </div>
                 <h5 class="fw-bold text-dark mb-0">${i18n[currentLang].headers.universities}</h5>
              </div>              
           </div>
       </div></div></section>`;

    var html = `<section id="section-intro" class="mt-4 ${fade}">
        <div class="d-flex align-items-center gap-3 mb-4 pb-2 border-bottom">
           <h2 class="h3 fw-bold text-dark mb-0">${translate('headers', 'education')}</h2>
       </div>
       <div class="row g-4">
           <div class="col-lg-6">
               <div class="card h-100 border-0 shadow-sm rounded-4 custom-card-hover">
                   <div class="card-body p-4">
                       <div class="d-flex align-items-center gap-3 mb-4">
                          <div class="bg-success bg-opacity-10 text-success p-2 rounded">
                              <i class="fa-solid fa-graduation-cap fs-5"></i>
                          </div>
                            <h5 class="fw-bold text-dark mb-0">${i18n[currentLang].headers.universities}</h5>
                       </div>
                   <div>`;


    $.each(edu, function (index, e) {
        html += `<div class="edu">
          <div>
              <h6 class="mb-0">${e.degree}</h6>
              <p class="text-success small fw-medium mb-1">${e.institution}</p>
              <div class="d-flex justify-content-between align-items-center small text-muted">
                  <span>${e.location}</span>
                  <span class="bg-light px-2 py-1 rounded">${e.startDate} - ${e.endDate}</span>
              </div>
          </div>
      </div>`;
    });

    html += `</div>
               </div>
           </div>
       </div>`;


    html += `<div class="col-lg-6">
           <div class="card h-100 border-0 shadow-sm rounded-4 custom-card-hover">
               <div class="card-body p-4">
                   <div class="d-flex align-items-center gap-3 mb-4">
      <div class="bg-warning bg-opacity-10 text-warning p-2 rounded">
          <i class="fa-solid fa-certificate fs-5"></i>
      </div>
      <h5 class="fw-bold text-dark mb-0">${i18n[currentLang].headers.certificates}</h5>
                   </div>
                   <div>`;

    $.each(cer, function (index, c) {
        html += `<div class="cer">
          <i class="fa-solid fa-trophy text-warning mt-1 fs-5"></i>
          <div style="padding-left: 1rem;">
              <h6 class="text-dark mb-1 small"><b>${c.title}</b></h6>
              <div class="small text-muted d-flex gap-2">
                  <span class="fw-medium text-secondary">${c.issuer}</span>
                  <span>•</span>
                  <span>${c.date}</span>
              </div>
          </div>
        </div>`;
    });

    html += `</div>
               </div>
           </div>
       </div>
   </div></div></section>`;

    let div = $(html);
    let target = $('main');
    target.empty();
    target.append(div);

    $('main').removeClass('history');
    $('main').removeClass('skills');
    $('main').removeClass('intro');

    if (!$('main').hasClass('education')) {
        $('main').addClass('education');
    }
     
    var links = $('a.navlinkcustom');
    $.each(links, function(index, link) {
        $(link).removeClass('active');
    });
    $('.education').addClass('active');

    changelanges = false;
}

loadeduLang = function () {
    var edu = resumeData[currentLang].education;
    var cer = resumeData[currentLang].certificates;

    var d = `<div id="section-education" class="row g-4 mt-4 p-5">
       <div class="col-lg-6">
           <div class="card h-100 border-0 shadow-sm rounded-4 custom-card-hover">
               <div class="card-body p-4">
                   <div class="d-flex align-items-center gap-3 mb-4">
      <div class="bg-primary bg-opacity-10 text-primary p-2 rounded">
          <i class="fa-solid fa-graduation-cap fs-5"></i>
      </div>
      <h5 class="fw-bold text-dark mb-0">${i18n[currentLang].headers.education}</h5>
                   </div>
                   <div>`;

    $.each(edu, function (index, e) {
        d += `<div class="edu">
          <div>
              <h6 class="mb-0">${e.degree}</h6>
              <p class="text-primary small fw-medium mb-1">${e.institution}</p>
              <div class="d-flex justify-content-between align-items-center small text-muted">
                  <span>${e.location}</span>
                  <span class="bg-light px-2 py-1 rounded">${e.startDate} - ${e.endDate}</span>
              </div>
          </div>
      </div>`;
    });

    d += `</div>
               </div>
           </div>
       </div>`;


    d += `<div class="col-lg-6">
           <div class="card h-100 border-0 shadow-sm rounded-4 custom-card-hover">
               <div class="card-body p-4">
                   <div class="d-flex align-items-center gap-3 mb-4">
      <div class="bg-primary bg-opacity-10 text-primary p-2 rounded">
          <i class="fa-solid fa-certificate fs-5"></i>
      </div>
      <h5 class="fw-bold text-dark mb-0">${i18n[currentLang].headers.certificates}</h5>
                   </div>
                   <div>`;

    $.each(cer, function (index, c) {
        d += `<div class="edu">
          <i class="fa-solid fa-trophy text-primary mt-1 fs-5"></i>
          <div style="padding-left: 1rem;">
              <h6 class="text-dark mb-1 small"><b>${c.title}</b></h6>
              <div class="small text-muted d-flex gap-2">
                  <span class="fw-medium text-secondary">${c.issuer}</span>
                  <span>•</span>
                  <span>${c.date}</span>
              </div>
          </div>
        </div>`;
    });

    d += `</div>
               </div>
           </div>
       </div>
   </div>`;

    let div = $(d);
    let target = $('main');
    target.empty();
    target.append(div);

    $('main').removeClass('history');
    $('main').removeClass('skills');
    $('main').removeClass('intro');

    if (!$('main').hasClass('education')) {
        $('main').addClass('education');
    }
}

function updateLangBtns() {

    const enBtn = $('#btn-en');
    const deBtn = $('#btn-de');

    $('.lang-btn').removeClass('active');

    if (currentLang === 'en') {
        enBtn.addClass('active');
    } else {
        deBtn.addClass('active');
    }
}

renderAll = function () {
    if (resumeData == null) {
        load();

        return;
    }

    renderHero();
    rendersidemenu();

}

rendersidemenu = function () {
    var d = '';
   //  `<li class="mb-1">
   //     <a href="#" class="nav-link">
   //         <i class="fa-solid fa-user"></i>
   //         <span id="profile">${i18n[currentLang].nav.home}</span>
   //     </a>
   // </li>`;
  d +=`<li class="mb-1">
       <a href="#" onclick="loadintro()" class="nav-link">
           <i class="fa-solid fa-user"></i>
           <span id="about">${i18n[currentLang].nav.intro}</span>
       </a>
   </li>

   <li class="mb-1">
       <a href="#" onclick="loadhistory()" class="nav-link">
           <i class="fa-solid fa-briefcase"></i>
           <span id="ex">${i18n[currentLang].nav.history}</span>
       </a>
   </li>

   <li class="mb-1">
       <a href="#" onclick="loadskills()" class="nav-link">
           <i class="fa-solid fa-code"></i>
           <span id="skill">${i18n[currentLang].nav.skills}</span>
       </a>
   </li>

   <li class="mb-1">
       <a href="#" onclick="loadedu()" class="nav-link">
           <i class="fa-solid fa-graduation-cap"></i>
           <span id="edu">${i18n[currentLang].nav.education}</span>
       </a>
   </li>`;

    let div = $(d);
    let target = $('#nav-links');
    target.empty();
    target.append(div);
}

//renderAll();

const wrapper = $('#wrapper');

$(document).on('click', function (e) {
    var element = $(e.target);
    if (!element.hasClass('iconmenu')) {
        const sidebar = $('#sidebar-wrapper');
        if (sidebar.hasClass('toggled'))
            closeside();
    }
});

function closeside() {
    const sidebar = $('#sidebar-wrapper');
    const overlay = $('#sidebar-overlay');
    if (sidebar.hasClass('toggled')) {
        sidebar.removeClass('toggled');
        //sidebar.addClass('hidden');
    }
    if (overlay.hasClass('show')) {
        overlay.removeClass('show');
        //overlay.addClass('hidden');
    }
}

function toggleSidebar() {
    const sidebar = $('#sidebar-wrapper');
    const overlay = $('#sidebar-overlay');
    sidebar.toggleClass('toggled');
    overlay.toggleClass('show');
    sidebar.removeClass('hidden');
    overlay.removeClass('hidden');
}


