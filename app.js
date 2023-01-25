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

                    $scope.title = {about: 'Über mich | Bahman Soltani',
                        tech: 'Technische Erfahrungen | Bahman Soltani',
                        proj: 'Projekte & Zertifikate | Bahman Soltani',
                        cont: 'Kontakt | Bahman Soltani'};

                    $scope.chooseLang = [{about: 'About me | Bahman Soltani',
                    tech: 'Technical Experiences | Bahman Soltani',
                    proj: 'Projects & Certificates | Bahman Soltani',
                    cont: 'Contact | Bahman Soltani'},
                    {about: 'Über mich | Bahman Soltani',
                    tech: 'Technische Erfahrungen | Bahman Soltani',
                    proj: 'Projekte & Zertifikate | Bahman Soltani',
                    cont: 'Kontakt | Bahman Soltani'}];

                    changel = function (l1) {

                        $scope.lang = !l1;

                        if(!($scope.lang))
                            $scope.title = $scope.chooseLang[0];
                        else
                            $scope.title = $scope.chooseLang[1];

                        PageService.setTitle($scope.title.about);
                    };

                    this.setPageTitle = PageService.setTitle;


                    changel($scope.lang);

                    var t = $location.absUrl();
                    t=t.split('/');

                    console.log($location.absUrl());

                    console.log(t);

                    window.document.title=$scope.title.about;


               }
]);