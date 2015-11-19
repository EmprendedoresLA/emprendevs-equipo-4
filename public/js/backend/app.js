var DocumentApp = function() {
    // Helper variables - set in uiInit()
    var $lHtml, $lBody, $lPage, $lSidebar, $lSidebarScroll, $lSideOverlay, $lSideOverlayScroll, $lHeader, $lMain, $lFooter;

    // User Interface init
    var uiInit = function() {
        // Set variables
        $lHtml              = jQuery('html');
        $lBody              = jQuery('body');
        $lPage              = jQuery('#page-container');
        $lSidebar           = jQuery('#sidebar');
        $lSidebarScroll     = jQuery('#sidebar-scroll');
        $lSideOverlay       = jQuery('#side-overlay');
        $lSideOverlayScroll = jQuery('#side-overlay-scroll');
        $lHeader            = jQuery('#header-navbar');
        $lMain              = jQuery('#main-container');
        $lFooter            = jQuery('#page-footer');

        jQuery('.form-control').placeholder();
    };

    var uiLayout = function() {
        var $resizeTimeout;

        if ($lMain.length) {
            uiHandleMain();

            jQuery(window).on('resize orientationchange', function(){
                clearTimeout($resizeTimeout);

                $resizeTimeout = setTimeout(function(){
                    uiHandleMain();
                }, 150);
            });
        }

        uiHandleScroll('init');

        if ($lPage.hasClass('header-navbar-fixed') && $lPage.hasClass('header-navbar-transparent')) {
            jQuery(window).on('scroll', function(){
                if (jQuery(this).scrollTop() > 20) {
                    $lPage.addClass('header-navbar-scroll');
                } else {
                    $lPage.removeClass('header-navbar-scroll');
                }
            });
        }

        jQuery('[data-toggle="layout"]').on('click', function(){
            var $btn = jQuery(this);

            uiLayoutApi($btn.data('action'));

            if ($lHtml.hasClass('no-focus')) {
                $btn.blur();
            }
        });
    };

    var uiHandleMain = function() {
        var $hWindow     = jQuery(window).height();
        var $hHeader     = $lHeader.outerHeight();
        var $hFooter     = $lFooter.outerHeight();

        if ($lPage.hasClass('header-navbar-fixed')) {
            $lMain.css('min-height', $hWindow - $hFooter);
        } else {
            $lMain.css('min-height', $hWindow - ($hHeader + $hFooter));
        }
    };

    var uiHandleScroll = function($mode) {
        var $windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if ($mode === 'init') {
            uiHandleScroll();

            var $sScrollTimeout;

            jQuery(window).on('resize orientationchange', function(){
                clearTimeout($sScrollTimeout);

                $sScrollTimeout = setTimeout(function(){
                    uiHandleScroll();
                }, 150);
            });
        } else {
            if ($windowW > 991 && $lPage.hasClass('side-scroll')) {
                jQuery($lSidebar).scrollLock('off');
                jQuery($lSideOverlay).scrollLock('off');

                if ($lSidebarScroll.length && (!$lSidebarScroll.parent('.slimScrollDiv').length)) {
                    $lSidebarScroll.slimScroll({
                        height: $lSidebar.outerHeight(),
                        color: '#fff',
                        size: '5px',
                        opacity : .35,
                        wheelStep : 15,
                        distance : '2px',
                        railVisible: false,
                        railOpacity: 1
                    });
                }
                else {
                    $lSidebarScroll
                        .add($lSidebarScroll.parent())
                        .css('height', $lSidebar.outerHeight());
                }

                if ($lSideOverlayScroll.length && (!$lSideOverlayScroll.parent('.slimScrollDiv').length)) {
                    $lSideOverlayScroll.slimScroll({
                        height: $lSideOverlay.outerHeight(),
                        color: '#000',
                        size: '5px',
                        opacity : .35,
                        wheelStep : 15,
                        distance : '2px',
                        railVisible: false,
                        railOpacity: 1
                    });
                }
                else {
                    $lSideOverlayScroll
                        .add($lSideOverlayScroll.parent())
                        .css('height', $lSideOverlay.outerHeight());
                }
            } else {
                jQuery($lSidebar).scrollLock();
                jQuery($lSideOverlay).scrollLock();

                if ($lSidebarScroll.length && $lSidebarScroll.parent('.slimScrollDiv').length) {
                    $lSidebarScroll
                        .slimScroll({destroy: true});
                    $lSidebarScroll
                        .attr('style', '');
                }

                if ($lSideOverlayScroll.length && $lSideOverlayScroll.parent('.slimScrollDiv').length) {
                    $lSideOverlayScroll
                        .slimScroll({destroy: true});
                    $lSideOverlayScroll
                        .attr('style', '');
                }
            }
        }
    };

    var uiLayoutApi = function($mode) {
        var $windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        // Mode selection
        switch($mode) {
            case 'sidebar_pos_toggle':
                $lPage.toggleClass('sidebar-l sidebar-r');
                break;
            case 'sidebar_pos_left':
                $lPage
                    .removeClass('sidebar-r')
                    .addClass('sidebar-l');
                break;
            case 'sidebar_pos_right':
                $lPage
                    .removeClass('sidebar-l')
                    .addClass('sidebar-r');
                break;
            case 'sidebar_toggle':
                if ($windowW > 991) {
                    $lPage.toggleClass('sidebar-o');
                } else {
                    $lPage.toggleClass('sidebar-o-xs');
                }
                break;
            case 'sidebar_open':
                if ($windowW > 991) {
                    $lPage.addClass('sidebar-o');
                } else {
                    $lPage.addClass('sidebar-o-xs');
                }
                break;
            case 'sidebar_close':
                if ($windowW > 991) {
                    $lPage.removeClass('sidebar-o');
                } else {
                    $lPage.removeClass('sidebar-o-xs');
                }
                break;
            case 'sidebar_mini_toggle':
                if ($windowW > 991) {
                    $lPage.toggleClass('sidebar-mini');
                }
                break;
            case 'sidebar_mini_on':
                if ($windowW > 991) {
                    $lPage.addClass('sidebar-mini');
                }
                break;
            case 'sidebar_mini_off':
                if ($windowW > 991) {
                    $lPage.removeClass('sidebar-mini');
                }
                break;
            case 'side_overlay_toggle':
                $lPage.toggleClass('side-overlay-o');
                break;
            case 'side_overlay_open':
                $lPage.addClass('side-overlay-o');
                break;
            case 'side_overlay_close':
                $lPage.removeClass('side-overlay-o');
                break;
            case 'side_overlay_hoverable_toggle':
                $lPage.toggleClass('side-overlay-hover');
                break;
            case 'side_overlay_hoverable_on':
                $lPage.addClass('side-overlay-hover');
                break;
            case 'side_overlay_hoverable_off':
                $lPage.removeClass('side-overlay-hover');
                break;
            case 'header_fixed_toggle':
                $lPage.toggleClass('header-navbar-fixed');
                break;
            case 'header_fixed_on':
                $lPage.addClass('header-navbar-fixed');
                break;
            case 'header_fixed_off':
                $lPage.removeClass('header-navbar-fixed');
                break;
            case 'side_scroll_toggle':
                $lPage.toggleClass('side-scroll');
                uiHandleScroll();
                break;
            case 'side_scroll_on':
                $lPage.addClass('side-scroll');
                uiHandleScroll();
                break;
            case 'side_scroll_off':
                $lPage.removeClass('side-scroll');
                uiHandleScroll();
                break;
            default:
                return false;
        }
    };

    var uiNav = function() {
        jQuery('[data-toggle="nav-submenu"]').on('click', function(e){
            e.stopPropagation();

            var $link = jQuery(this);

            var $parentLi = $link.parent('li');

            if ($parentLi.hasClass('open')) { // If submenu is open, close it..
                $parentLi.removeClass('open');
            } else { // .. else if submenu is closed, close all other (same level) submenus first before open it
                $link
                    .closest('ul')
                    .find('> li')
                    .removeClass('open');

                $parentLi
                    .addClass('open');
            }

            // Remove focus from submenu link
            if ($lHtml.hasClass('no-focus')) {
                $link.blur();
            }
        });
    };

    // Blocks options functionality
    var uiBlocks = function() {
        // Init default icons fullscreen and content toggle buttons
        uiBlocksApi(false, 'init');

        // Call blocks API on option button click
        jQuery('[data-toggle="block-option"]').on('click', function(){
            uiBlocksApi(jQuery(this).parents('.block'), jQuery(this).data('action'));
        });
    };

    // Blocks API
    var uiBlocksApi = function($block, $mode) {
        // Set default icons for fullscreen and content toggle buttons
        var $iconFullscreen         = 'si si-size-fullscreen';
        var $iconFullscreenActive   = 'si si-size-actual';
        var $iconContent            = 'si si-arrow-up';
        var $iconContentActive      = 'si si-arrow-down';

        if ($mode === 'init') {
            // Auto add the default toggle icons to fullscreen and content toggle buttons
            jQuery('[data-toggle="block-option"][data-action="fullscreen_toggle"]').each(function(){
                var $this = jQuery(this);

                $this.html('<i class="' + (jQuery(this).closest('.block').hasClass('block-opt-fullscreen') ? $iconFullscreenActive : $iconFullscreen) + '"></i>');
            });

            jQuery('[data-toggle="block-option"][data-action="content_toggle"]').each(function(){
                var $this = jQuery(this);

                $this.html('<i class="' + ($this.closest('.block').hasClass('block-opt-hidden') ? $iconContentActive : $iconContent) + '"></i>');
            });
        } else {
            // Get block element
            var $elBlock = ($block instanceof jQuery) ? $block : jQuery($block);

            // If element exists, procceed with blocks functionality
            if ($elBlock.length) {
                // Get block option buttons if exist (need them to update their icons)
                var $btnFullscreen  = jQuery('[data-toggle="block-option"][data-action="fullscreen_toggle"]', $elBlock);
                var $btnToggle      = jQuery('[data-toggle="block-option"][data-action="content_toggle"]', $elBlock);

                // Mode selection
                switch($mode) {
                    case 'fullscreen_toggle':
                        $elBlock.toggleClass('block-opt-fullscreen');

                        // Enable/disable scroll lock to block
                        $elBlock.hasClass('block-opt-fullscreen') ? jQuery($elBlock).scrollLock() : jQuery($elBlock).scrollLock('off');

                        // Update block option icon
                        if ($btnFullscreen.length) {
                            if ($elBlock.hasClass('block-opt-fullscreen')) {
                                jQuery('i', $btnFullscreen)
                                    .removeClass($iconFullscreen)
                                    .addClass($iconFullscreenActive);
                            } else {
                                jQuery('i', $btnFullscreen)
                                    .removeClass($iconFullscreenActive)
                                    .addClass($iconFullscreen);
                            }
                        }
                        break;
                    case 'fullscreen_on':
                        $elBlock.addClass('block-opt-fullscreen');

                        // Enable scroll lock to block
                        jQuery($elBlock).scrollLock();

                        // Update block option icon
                        if ($btnFullscreen.length) {
                            jQuery('i', $btnFullscreen)
                                .removeClass($iconFullscreen)
                                .addClass($iconFullscreenActive);
                        }
                        break;
                    case 'fullscreen_off':
                        $elBlock.removeClass('block-opt-fullscreen');

                        // Disable scroll lock to block
                        jQuery($elBlock).scrollLock('off');

                        // Update block option icon
                        if ($btnFullscreen.length) {
                            jQuery('i', $btnFullscreen)
                                .removeClass($iconFullscreenActive)
                                .addClass($iconFullscreen);
                        }
                        break;
                    case 'content_toggle':
                        $elBlock.toggleClass('block-opt-hidden');

                        // Update block option icon
                        if ($btnToggle.length) {
                            if ($elBlock.hasClass('block-opt-hidden')) {
                                jQuery('i', $btnToggle)
                                    .removeClass($iconContent)
                                    .addClass($iconContentActive);
                            } else {
                                jQuery('i', $btnToggle)
                                    .removeClass($iconContentActive)
                                    .addClass($iconContent);
                            }
                        }
                        break;
                    case 'content_hide':
                        $elBlock.addClass('block-opt-hidden');

                        // Update block option icon
                        if ($btnToggle.length) {
                            jQuery('i', $btnToggle)
                                .removeClass($iconContent)
                                .addClass($iconContentActive);
                        }
                        break;
                    case 'content_show':
                        $elBlock.removeClass('block-opt-hidden');

                        // Update block option icon
                        if ($btnToggle.length) {
                            jQuery('i', $btnToggle)
                                .removeClass($iconContentActive)
                                .addClass($iconContent);
                        }
                        break;
                    case 'refresh_toggle':
                        $elBlock.toggleClass('block-opt-refresh');

                        // Return block to normal state if the demostration mode is on in the refresh option button - data-action-mode="demo"
                        if (jQuery('[data-toggle="block-option"][data-action="refresh_toggle"][data-action-mode="demo"]', $elBlock).length) {
                            setTimeout(function(){
                                $elBlock.removeClass('block-opt-refresh');
                            }, 2000);
                        }
                        break;
                    case 'state_loading':
                        $elBlock.addClass('block-opt-refresh');
                        break;
                    case 'state_normal':
                        $elBlock.removeClass('block-opt-refresh');
                        break;
                    case 'close':
                        $elBlock.hide();
                        break;
                    case 'open':
                        $elBlock.show();
                        break;
                    default:
                        return false;
                }
            }
        }
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

    // Scroll to element animation helper
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

    // Toggle class helper
    var uiToggleClass = function() {
        jQuery('[data-toggle="class-toggle"]').on('click', function(){
            var $el = jQuery(this);

            jQuery($el.data('target').toString()).toggleClass($el.data('class').toString());

            if ($lHtml.hasClass('no-focus')) {
                $el.blur();
            }
        });
    };

    var uiHelperPrint = function() {
        // Store all #page-container classes
        var $pageCls = $lPage.prop('class');

        // Remove all classes from #page-container
        $lPage.prop('class', '');

        // Print the page
        window.print();

        // Restore all #page-container classes
        $lPage.prop('class', $pageCls);
    };

    // Table sections functionality
    var uiHelperTableToolsSections = function(){
        var $table      = jQuery('.js-table-sections');
        var $tableRows  = jQuery('.js-table-sections-header > tr', $table);

        // When a row is clicked in tbody.js-table-sections-header
        $tableRows.click(function(e) {
            var $row    = jQuery(this);
            var $tbody  = $row.parent('tbody');

            if (! $tbody.hasClass('open')) {
                jQuery('tbody', $table).removeClass('open');
            }

            $tbody.toggleClass('open');
        });
    };

    // Checkable table functionality
    var uiHelperTableToolsCheckable = function() {
        var $table = jQuery('.js-table-checkable');

        // When a checkbox is clicked in thead
        jQuery('thead input:checkbox', $table).click(function() {
            var $checkedStatus = jQuery(this).prop('checked');

            // Check or uncheck all checkboxes in tbody
            jQuery('tbody input:checkbox', $table).each(function() {
                var $checkbox = jQuery(this);

                $checkbox.prop('checked', $checkedStatus);
                uiHelperTableToolscheckRow($checkbox, $checkedStatus);
            });
        });

        // When a checkbox is clicked in tbody
        jQuery('tbody input:checkbox', $table).click(function() {
            var $checkbox = jQuery(this);

            uiHelperTableToolscheckRow($checkbox, $checkbox.prop('checked'));
        });

        // When a row is clicked in tbody
        jQuery('tbody > tr', $table).click(function(e) {
            if (e.target.type !== 'checkbox'
                    && e.target.type !== 'button'
                    && e.target.tagName.toLowerCase() !== 'a'
                    && !jQuery(e.target).parent('label').length) {
                var $checkbox       = jQuery('input:checkbox', this);
                var $checkedStatus  = $checkbox.prop('checked');

                $checkbox.prop('checked', ! $checkedStatus);
                uiHelperTableToolscheckRow($checkbox, ! $checkedStatus);
            }
        });
    };

    // Checkable table functionality helper - Checks or unchecks table row
    var uiHelperTableToolscheckRow = function($checkbox, $checkedStatus) {
        if ($checkedStatus) {
            $checkbox
                .closest('tr')
                .addClass('active');
        } else {
            $checkbox
                .closest('tr')
                .removeClass('active');
        }
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
     ********************************************************************************************
     *
     * All the following helpers require each plugin's resources (JS, CSS) to be included in order to work
     *
     ********************************************************************************************
     */

    /*
     * Magnific Popup functionality, for more examples you can check out http://dimsemenov.com/plugins/magnific-popup/
     *
     * App.initHelper('magnific-popup');
     *
     */
    var uiHelperMagnific = function(){
        // Simple Gallery init
        jQuery('.js-gallery').each(function(){
            jQuery(this).magnificPopup({
                delegate: 'a.img-link',
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        });

        // Advanced Gallery init
        jQuery('.js-gallery-advanced').each(function(){
            jQuery(this).magnificPopup({
                delegate: 'a.img-lightbox',
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        });
    };

    /*
     * Slick init, for more examples you can check out http://kenwheeler.github.io/slick/
     *
     * App.initHelper('slick');
     *
     */
    var uiHelperSlick = function(){
        // Get each slider element (with .js-slider class)
        jQuery('.js-slider').each(function(){
            var $slider = jQuery(this);

            // Get each slider's init data
            var $sliderArrows       = $slider.data('slider-arrows') ? $slider.data('slider-arrows') : false;
            var $sliderDots         = $slider.data('slider-dots') ? $slider.data('slider-dots') : false;
            var $sliderNum          = $slider.data('slider-num') ? $slider.data('slider-num') : 1;
            var $sliderAuto         = $slider.data('slider-autoplay') ? $slider.data('slider-autoplay') : false;
            var $sliderAutoSpeed    = $slider.data('slider-autoplay-speed') ? $slider.data('slider-autoplay-speed') : 3000;

            // Init slick slider
            $slider.slick({
                arrows: $sliderArrows,
                dots: $sliderDots,
                slidesToShow: $sliderNum,
                autoplay: $sliderAuto,
                autoplaySpeed: $sliderAutoSpeed
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
     * Highlight.js, for more examples you can check out https://highlightjs.org/usage/
     *
     * App.initHelper('highlightjs');
     *
     */
    var uiHelperHighlightjs = function(){
        // Init Highlight.js
        hljs.initHighlightingOnLoad();
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

    /*
     * Draggable items with jQuery, for more examples you can check out https://jqueryui.com/sortable/
     *
     * App.initHelper('draggable-items');
     *
     */
    var uiHelperDraggableItems = function(){
        // Init draggable items functionality (with .js-draggable-items class)
        jQuery('.js-draggable-items').sortable({
            connectWith: '.draggable-column',
            items: '.draggable-item',
            opacity: .75,
            handle: '.draggable-handler',
            placeholder: 'draggable-placeholder',
            tolerance: 'pointer',
            start: function(e, ui){
                ui.placeholder.css({
                    'height': ui.item.outerHeight(),
                    'margin-bottom': ui.item.css('margin-bottom')
                });
            }
        });
    };

    /*
     * Easy Pie Chart, for more examples you can check out http://rendro.github.io/easy-pie-chart/
     *
     * App.initHelper('easy-pie-chart');
     *
     */
    var uiHelperEasyPieChart = function(){
        // Init Easy Pie Charts (with .js-pie-chart class)
        jQuery('.js-pie-chart').easyPieChart({
            barColor: jQuery(this).data('bar-color') ? jQuery(this).data('bar-color') : '#777777',
            trackColor: jQuery(this).data('track-color') ? jQuery(this).data('track-color') : '#eeeeee',
            lineWidth: jQuery(this).data('line-width') ? jQuery(this).data('line-width') : 3,
            size: jQuery(this).data('size') ? jQuery(this).data('size') : '80',
            animate: 750,
            scaleColor: jQuery(this).data('scale-color') ? jQuery(this).data('scale-color') : false
        });
    };

    return {
        init: function() {
            // Init all vital functions
            uiInit();
            uiLayout();
            uiNav();
            uiBlocks();
            uiForms();
            uiToggleClass();
            uiScrollTo();
        },
        layout: function($mode) {
            uiLayoutApi($mode);
        },
        blocks: function($block, $mode) {
            uiBlocksApi($block, $mode);
        },
        initHelper: function($helper) {
            switch ($helper) {
                case 'print-page':
                    uiHelperPrint();
                    break;
                case 'table-tools':
                    uiHelperTableToolsSections();
                    uiHelperTableToolsCheckable();
                    break;
                case 'appear':
                    uiHelperAppear();
                    break;
                case 'appear-countTo':
                    uiHelperAppearCountTo();
                    break;
                case 'magnific-popup':
                    uiHelperMagnific();
                    break;
                case 'slick':
                    uiHelperSlick();
                    break;
                case 'masked-inputs':
                    uiHelperMaskedInputs();
                    break;
                case 'select2':
                    uiHelperSelect2();
                    break;
                case 'highlightjs':
                    uiHelperHighlightjs();
                    break;
                case 'notify':
                    uiHelperNotify();
                    break;
                case 'draggable-items':
                    uiHelperDraggableItems();
                    break;
                case 'easy-pie-chart':
                    uiHelperEasyPieChart();
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

(function(angular, jQuery, undefined) {
	var modules = [
		'ngRoute', 
        'ngSanitize', 
        'mgcrea.ngStrap', 
        'app.customers', 
        'app.experiences', 
        'app.calendar', 
        'app.orders', 
        'app.dashboard', 
        'app.company'
	];

	angular.module('App', modules)

	.config(['$routeProvider', '$locationProvider', '$httpProvider',  
		function($routeProvider, $locationProvider, $httpProvider) 
        {
			$routeProvider.
                when('/auth/logout', {
                    controller: 'AuthLogoutCtrl', 
                    templateUrl: '/partials/modules/auth/logout.html', 
                }).
				otherwise({
					redirectTo: 'dashboard'
				})
				;

			// $locationProvider.html5Mode(true);

            $httpProvider.interceptors.push('httpInterceptor');
            $httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = angular.element(document.querySelector('meta[name="csrf-token"]')).attr('content');
		}
	])

    .run([
        '$rootScope', '$window', '$interval', 'HttpService', 
        function($rootScope, $window, $interval, HttpService) 
        {
            function _notify(msg, type, icon, url)
            {
                var $notifyMsg      = msg;
                var $notifyType     = type ? type : 'success';
                var $notifyIcon     = icon ? icon : '';
                var $notifyUrl      = url ? url : '';

                jQuery.notify({
                        icon: $notifyIcon,
                        message: $notifyMsg,
                        url: $notifyUrl, 
                    },
                    {
                        element: 'body',
                        type: $notifyType,
                        allow_dismiss: true,
                        newest_on_top: true,
                        showProgressbar: false,
                        placement: {
                            from: 'bottom',
                            align: 'left'
                        },
                        offset: 20,
                        spacing: 10,
                        z_index: 1031,
                        delay: 3000,
                        timer: 500,
                        animate: {
                            enter: 'animated fadeIn',
                            exit: 'animated fadeOutDown'
                        }
                    });
            }

            function _init()
            {
                $rootScope.notify = _notify;
                // $rootScope.business = $window.business;
            }

            _init();
        }
    ])

    .factory('httpInterceptor', ['$q', '$rootScope', '$window', 
        function($q, $rootScope, $window) 
        {
            return {
                'request': function(config) {
                    return config;
                }, 
                'requestError': function(rejection) {
                    return $q.reject(rejection);
                }, 
                'response': function(response) {
                    $rootScope.formErrors = null;
                    return response;
                }, 
                'responseError': function(rejection) 
                {
                    if ( rejection.status === 0 )
                        $rootScope.offline = true;

                    if ( rejection.status === 401 )
                    {
                        $rootScope.offline = false;
                        $window.document.location.href = '/auth/logout';
                    }

                    if ( rejection.status === 422 )
                    {
                        $rootScope.offline = false;
                        $rootScope.formErrors = rejection.data.errors;
                        $rootScope.notify('Hay errors en el formulario.', 'danger');
                    }

                    if ( rejection.status === 404 )
                    {
                        $rootScope.offline = false;
                        // $rootScope.$broadcast('notifier', {type: 'error', message: $window.LatamShop.lang.errors.not_found});
                    }

                    if ( rejection.status === 500 )
                    {
                        $rootScope.offline = false;
                        $rootScope.notify('Hay ocurrido un error. Por favor, vuelva a intentarlo.', 'danger');
                        // $rootScope.$broadcast('notifier', {type: 'error', message: $window.LatamShop.lang.errors.general});
                    }

                    return $q.reject(rejection);
                }
            }
        }
    ])

    .service('HttpService', ['$http', 
        function ($http)
        {
            function _http(req) {
                return $http(req);
            }

            return {
                get: function(url, params)
                {
                    var req = {
                        method: 'GET', 
                        url: '/v1/' + url, 
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest'
                        }, 
                        params: params
                    };

                    return _http(req);
                }, 
                post: function (url, data)
                {
                    var req = {
                        method: 'POST', 
                        url: '/v1/' + url, 
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest'
                        }, 
                        data: data
                    };

                    return _http(req);
                }, 
                put: function (url, data)
                {
                    var req = {
                        method: 'PUT', 
                        url: '/v1/' + url, 
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest'
                        }, 
                        data: data
                    };

                    return _http(req);
                }, 
                delete: function (url)
                {
                    var req = {
                        method: 'DELETE', 
                        url: '/v1/' + url, 
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                    };

                    return _http(req);
                }
            };
        }
    ])

    .controller('AuthLogoutCtrl', ['$scope', '$http', 
        function($scope, $http) 
        {
            $http.get('/auth/logout')
                .then(function(resp) {
                    console.log(resp);
                    document.location.href = '/';
                });
        }
    ])

    .controller('AppCtrl', [
        '$scope', 
        function($scope)
        {
        }
    ])
	;
    
})(angular, jQuery);

(function(angular, undefined) {
	'use strict';
	
	var modules = [
		// 'app.calendar.models'
	];
	
	angular.module('app.calendar.controllers', modules)

	.controller('CalendarCtrl', [
		'$scope', 
		function($scope)
		{
			function _getCalendar()
			{
				$scope.getting = true;
				
				CalendarService.findAll().then(function(calendar) {
					$scope.calendar = calendar;
					$scope.getting = false;
				}, function(resp) {
					$scope.getting = false;
				});
			}

			function _init()
			{
				$scope.eventSources = [
					// '/v1/calendar/backend'
				];
				// $scope.getCalendar = _getCalendar;

				// _getCalendar();
			}

			_init();
		}
	])
	;
})(angular);
(function(angular, undefined) {
	'use strict';
	
	var modules = [
		'ui.calendar', 
		'app.calendar.routes', 
		'app.calendar.controllers', 
	];

	angular.module('app.calendar', modules)
	
	;
})(angular);
(function(angular, undefined) {
	'use strict';

	var modules = [
		'ngRoute', 
	];

	angular.module('app.calendar.routes', modules)

	.config(['$routeProvider', function($routeProvider) 
	{
		var path = '/partials/backend/calendar/';

		$routeProvider
			.when('/calendar', {
				templateUrl: path + 'index.html',
				controller: 'CalendarCtrl', 
			})
			;
	}])
	;
})(angular);
(function(angular, undefined) {
	'use strict';
	
	var modules = [
		'app.company.models'
	];
	
	angular.module('app.company.controllers', modules)

	.controller('CompanyEditCtrl', [
		'$scope', 'CompanyService', '$routeParams', '$modal', '$location', 
		function($scope, CompanyService, $routeParams, $modal, $location)
		{
			function _getCompany(id)
			{
				CompanyService.find({id: id}).then(function(company) {
					$scope.fd.company = company;
				}, function(resp) {
					$location.path('/company');
				});
			}

			function _save(data)
			{
				var fd = angular.copy(data);

				$scope.validate = true;

				if (!fd.company.name && !fd.company.email) {
					return false;
				}

				$scope.saving = true;

				CompanyService.save(fd.company).then(function(company) {
					$scope.notify('Los datos ha sido actualiados.');
				}, function(resp) {
					$scope.saving = false;
					$scope.form.$setDirty();
				});
			}

			function _init()
			{
				$scope.fd = {
					company: {}
				};

				_getCompany($routeParams.id);

				$scope.save = _save;
			}

			_init();
		}
	])
	;
})(angular);
(function(angular, undefined) {
	'use strict';
	
	var modules = [];
	
	angular.module('app.company.models', modules)

	.factory('Company', [
		function()
		{
			function Company(data)
			{
				this.id = null;
				this.name = null;
				this.description = null;
				this.website = null;
				this.email = null;
				this.phone = null;

				if (data) {
					angular.extend(this, data);
				}
			}

			return Company;
		}
	])

	.service('CompanyService', [
		'$q', 'HttpService', 'Company', 
		function ($q, HttpService, Company)
		{
			var url = 'company';

			return {
				find: function(data) 
				{
					var deferred = $q.defer();

					HttpService.get(url)
						.success(function(resp) 
						{
							var company = new Company(resp.company);

							deferred.resolve(company);
						})
						.error(function(resp) 
						{
							deferred.reject(resp);
						});

					return deferred.promise;
				}, 
				save: function(data) 
				{
					var deferred = $q.defer();

					if (data.id)
					{
						HttpService.put(url + '/' + data.id, {company: data})
							.success(function(resp) 
							{
								var company = new Company(resp.company);
								
								deferred.resolve(company);
							})
							.error(function(resp) 
							{
								deferred.reject(resp.error);
							});
					}
					else
					{
						HttpService.post(url, {company: data})
							.success(function(resp) 
							{
								var company = new Company(resp.company);

								deferred.resolve(company);
							})
							.error(function(resp) 
							{
								deferred.reject(resp.error);
							});
					}

					return deferred.promise;
				}
			};
		}
	])
	;

})(angular);
(function(angular, undefined) {
	'use strict';
	
	var modules = [
		'app.company.routes', 
		'app.company.controllers', 
	];

	angular.module('app.company', modules)
	;
})(angular);
(function(angular, undefined) {
	'use strict';

	var modules = [
		'ngRoute', 
	];

	angular.module('app.company.routes', modules)

	.config(['$routeProvider', function($routeProvider) 
	{
		var path = '/partials/backend/company/';

		$routeProvider
			.when('/company', {
				templateUrl: path + 'edit.html',
				controller: 'CompanyEditCtrl', 
			})
			;
	}])
	;
})(angular);
(function(angular, undefined) {
	'use strict';
	
	var modules = [
		'app.customers.models'
	];
	
	angular.module('app.customers.controllers', modules)

	.controller('CustomerListCtrl', [
		'$scope', 'CustomerService', 
		function($scope, CustomerService)
		{
			function _getCustomers()
			{
				$scope.getting = true;
				
				CustomerService.findAll().then(function(customers) {
					$scope.customers = customers;
					$scope.getting = false;
				}, function(resp) {
					$scope.getting = false;
				});
			}

			function _init()
			{
				$scope.getCustomers = _getCustomers;

				_getCustomers();
			}

			_init();
		}
	])

	.controller('CustomerCreateCtrl', [
		'$scope', '$location', 'CustomerService', 
		function($scope, $location, CustomerService)
		{
			function _save(data)
			{
				var fd = angular.copy(data);

				$scope.validate = true;

				if (!fd.customer.name && !fd.customer.phone) {
					return false;
				}

				$scope.saving = true;

				CustomerService.save(fd.customer).then(function(customer) {
					$scope.notify('El cliente ha sido creado.');
					$location.path('/customers/' + customer.id);
				}, function(resp) {
					$scope.saving = false;
					$scope.form.$setDirty();
				});
			}

			function _init()
			{
				$scope.fd = {};

				CustomerService.blank().then(function(resp) {
					$scope.fd.customer = resp;
				});

				$scope.save = _save;
			}

			_init();
		}
	])

	.controller('CustomerEditCtrl', [
		'$scope', 'CustomerService', '$routeParams', '$modal', '$location', 
		function($scope, CustomerService, $routeParams, $modal, $location)
		{
			function _getCustomer(id)
			{
				CustomerService.find({id: id}).then(function(customer) {
					$scope.fd.customer = customer;
				}, function(resp) {
					$location.path('/customers');
				});
			}

			function _save(data)
			{
				var fd = angular.copy(data);

				$scope.validate = true;

				if (!fd.customer.name && !fd.customer.email) {
					return false;
				}

				$scope.saving = true;

				CustomerService.save(fd.customer).then(function(customer) {
					$scope.notify('El cliente ha sido actualiado.');
				}, function(resp) {
					$scope.saving = false;
					$scope.form.$setDirty();
				});
			}

			function _deleteModal(customer)
			{
				var scope = $scope.$new();
				scope.customer = customer;

				var deleteModal = $modal({
					scope: scope, 
					title: 'Eliminar cliente', 
					templateUrl: '/partials/backend/core/delete-modal.html', 
					controller: 'CustomerDeleteCtrl', 
					show: true, 
				});
			}

			function _init()
			{
				$scope.fd = {
					customer: {}
				};

				_getCustomer($routeParams.id);

				$scope.save = _save;
				$scope.confirmDelete = _deleteModal;
			}

			_init();
		}
	])

	.controller('CustomerDeleteCtrl', [
		'$scope', 'CustomerService', '$location', 
		function($scope, CustomerService, $location)
		{
			function _delete()
			{
				$scope.deleting = true;
				CustomerService.destroy({id: $scope.customer.id}).then(function(resp) {
					$scope.$hide();
					$scope.notify('El cliente ha sido eliminado.');
					$scope.deleting = false;
					$location.path('/customers');
				}, function(resp) {
					$scope.deleting = false;
				});
			}

			function _init()
			{
				$scope.delete = _delete;
			}

			_init();
		}
	])

	;
})(angular);
(function(angular, undefined) {
	'use strict';
	
	var modules = [];
	
	angular.module('app.customers.models', modules)

	.factory('Customer', [
		function()
		{
			function Customer(data)
			{
				this.id = null;
				this.name = null;
				this.email = null;
				this.phone = null;

				if (data) {
					angular.extend(this, data);
				}
			}

			return Customer;
		}
	])

	.service('CustomerService', [
		'$q', 'HttpService', 'Customer', 
		function ($q, HttpService, Customer)
		{
			var url = 'customers';

			return {
				blank: function() {
					var deferred = $q.defer();

					var customer = new Customer();

					deferred.resolve(customer);

					return deferred.promise;
				}, 
				findAll: function(data) 
				{
					var deferred = $q.defer();

					HttpService.get(url)
						.success(function(resp) 
						{
							var customers = []
								, count = resp.customers.length;

							for (var i = 0; i < count; i++)
							{
								customers.push(new Customer(resp.customers[i]));
							}

							deferred.resolve(customers);
						})
						.error(function(resp) 
						{
							deferred.reject(resp);
						});

					return deferred.promise;
				}, 
				find: function(data) 
				{
					var deferred = $q.defer();

					HttpService.get(url + '/' + data.id)
						.success(function(resp) 
						{
							var customer = new Customer(resp.customer);

							deferred.resolve(customer);
						})
						.error(function(resp) 
						{
							deferred.reject(resp);
						});

					return deferred.promise;
				}, 
				save: function(data) 
				{
					var deferred = $q.defer();

					if (data.id)
					{
						HttpService.put(url + '/' + data.id, {customer: data})
							.success(function(resp) 
							{
								var customer = new Customer(resp.customer);
								
								deferred.resolve(customer);
							})
							.error(function(resp) 
							{
								deferred.reject(resp.error);
							});
					}
					else
					{
						HttpService.post(url, {customer: data})
							.success(function(resp) 
							{
								var customer = new Customer(resp.customer);

								deferred.resolve(customer);
							})
							.error(function(resp) 
							{
								deferred.reject(resp.error);
							});
					}

					return deferred.promise;
				}, 
				destroy: function(data) {
					var deferred = $q.defer();

					HttpService.delete(url + '/' + data.id)
						.success(function(resp) {
							deferred.resolve(resp);
						})
						.error(function(resp) {
							deferred.reject(resp);
						});

					return deferred.promise;
				}, 
			};
		}
	])
	;

})(angular);
(function(angular, undefined) {
	'use strict';
	
	var modules = [
		'app.customers.routes', 
		'app.customers.controllers', 
	];

	angular.module('app.customers', modules)
	;
})(angular);
(function(angular, undefined) {
	'use strict';

	var modules = [
		'ngRoute', 
	];

	angular.module('app.customers.routes', modules)

	.config(['$routeProvider', function($routeProvider) 
	{
		var path = '/partials/backend/customers/';

		$routeProvider
			.when('/customers', {
				templateUrl: path + 'index.html',
				controller: 'CustomerListCtrl', 
			})
			.when('/customers/create', {
				templateUrl: path + 'create.html',
				controller: 'CustomerCreateCtrl', 
			})
			.when('/customers/:id', {
				templateUrl: path + 'edit.html',
				controller: 'CustomerEditCtrl', 
			})
			;
	}])
	;
})(angular);
(function(angular, undefined)
{
	var modules = [];
	
	angular.module('app.dashboard.controllers', modules)
	
	.controller('DashboardCtrl', ['$scope', function($scope)
	{
		$scope.chart1 = {
			labels: ["10/11", "11/11", "12/11", "13/11", "14/11", "15/11", "16/11", "17/11", "18/11", "19/11", "20/11", "21/11", "22/11", "23/11", "24/11"], 
			series: ['Reservas'], 
			data: [
				[20, 21, 34, 25, 30, 32, 44, 45, 43, 50, 55, 76, 81, 78, 81],
			], 
			onClick: function (points, evt) {
				console.log(points, evt);
			}
		};
		$scope.chart2 = {
			labels: ["10/11", "11/11", "12/11", "13/11", "14/11", "15/11", "16/11", "17/11", "18/11", "19/11", "20/11", "21/11", "22/11", "23/11", "24/11"], 
			series: ['Lunch', 'Christmas Lunch', 'Naked Sushi'], 
			data: [
				[1203, 2100, 3203, 2100, 2320, 3200, 4305, 4023, 4300, 5402, 5430, 6434, 7540, 9230, 10020, 11021],
				[1203, 2100, 3203, 2100, 2320, 3200, 6434, 4023, 4300, 5430, 4305, 5402, 7540, 9230, 10020, 11021],
				[2304, 2304, 3204, 3230, 3204, 3230, 5403, 6503, 5403, 6503, 6503, 6503, 7604, 7604, 10020, 11021],
			], 
			onClick: function (points, evt) {
				console.log(points, evt);
			}
		};
	}])
	;
})(angular);
(function(angular, undefined)
{
	var modules = [
		'app.dashboard.controllers', 
		'chart.js', 
	];

	angular.module('app.dashboard', modules)
	
	.config(['$routeProvider', 
		function($routeProvider) {
			$routeProvider.
				when('/dashboard', {
					templateUrl: '/partials/backend/dashboard/index.html',
					controller: 'DashboardCtrl', 
				});
		}
		])
	;
})(angular);
(function(angular, undefined) {
	'use strict';
	
	var modules = [
		'app.experiences.models'
	];
	
	angular.module('app.experiences.controllers', modules)

	.controller('ExperienceListCtrl', [
		'$scope', 'ExperienceService', 
		function($scope, ExperienceService)
		{
			function _getExperiences()
			{
				$scope.getting = true;
				
				ExperienceService.findAll().then(function(experiences) {
					$scope.experiences = experiences;
					$scope.getting = false;
				}, function(resp) {
					$scope.getting = false;
				});
			}

			function _init()
			{
				$scope.getExperiences = _getExperiences;

				_getExperiences();
			}

			_init();
		}
	])

	.controller('ExperienceCreateCtrl', [
		'$scope', '$location', 'ExperienceService', 
		function($scope, $location, ExperienceService)
		{
			function _save(data)
			{
				var fd = angular.copy(data);

				$scope.validate = true;

				if (!fd.experience.name && !fd.experience.phone) {
					return false;
				}

				$scope.saving = true;

				ExperienceService.save(fd.experience).then(function(experience) {
					$scope.notify('La experiencia ha sido creada.');
					$location.path('/experiences/' + experience.id);
				}, function(resp) {
					$scope.saving = false;
					$scope.form.$setDirty();
				});
			}

			function _init()
			{
				$scope.fd = {};

				ExperienceService.blank().then(function(resp) {
					$scope.fd.experience = resp;
				});

				$scope.save = _save;
			}

			_init();
		}
	])

	.controller('ExperienceEditCtrl', [
		'$scope', 'ExperienceService', '$routeParams', '$modal', '$location', 
		function($scope, ExperienceService, $routeParams, $modal, $location)
		{
			function _getExperience(id)
			{
				ExperienceService.find({id: id}).then(function(experience) {
					$scope.fd.experience = experience;
				}, function(resp) {
					$location.path('/experiences');
				});
			}

			function _save(data)
			{
				var fd = angular.copy(data);

				$scope.validate = true;

				if (!fd.experience.name && !fd.experience.email) {
					return false;
				}

				$scope.saving = true;

				ExperienceService.save(fd.experience).then(function(experience) {
					$scope.notify('La experiencia ha sido actualiada.');
				}, function(resp) {
					$scope.saving = false;
					$scope.form.$setDirty();
				});
			}

			function _deleteModal(experience)
			{
				var scope = $scope.$new();
				scope.experience = experience;

				var deleteModal = $modal({
					scope: scope, 
					title: 'Eliminar experiencia', 
					templateUrl: '/partials/backend/core/delete-modal.html', 
					controller: 'ExperienceDeleteCtrl', 
					show: true, 
				});
			}

			function _init()
			{
				$scope.fd = {
					experience: {}
				};

				_getExperience($routeParams.id);

				$scope.save = _save;
				$scope.confirmDelete = _deleteModal;
			}

			_init();
		}
	])

	.controller('ExperienceDeleteCtrl', [
		'$scope', 'ExperienceService', '$location', 
		function($scope, ExperienceService, $location)
		{
			function _delete()
			{
				$scope.deleting = true;
				ExperienceService.destroy({id: $scope.experience.id}).then(function(resp) {
					$scope.$hide();
					$scope.notify('La experiencia ha sido eliminada.');
					$scope.deleting = false;
					$location.path('/experiences');
				}, function(resp) {
					$scope.deleting = false;
				});
			}

			function _init()
			{
				$scope.delete = _delete;
			}

			_init();
		}
	])

	;
})(angular);
(function(angular, undefined) {
	'use strict';
	
	var modules = [];
	
	angular.module('app.experiences.models', modules)

	.factory('Experience', [
		function()
		{
			function Experience(data)
			{
				this.id = null;
				this.name = null;
				this.email = null;
				this.phone = null;

				if (data) {
					angular.extend(this, data);
				}
			}

			return Experience;
		}
	])

	.service('ExperienceService', [
		'$q', 'HttpService', 'Experience', 
		function ($q, HttpService, Experience)
		{
			var url = 'experiences';

			return {
				blank: function() {
					var deferred = $q.defer();

					var experience = new Experience();

					deferred.resolve(experience);

					return deferred.promise;
				}, 
				findAll: function(data) 
				{
					var deferred = $q.defer();

					HttpService.get(url)
						.success(function(resp) 
						{
							var experiences = []
								, count = resp.experiences.length;

							for (var i = 0; i < count; i++)
							{
								experiences.push(new Experience(resp.experiences[i]));
							}

							deferred.resolve(experiences);
						})
						.error(function(resp) 
						{
							deferred.reject(resp);
						});

					return deferred.promise;
				}, 
				find: function(data) 
				{
					var deferred = $q.defer();

					HttpService.get(url + '/' + data.id)
						.success(function(resp) 
						{
							var experience = new Experience(resp.experience);

							deferred.resolve(experience);
						})
						.error(function(resp) 
						{
							deferred.reject(resp);
						});

					return deferred.promise;
				}, 
				save: function(data) 
				{
					var deferred = $q.defer();

					if (data.id)
					{
						HttpService.put(url + '/' + data.id, {experience: data})
							.success(function(resp) 
							{
								var experience = new Experience(resp.experience);
								
								deferred.resolve(experience);
							})
							.error(function(resp) 
							{
								deferred.reject(resp.error);
							});
					}
					else
					{
						HttpService.post(url, {experience: data})
							.success(function(resp) 
							{
								var experience = new Experience(resp.experience);

								deferred.resolve(experience);
							})
							.error(function(resp) 
							{
								deferred.reject(resp.error);
							});
					}

					return deferred.promise;
				}, 
				destroy: function(data) {
					var deferred = $q.defer();

					HttpService.delete(url + '/' + data.id)
						.success(function(resp) {
							deferred.resolve(resp);
						})
						.error(function(resp) {
							deferred.reject(resp);
						});

					return deferred.promise;
				}, 
			};
		}
	])
	;

})(angular);
(function(angular, undefined) {
	'use strict';
	
	var modules = [
		'app.experiences.routes', 
		'app.experiences.controllers', 
	];

	angular.module('app.experiences', modules)
	;
})(angular);
(function(angular, undefined) {
	'use strict';

	var modules = [
		'ngRoute', 
	];

	angular.module('app.experiences.routes', modules)

	.config(['$routeProvider', function($routeProvider) 
	{
		var path = '/partials/backend/experiences/';

		$routeProvider
			.when('/experiences', {
				templateUrl: path + 'index.html',
				controller: 'ExperienceListCtrl', 
			})
			.when('/experiences/create', {
				templateUrl: path + 'create.html',
				controller: 'ExperienceCreateCtrl', 
			})
			.when('/experiences/:id', {
				templateUrl: path + 'edit.html',
				controller: 'ExperienceEditCtrl', 
			})
			;
	}])
	;
})(angular);
(function(angular, undefined) {
	'use strict';
	
	var modules = [
		'app.orders.models'
	];
	
	angular.module('app.orders.controllers', modules)

	.controller('OrderListCtrl', [
		'$scope', 'OrderService', 
		function($scope, OrderService)
		{
			function _getOrder()
			{
				$scope.getting = true;
				
				OrderService.findAll().then(function(orders) {
					$scope.orders = orders;
					$scope.getting = false;
				}, function(resp) {
					$scope.getting = false;
				});
			}

			function _init()
			{
				$scope.getOrder = _getOrder;

				_getOrder();
			}

			_init();
		}
	])
	;
})(angular);
(function(angular, undefined) {
	'use strict';
	
	var modules = [];
	
	angular.module('app.orders.models', modules)

	.factory('Order', [
		function()
		{
			function Order(data)
			{
				this.id = null;
				this.name = null;
				this.email = null;
				this.phone = null;

				if (data) {
					angular.extend(this, data);
				}
			}

			return Order;
		}
	])

	.service('OrderService', [
		'$q', 'HttpService', 'Order', 
		function ($q, HttpService, Order)
		{
			var url = 'orders';

			return {
				blank: function() {
					var deferred = $q.defer();

					var order = new Order();

					deferred.resolve(order);

					return deferred.promise;
				}, 
				findAll: function(data) 
				{
					var deferred = $q.defer();

					HttpService.get(url)
						.success(function(resp) 
						{
							var orders = []
								, count = resp.orders.length;

							for (var i = 0; i < count; i++)
							{
								orders.push(new Order(resp.orders[i]));
							}

							deferred.resolve(orders);
						})
						.error(function(resp) 
						{
							deferred.reject(resp);
						});

					return deferred.promise;
				}, 
				find: function(data) 
				{
					var deferred = $q.defer();

					HttpService.get(url + '/' + data.id)
						.success(function(resp) 
						{
							var order = new Order(resp.order);

							deferred.resolve(order);
						})
						.error(function(resp) 
						{
							deferred.reject(resp);
						});

					return deferred.promise;
				}, 
				save: function(data) 
				{
					var deferred = $q.defer();

					if (data.id)
					{
						HttpService.put(url + '/' + data.id, {order: data})
							.success(function(resp) 
							{
								var order = new Order(resp.order);
								
								deferred.resolve(order);
							})
							.error(function(resp) 
							{
								deferred.reject(resp.error);
							});
					}
					else
					{
						HttpService.post(url, {order: data})
							.success(function(resp) 
							{
								var order = new Order(resp.order);

								deferred.resolve(order);
							})
							.error(function(resp) 
							{
								deferred.reject(resp.error);
							});
					}

					return deferred.promise;
				}, 
				destroy: function(data) {
					var deferred = $q.defer();

					HttpService.delete(url + '/' + data.id)
						.success(function(resp) {
							deferred.resolve(resp);
						})
						.error(function(resp) {
							deferred.reject(resp);
						});

					return deferred.promise;
				}, 
			};
		}
	])
	;

})(angular);
(function(angular, undefined) {
	'use strict';
	
	var modules = [
		'app.orders.routes', 
		'app.orders.controllers', 
	];

	angular.module('app.orders', modules)
	
	;
})(angular);
(function(angular, undefined) {
	'use strict';

	var modules = [
		'ngRoute', 
	];

	angular.module('app.orders.routes', modules)

	.config(['$routeProvider', function($routeProvider) 
	{
		var path = '/partials/backend/orders/';

		$routeProvider
			.when('/orders', {
				templateUrl: path + 'index.html',
				controller: 'OrderListCtrl', 
			})
			;
	}])
	;
})(angular);
//# sourceMappingURL=app.js.map
