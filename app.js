var app = angular.module('langApp', []);

app.service('PageService', function($window) {
       return {
          setTitle: function (newTitle) { $window.document.title = newTitle; }
       };
   });

app.controller('langCtrl', [
               '$scope', '$location', 'PageService',
               function ($scope, $location, PageService) {

                    $scope.lang = false;

                    $scope.title = {about: 'Über mich',
                        tech: 'Technische Erfahrungen',
                        proj: 'Projekte & Zertifikate',
                        cont: 'Kontakt | Bahman Soltani'};

                    $scope.chooseLang = [{about: 'About me',
                    tech: 'Technical Experiences',
                    proj: 'Projects & Certificates',
                    cont: 'Contact | Bahman Soltani'},
                    {about: 'Über mich',
                    tech: 'Technische Erfahrungen',
                    proj: 'Projekte & Zertifikate',
                    cont: 'Kontakt | Bahman Soltani'}];

                    changel = function (l1) {
                        if(l1)
                            $scope.title = $scope.chooseLang[0];
                        else
                            $scope.title = $scope.chooseLang[1];

                        var t = $location.absUrl();
                        t=t.split('/');

                        console.log(t);
                            
                        switch(t[3]){
                            case "about":
                             $scope.PageTitle = $scope.title.about;
                             break;
                            case "technologies":
                             $scope.PageTitle=$scope.title.tech;
                             break;
                            case "projects":
                             $scope.PageTitle=$scope.title.proj;
                             break;
                            default:
                             $scope.PageTitle="Bahman Soltani";
                             break;
                        };


                    };

                    this.setPageTitle = PageService.setTitle;


                    changel($scope.lang);

                    var t = $location.absUrl();
                    t=t.split('/');

                    console.log($location.absUrl());

                    console.log(t);

               }
]);