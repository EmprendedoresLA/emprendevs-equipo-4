var DocumentApp = function() {
    // Helper variables - set in uiInit()
    var $lHtml, $lBody;

    // User Interface init
    var uiInit = function() {
        // Set variables
        $lHtml              = jQuery('html');
        $lBody              = jQuery('body');

        jQuery('.form-control').placeholder();
    };

    var uiLayout = function() {
        var $resizeTimeout;

        jQuery('[data-toggle="layout"]').on('click', function(){
            var $btn = jQuery(this);

            uiLayoutApi($btn.data('action'));

            if ($lHtml.hasClass('no-focus')) {
                $btn.blur();
            }
        });
    };

    var uiLayoutApi = function($mode) {
        var $windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    };

    // Material inputs helper
    var uiForms = function() {
        jQuery('.form-material.floating > .form-control').each(function(){
            var $input  = jQuery(this);
            var $parent = $input.parent('.form-material');

            if ($input.val()) {
                $parent.addClass('open');
            }

            $input.on('change', function(){
                if ($input.val()) {
                    $parent.addClass('open');
                } else {
                    $parent.removeClass('open');
                }
            });
        });
    };

    var uiScrollTo = function() {
        jQuery('[data-toggle="scroll-to"]').on('click', function(){
            var $this   = jQuery(this);
            var $target = $this.data('target');
            var $speed  = $this.data('speed') ? $this.data('speed') : 1000;

            jQuery('html, body').animate({
                scrollTop: jQuery($target).offset().top
            }, $speed);
        });
    };

    var uiToggleClass = function() {
        jQuery('[data-toggle="class-toggle"]').on('click', function(){
            var $el = jQuery(this);

            jQuery($el.data('target').toString()).toggleClass($el.data('class').toString());

            if ($lHtml.hasClass('no-focus')) {
                $el.blur();
            }
        });
    };

    /*
     * jQuery Appear, for more examples you can check out https://github.com/bas2k/jquery.appear
     *
     * App.initHelper('appear');
     *
     */
    var uiHelperAppear = function(){
        // Add a specific class on elements (when they become visible on scrolling)
        jQuery('[data-toggle="appear"]').each(function(){
            var $windowW    = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var $this       = jQuery(this);
            var $class      = $this.data('class') ? $this.data('class') : 'animated fadeIn';
            var $offset     = $this.data('offset') ? $this.data('offset') : 0;
            var $timeout    = ($lHtml.hasClass('ie9') || $windowW < 992) ? 0 : ($this.data('timeout') ? $this.data('timeout') : 0);

            $this.appear(function() {
                setTimeout(function(){
                    $this
                        .removeClass('visibility-hidden')
                        .addClass($class);
                }, $timeout);
            },{accY: $offset});
        });
    };

    /*
     * jQuery Appear + jQuery countTo, for more examples you can check out https://github.com/bas2k/jquery.appear and https://github.com/mhuggins/jquery-countTo
     *
     * App.initHelper('appear-countTo');
     *
     */
    var uiHelperAppearCountTo = function(){
        // Init counter functionality
        jQuery('[data-toggle="countTo"]').each(function(){
            var $this       = jQuery(this);
            var $after      = $this.data('after');
            var $speed      = $this.data('speed') ? $this.data('speed') : 1500;
            var $interval   = $this.data('interval') ? $this.data('interval') : 15;

            $this.appear(function() {
                $this.countTo({
                    speed: $speed,
                    refreshInterval: $interval,
                    onComplete: function() {
                        if($after) {
                            $this.html($this.html() + $after);
                        }
                    }
                });
            });
        });
    };


    /*
     * Masked Inputs, for more examples you can check out http://digitalbush.com/projects/masked-input-plugin/
     *
     * App.initHelper('masked-inputs');
     *
     */
    var uiHelperMaskedInputs = function(){
        // Init Masked Inputs
        // a - Represents an alpha character (A-Z,a-z)
        // 9 - Represents a numeric character (0-9)
        // * - Represents an alphanumeric character (A-Z,a-z,0-9)
        jQuery('.js-masked-date').mask('99/99/9999');
        jQuery('.js-masked-date-dash').mask('99-99-9999');
        jQuery('.js-masked-phone').mask('(999) 999-9999');
        jQuery('.js-masked-phone-ext').mask('(999) 999-9999? x99999');
        jQuery('.js-masked-taxid').mask('99-9999999');
        jQuery('.js-masked-ssn').mask('999-99-9999');
        jQuery('.js-masked-pkey').mask('a*-999-a999');
    };

    /*
     * Bootstrap Notify, for more examples you can check out http://bootstrap-growl.remabledesigns.com/
     *
     * App.initHelper('notify');
     *
     */
    var uiHelperNotify = function(){
        // Init notifications (with .js-notify class)
        jQuery('.js-notify').on('click', function(){
            var $notify         = jQuery(this);
            var $notifyMsg      = $notify.data('notify-message');
            var $notifyType     = $notify.data('notify-type') ? $notify.data('notify-type') : 'info';
            var $notifyFrom     = $notify.data('notify-from') ? $notify.data('notify-from') : 'top';
            var $notifyAlign    = $notify.data('notify-align') ? $notify.data('notify-align') : 'right';
            var $notifyIcon     = $notify.data('notify-icon') ? $notify.data('notify-icon') : '';
            var $notifyUrl      = $notify.data('notify-url') ? $notify.data('notify-url') : '';

            jQuery.notify({
                    icon: $notifyIcon,
                    message: $notifyMsg,
                    url: $notifyUrl
                },
                {
                    element: 'body',
                    type: $notifyType,
                    allow_dismiss: true,
                    newest_on_top: true,
                    showProgressbar: false,
                    placement: {
                        from: $notifyFrom,
                        align: $notifyAlign
                    },
                    offset: 20,
                    spacing: 10,
                    z_index: 1031,
                    delay: 5000,
                    timer: 1000,
                    animate: {
                        enter: 'animated fadeIn',
                        exit: 'animated fadeOutDown'
                    }
                });
        });
    };

    return {
        init: function() {
            // Init all vital functions
            uiInit();
            uiLayout();
        },
        layout: function($mode) {
            uiLayoutApi($mode);
        },
        initHelper: function($helper) {
            switch ($helper) {
                case 'appear':
                    uiHelperAppear();
                    break;
                case 'appear-countTo':
                    uiHelperAppearCountTo();
                    break;
                case 'masked-inputs':
                    uiHelperMaskedInputs();
                    break;
                case 'notify':
                    uiHelperNotify();
                    break;
                default:
                    return false;
            }
        },
        initHelpers: function($helpers) {
            if ($helpers instanceof Array) {
                for(var $index in $helpers) {
                    App.initHelper($helpers[$index]);
                }
            } else {
                App.initHelper($helpers);
            }
        }
    };
}();

// Initialize app when page loads
jQuery(function(){ DocumentApp.init(); });
//# sourceMappingURL=auth.js.map
