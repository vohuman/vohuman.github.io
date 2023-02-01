var app = angular.module('langApp', []);

app.service('PageService', function($window) {
       return {
          setTitle: function (newTitle) {
            $window.document.title = newTitle;
          }
       };
   });

app.controller('langCtrl', [
               '$scope','$location', 'PageService',
               function ($scope, $location, PageService) {

                    $scope.lang = true;

                    $scope.title = {about: 'Über mich',
                        tech: 'Technische Erfahrungen',
                        proj: 'Projekte & Zertifikate',
                        cont: 'Kontakt'};

                    $scope.chooseLang = [{about: 'About me',
                    tech: 'Technical Experiences',
                    proj: 'Projects & Certificates',
                    cont: 'Contact'},
                    {about: 'Über mich',
                    tech: 'Technische Erfahrungen',
                    proj: 'Projekte & Zertifikate',
                    cont: 'Kontakt'}];

                    changel = function (l1) {
                        if(l1)
                            $scope.title = $scope.chooseLang[0];
                        else
                            $scope.title = $scope.chooseLang[1];

                        var t = $location.absUrl();
                        t = t.split('/');
                            
                        switch(t[t.length - 2]){
                            case "about":
                                $scope.PageTitle = $scope.title.about+ " | Bahman Soltani";
                                break;
                            case "technologies":
                                $scope.PageTitle=$scope.title.tech+ " | Bahman Soltani";
                                break;
                            case "projects":
                                $scope.PageTitle=$scope.title.proj+ " | Bahman Soltani";
                                break;
                            case "contact":
                                 $scope.PageTitle=$scope.title.cont+ " | Bahman Soltani";
                                 break;
                            default:
                                $scope.PageTitle="Bahman Soltani";
                                break;
                        };

                         
                        
                        this.setPageTitle = PageService.setTitle;
                        window.document.title=$scope.PageTitle;
                        //$window.location.reload();
                    };

                    this.setPageTitle = PageService.setTitle;

                    changel($scope.lang);

                    window.document.title=$scope.PageTitle + " | Bahman Soltani";

               }
]);


