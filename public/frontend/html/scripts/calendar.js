$.fn.calendar = function(parameters) {
  var
    $allModules     = $(this),
    moduleSelector  = $allModules.selector || '',
    time            = new Date().getTime(),
    performance     = [],
    query           = arguments[0],
    methodInvoked   = (typeof query == 'string'),
    queryArguments  = [].slice.call(arguments, 1),
    requestAnimationFrame = window.requestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.msRequestAnimationFrame
      || function(callback) { setTimeout(callback, 0); },
    returnedValue;

  $allModules
    .each(function() {
      var
        settings        = ( $.isPlainObject(parameters) )
          ? $.extend(true, {}, $.fn.calendar.settings, parameters)
          : $.extend({}, $.fn.calendar.settings),
        namespace       = settings.namespace,
        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,
        $window         = $(window),
        $module         = $(this),
        element         = this,
        instance        = $module.data(moduleNamespace),
        module
      ;
    	module = {
        initialize: function() {
          module.debug('Initializing', $module);
          module.render();
        },
        lookup: function(dictionary, key) {
          var
          	collection = {
              days   : ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
              months : ['Enero', 'Febrero', 'Marzo', 'Abirl', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octuber', 'Noviember', 'Diciember'],
              eom    : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            }
          ;
          return collection[dictionary][key] || false;
        },
        render: function() {
          var	cssClasses = {
              main: 'ui celled table center aligned',
              head: {
                row   : 'center aligned',
                column: 'center aligned'
              },
              body: {
              	column: {
                  disabled: 'disabled'
                }
	            }
            },
            firstDay = (function() {
							var d = new Date(settings.date.getFullYear(), settings.date.getMonth(), 1);
              return d.getDay();
            })(),
          	elements = {
              head: {
                row   : $('<thead />').append($('<tr scope="row" />')
                          .append($('<th scope="col" />').text('Dom'))
                          .append($('<th scope="col" />').text('Lun'))
                          .append($('<th scope="col" />').text('Mar'))
                          .append($('<th scope="col" />').text('Mie'))
                          .append($('<th scope="col" />').text('Jue'))
                          .append($('<th scope="col" />').text('Vie'))
                          .append($('<th scope="col" />').text('Sab'))),
                column: ''
              },
              body: {
                row   : $('<tr />').addClass(cssClasses.head.row),
                column: $('<td />')
              }
            }
          ;
          elements.head.row.appendTo($module);
          for(var i = 0; i < module.lookup('eom', settings.date.getMonth()); i++) {
            if(i === 0 && firstDay > 0) {
            var row = $('<tr />');
              for(var j = 0; j < firstDay; j++) {
                $('<td />').addClass('disabled').appendTo(elements.body.row)
              }
            }

          var esta = settings.openDates.indexOf(settings.date.getFullYear()+"-"+(settings.date.getMonth()+1)+"-"+(i+1))>=0;
            elements.body.column.clone()
                .attr('title',"Elegir "+(i+1)+" de "+module.lookup('months', settings.date.getMonth())+" del "+settings.date.getFullYear())
                .attr('ng-click',esta?'dateSelect('+settings.date.getFullYear()+','+(settings.date.getMonth()+1)+','+ (i+1) +')':'')
                .text(i + 1).appendTo(elements.body.row)
                .addClass(esta?'':'disabled');
            if((i + firstDay + 1) % 7 === 0 && i > 0) {
              elements.body.row.appendTo($module);
              elements.body.row = $('<tr />');
            }
            if(i + 1 === module.lookup('eom', settings.date.getMonth())) {
              for(var j = (i + firstDay) % 7; j < 6 || j < (i + firstDay + 1) % 7; j++) {
                  $('<td />').addClass('disabled').appendTo(elements.body.row);
              }
              elements.body.row.appendTo($module);
            }
          }
          $module.attr('details',"Calendario con fechas libres para el mes de "+module.lookup('months', settings.date.getMonth()));
          $module.append($('<caption />').text(module.lookup('months', settings.date.getMonth()) +" del "+ settings.date.getFullYear()));
          $module.addClass(cssClasses['main']);
        },
        debug: function() {
          if(settings.debug) {
            console.log($module);
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
      };
	    module.initialize();
    })
  ;
};

$.fn.calendar.settings = {
  name      : 'Calendar',
  namespace : 'calendar',
  debug     : false,
  verbose   : true,
  openDates : [],
  date      : new Date()
};

//$('#calendar0').calendar({ date: new Date(2016,01) });