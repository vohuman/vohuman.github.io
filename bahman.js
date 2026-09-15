let currentLang = 'de';
        let changelanges = false;
        let resumeData = null;
        let loadingDuration = 800;

        $('#mobile-menu-btn').click(function () {
            $('#nav-links').toggleClass('active');
        });

        $(document).on('click', '.navlinkcustom', function () {
            if ($(window).width() <= 768) {
                $('#nav-links').removeClass('active');
            }
        });

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
                nav: {
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
                }
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
                nav: {
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
                }
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
                        renderAll();
                        $('#loading').fadeOut(800);
                    },
                    error: function (jqxhr, textStatus, error) {
                        console.log("Error loading JSON:", error);
                        $('#loading').hide();
                        $('#main-content').html('<div class="glass-panel p-4 text-center" style="color: var(--glow-red-bright);">Error loading profile data. Please try again later.</div>');
                    }
                });
            } else {
                $('#loading').fadeOut(loadingDuration);
            }
        }

        function setLanguage(lang) {
            currentLang = lang;
            changelanges = true;

            updateLangBtns();
            renderHero();
            rendersidemenu();

            let mainClasses = $('#main-content').attr('class') || '';
            if (mainClasses.includes('intro')) loadintro();
            else if (mainClasses.includes('history')) loadhistory();
            else if (mainClasses.includes('skills')) loadskills();
            else if (mainClasses.includes('education')) loadedu();
            else loadintro();
        }

        function updateLangBtns() {
            $('.lang-btn').removeClass('active');
            if (currentLang === 'en') {
                $('#btn-en').addClass('active');
            } else {
                $('#btn-de').addClass('active');
            }
        }

        function renderHero() {
            if (!resumeData) return;

            $('#loading').show();
            let langs = resumeData[currentLang].languages;
            let langHTML = '';

            $.each(langs, function (index, l) {
                langHTML += `
                        <div class="lang-item">
                            <div class="lang-header">
                                <b class="text-dark">${l.language}</b>
                                <span class="text-muted">${l.fluency}</span>
                            </div>
                            <div class="progress-bg">
                                <div class="progress-fill" style="width: ${l.percent}%"></div>
                            </div>
                        </div>`;
            });
            $('#langbar').html(langHTML);
            $('#loading').fadeOut(loadingDuration);

            if (currentLang === 'en') {
                $('#germany').text('Germany');
                $('#title').text('Senior Full Stack Developer');
                $('#lang-title').html('<i class="fa-solid fa-language me-2"></i>Languages');
            } else {
                $('#germany').text('Deutschland');
                $('#title').text('Senior Full Stack Entwickler');
                $('#lang-title').html('<i class="fa-solid fa-language me-2"></i>Sprachkenntnisse');
            }
        }

        function rendersidemenu() {
            var navHTML = `
                       <li><a href="#" onclick="loadintro(); return false;" class="navlinkcustom about active"><i class="fa-solid fa-user"></i> ${i18n[currentLang].nav.intro}</a></li>
                       <li><a href="#" onclick="loadhistory(); return false;" class="navlinkcustom ex"><i class="fa-solid fa-briefcase"></i> ${i18n[currentLang].nav.history}</a></li>
                       <li><a href="#" onclick="loadskills(); return false;" class="navlinkcustom skill"><i class="fa-solid fa-code"></i> ${i18n[currentLang].nav.skills}</a></li>
                       <li><a href="#" onclick="loadedu(); return false;" class="navlinkcustom edu"><i class="fa-solid fa-book-open"></i> ${i18n[currentLang].nav.education}</a></li>
                       
                       <div class="lang-switch">
                           <button id="btn-en" class="lang-btn ${currentLang === 'en' ? 'active' : ''}" onclick="setLanguage('en')">EN</button>
                           <button id="btn-de" class="lang-btn ${currentLang === 'de' ? 'active' : ''}" onclick="setLanguage('de')">DE</button>
                       </div>
                    `;
            $('#nav-links').html(navHTML);
        }

        function updateActiveNav(className) {
            $('.navlinkcustom').removeClass('active');
            $(`.${className}`).addClass('active');
            $('#main-content').removeClass('intro history skills education').addClass(className);
        }

        function loadintro() {
            if (!resumeData) return load();
            var fade = !changelanges ? 'fadein' : '';
            $('#loading').show();
            var html = `
                    <div class="glass-panel p-4 ${fade}">
                       <div class="d-flex align-items-center gap-3 mb-4">
                           <div class="icon-box"><i class="fa-solid fa-circle-info"></i></div>
                           <h2 class="fw-bold mb-0 text-dark">${i18n[currentLang].headers.intro}</h2>
                       </div>
                       <p class="fs-5 text-secondary" style="line-height: 1.8; text-align: justify;">
                           ${resumeData[currentLang].introduction}
                       </p>
                    </div>`;

            $('#main-content').html(html);
            updateActiveNav('intro');
            changelanges = false;

            var links = $('a.navlinkcustom');
            $.each(links, function(index, link) {
                $(link).removeClass('active');
            });
            $('.about').addClass('active');
            
            $('#loading').fadeOut(loadingDuration);
        }

        function loadhistory() {
            if (!resumeData) return load();
            var fade = !changelanges ? 'fadein' : '';

            $('#loading').show();
            var html = `
                    <div class="${fade}">
                       <div class="d-flex align-items-center gap-3 mb-4 pb-2 border-bottom">
                           <div class="icon-box"><i class="fa-solid fa-briefcase"></i></div>
                           <h2 class="fw-bold mb-0">${i18n[currentLang].headers.experience}</h2>
                       </div>`;

            var history = resumeData[currentLang].employmentHistory;

            $.each(history, function (index, h) {
                let dotClass = index === 0 ? 'first' : '';
                let badgeClass = index === 0 ? 'badge-red' : 'badge-custom';

                html += `
                        <div class="timeline-item">
                           <div class="timeline-dot ${dotClass}"></div>
                           <div class="glass-panel p-4">
                               <div class="d-flex flex-column flex-md-row justify-content-between align-items-start gap-2 mb-3">
                                  <div>
                                      <h4 class="fw-bold mb-1">${h.role}</h4>
                                      <div class="d-flex flex-wrap align-items-center gap-2">
                                          <a href="${h.link}" target="_blank" rel="noopener noreferrer" class="text-decoration-none custom-link-hover text-primary">
                                              <span class="fw-semibold"><i class="fa-regular fa-building me-1"></i> ${h.company}</span>
                                          </a>
                                          <span>•</span>
                                          <span><i class="fa-solid fa-location-dot me-1"></i>${h.location}</span>
                                      </div>
                                  </div>
                                  <span class="${badgeClass} px-3 py-2 fw-bold" style="font-size:0.9rem;">
                                      ${h.startDate} — ${h.endDate}
                                  </span>
                               </div>

                               <div class="mb-3">
                                  <ul class="list-unstyled d-flex flex-column gap-2 mb-0">`;

                $.each(h.responsibilities, function (i, r) {
                    html += `
                                <li class="d-flex gap-2">
                                   <i class="fa-solid fa-circle-check text-primary mt-1"></i>
                                   <span>${r}</span>
                                </li>`;
                });

                html += `</ul>
                               </div>
                               
                               <div class="pt-3 border-top">
                                  <small class="text-uppercase fw-bold text-muted d-block mb-2" style="letter-spacing:1px;">Tech Stack</small>
                                  <div class="d-flex flex-wrap gap-1">`;

                $.each(h.techStack, function (j, t) {
                    html += `<span class="badge-custom">${t}</span>`;
                });

                html += `</div></div></div></div>`;
            });

            html += '</div>';
            $('#main-content').html(html);
            updateActiveNav('history');
            changelanges = false;

             var links = $('a.navlinkcustom');
            $.each(links, function(index, link) {
                $(link).removeClass('active');
            });
            $('.ex').addClass('active');
            
            $('#loading').fadeOut(loadingDuration);
        }

        function loadskills() {
            if (!resumeData) return load();
            var fade = !changelanges ? 'fadein' : '';
            const skills = resumeData[currentLang].technicalSkills;

            $('#loading').show();
            //var config = {
           //     backend: { color: "var(--glow-cyan-bright)", icon: "fa-solid fa-server" },
           //     frontend: { color: "var(--glow-red-bright)", icon: "fa-solid fa-desktop" },
            //    database: { color: "#4ade80", icon: "fa-solid fa-database" },
            //    sourceControl: { color: "#fbd38d", icon: "fa-solid fa-code-branch" },
            //    projectManagement: { color: "var(--glow-cyan)", icon: "fa-solid fa-list-check" },
            //    general: { color: "var(--text-main)", icon: "fa-solid fa-gears" }
            //};

            var config = {
                backend: { color: "var(--glow-cyan-bright)", icon: "fa-solid fa-server" },
                frontend: { color: "var(--glow-red-bright)", icon: "fa-solid fa-desktop" },
                database: { color: "var(--glow-cyan-bright)", icon: "fa-solid fa-database" },
                sourceControl: { color: "var(--glow-red-bright)", icon: "fa-solid fa-code-branch" },
                projectManagement: { color: "var(--glow-cyan-bright)", icon: "fa-solid fa-list-check" },
                general: { color: "var(--glow-red-bright)", icon: "fa-solid fa-gears" }
            };

            var html = `
                    <div class="${fade}">
                        <div class="d-flex align-items-center gap-3 mb-4 pb-2 border-bottom">
                           <div class="icon-box"><i class="fa-solid fa-code"></i></div>
                           <h2 class="fw-bold mb-0">${i18n[currentLang].headers.skills}</h2>
                        </div>
                        <div class="row g-4">`;

            $.each(config, function (key, conf) {
                const label = i18n[currentLang].categories[key] || key;
                html += `
                        <div class="col-lg-6">
                           <div class="glass-panel p-4 h-100">
                               <div class="d-flex align-items-center gap-3 mb-3 pb-2 border-bottom">
                                   <i class="${conf.icon} fs-5" style="color:${conf.color}"></i>
                                   <h5 class="fw-bold mb-0" style="color:${conf.color}">${label}</h5>
                               </div>
                               <div class="d-flex flex-wrap gap-2">`;

                $.each(skills[key], function (index, skill) {
                    html += `<span class="badge-custom" style="border-color:${conf.color}; color:var(--text-main); background:transparent;">${skill}</span>`;
                });

                html += `</div></div></div>`;
            });

            html += `</div></div>`;
            $('#main-content').html(html);
            updateActiveNav('skills');
            changelanges = false;

            var links = $('a.navlinkcustom');
            $.each(links, function(index, link) {
                $(link).removeClass('active');
            });
            $('.skill').addClass('active');    
            
            $('#loading').fadeOut(loadingDuration);
        }

        function loadedu() {
            if (!resumeData) return load();
            var fade = !changelanges ? 'fadein' : '';
            var edu = resumeData[currentLang].education;
            var cer = resumeData[currentLang].certificates;

            $('#loading').show();
            var html = `
                    <div class="${fade}">
                        <div class="d-flex align-items-center gap-3 mb-4 pb-2 border-bottom">
                           <div class="icon-box"><i class="fa-solid fa-book-open"></i></div>
                           <h2 class="fw-bold mb-0">${i18n[currentLang].headers.education}</h2>
                        </div>
                        <div class="row g-4">
                           <div class="col-lg-6">
                               <div class="glass-panel p-4 h-100">
                                   <div class="d-flex align-items-center gap-3 mb-4">
                                      <div class="icon-box-red" style="color:var(--glow-red-bright)"><i class="fa-solid fa-graduation-cap"></i></div>
                                      <h4 class="fw-bold mb-0 text-red">${i18n[currentLang].headers.universities}</h4>
                                   </div>
                                   <div class="d-flex flex-column gap-4">`;

            $.each(edu, function (index, e) {
                html += `
                        <div>
                            <h5 class="fw-bold mb-1">${e.degree}</h5>
                            <p class="mb-1">
                                <a href="${e.link}" target="_blank" class="fw-semibold custom-link-hover text-primary">${e.institution}</a>
                            </p>
                            <div class="d-flex justify-content-between align-items-center text-muted small">
                                <span><i class="fa-solid fa-location-dot"></i> ${e.location}</span>
                                <span class="badge-custom m-0">${e.startDate} - ${e.endDate}</span>
                            </div>
                        </div>`;
            });

            html += `</div></div></div>
                    <div class="col-lg-6">
                       <div class="glass-panel p-4 h-100">
                           <div class="d-flex align-items-center gap-3 mb-4">
                              <div class="icon-box-red" style="color:var(--glow-red-bright)"><i class="fa-solid fa-certificate"></i></div>
                              <h4 class="fw-bold mb-0 text-red">${i18n[currentLang].headers.certificates}</h4>
                           </div>
                           <div class="d-flex flex-column gap-3">`;

            $.each(cer, function (index, c) {
                html += `
                        <div class="d-flex gap-3 align-items-start border-bottom pb-2">
                          <i class="fa-solid fa-trophy mt-1 text-dark"></i>
                          <div>
                              <h5 class="mb-1 fw-bold">
                                   <a href="${c.link}" target="_blank" class="custom-link-hover text-primary">${c.title}</a>
                              </h5>
                              <div class="d-flex flex-wrap gap-2 text-muted small">
                                  <span>${c.issuer}</span>
                                  <span>•</span>
                                  <span>${c.date}</span>
                              </div>
                          </div>
                        </div>`;
            });

            html += `</div></div></div></div></div>`;

            $('#main-content').html(html);
            updateActiveNav('education');
            changelanges = false;

            var links = $('a.navlinkcustom');
            $.each(links, function(index, link) {
                $(link).removeClass('active');
            });
            $('.edu').addClass('active'); 
            
             $('#loading').fadeOut(loadingDuration);
        }

        function renderAll() {
            rendersidemenu();
            renderHero();
            loadintro();
        }

        $(document).ready(function () {
                
                $('#mobile-menu-btn').click(function () {
        
                        $('#nav-links').toggleClass('active');
                });
                
            load();
        });
