akomadefine(["jquery"],function(i){function h(){o.width=w.width(),o.height=w.outerHeight(),u.width=n.width(),u.height=n.height(),o.width>u.width&&t(),o.width<u.width&&e(),o.height>u.height&&d(),n.height(u.height),n.width(u.width),n.css({marginLeft:.5*-u.width,marginTop:.5*-u.height,opacity:1}),g=!0}function t(){var i=o.width/u.width;u.width=u.width*i,u.height=u.height*i}function e(){var i=u.width;u.width=o.width,u.height=u.width*u.height/i}function d(){var i=o.height/u.height;u.width=u.width*i,u.height=u.height*i}i=i||window.$,obj={};var w,n,g=!1,o={width:null,height:null},u={width:null,height:null};return i(window).resize(function(){h()}),obj.init=function(){w=i("#full-bleed-hero"),n=w.find("#fluid-image img"),h()},obj});