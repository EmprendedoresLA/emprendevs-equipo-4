<!DOCTYPE html>
<!--[if IE 9]><html class="ie9 no-focus"> <![endif]-->
<!--[if gt IE 9]><!--><html class="no-focus"><!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <title>Delix</title>
        <meta name="description" content="delix.co">
        <meta name="author" content="pixelcave">
        <meta name="robots" content="noindex, nofollow">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1.0">
        <base href="/">
        <link rel="shortcut icon" href="assets/img/favicons/favicon.png">
        <link rel="icon" type="image/png" href="assets/img/favicons/favicon-16x16.png" sizes="16x16">
        <link rel="icon" type="image/png" href="assets/img/favicons/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="assets/img/favicons/favicon-96x96.png" sizes="96x96">
        <link rel="icon" type="image/png" href="assets/img/favicons/favicon-160x160.png" sizes="160x160">
        <link rel="icon" type="image/png" href="assets/img/favicons/favicon-192x192.png" sizes="192x192">
        <link rel="apple-touch-icon" sizes="57x57" href="assets/img/favicons/apple-touch-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="assets/img/favicons/apple-touch-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="assets/img/favicons/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="assets/img/favicons/apple-touch-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="assets/img/favicons/apple-touch-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="assets/img/favicons/apple-touch-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="assets/img/favicons/apple-touch-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="assets/img/favicons/apple-touch-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="assets/img/favicons/apple-touch-icon-180x180.png">
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400italic,600,700%7COpen+Sans:300,400,400italic,600,700">
        <link rel="stylesheet" id="css-main" href="/css/backend/app.css">
        <script>
        </script>
    </head>
    <body ng-controller="AppCtrl">
        <div id="page-container" class="sidebar-l sidebar-o side-scroll header-navbar-fixed">
            <aside id="side-overlay">
                <div id="side-overlay-scroll">
                    <div class="side-header side-content">
                        <button class="btn btn-default pull-right" type="button" data-toggle="layout" data-action="side_overlay_close">
                            <i class="fa fa-times"></i>
                        </button>
                        <span>
                            <img class="img-avatar img-avatar32" src="/images/backend/default-avatar.png" alt="">
                            <span class="font-w600 push-10-l">[[ $user->business_name ]]</span>
                        </span>
                    </div>
                    <div class="side-content remove-padding-t">
                        <div class="block pull-r-l">
                            <div class="block-header bg-gray-lighter">
                                <ul class="block-options">
                                    <li>
                                        <button type="button" data-toggle="block-option" data-action="content_toggle"></button>
                                    </li>
                                </ul>
                                <h3 class="block-title">Actividad Reciente</h3>
                            </div>
                            <div class="block-content">
                                <ul class="list list-activity">
                                    <li ng-repeat="event in events">
                                        <i class="{{event.icon}}"></i>
                                        <div class="font-w600">{{event.title}}</div>
                                        <div>{{event.body}}</div>
                                        <div><small class="text-muted">{{event.created_at | date}}</small></div>
                                    </li>
                                </ul>
                                <div class="text-center">
                                    <small class="ng-hide" ng-show="events.length > 10"><a href="javascript:void(0)">Ver más...</a></small>
                                    <small class="ng-hide" ng-show="events.length == 0">No hay actividad</small>
                                </div>
                            </div>
                        </div>
                        <div class="block pull-r-l">
                            <div class="block-header bg-gray-lighter">
                                <ul class="block-options">
                                    <li>
                                        <button type="button" data-toggle="block-option" data-action="content_toggle"></button>
                                    </li>
                                </ul>
                                <h3 class="block-title">Clientes Online</h3>
                            </div>
                            <div class="block-content">
                                <ul class="nav-users" ng-hide="onlineClients.lengths == 0">
                                    <li ng-repeat="client in onlineClients">
                                        <a href="base_pages_profile.html">
                                            <img class="img-avatar" src="/images/backend/default-avatar.png" alt="">
                                            <i class="fa fa-circle text-success"></i> {{client.name}}
                                            <div class="font-w400 text-muted"><small>{{client.resto_name}}</small></div>
                                        </a>
                                    </li>
                                </ul>
                                <div class="ng-hide text-center" ng-show="onlineClients.lengths == 0">
                                    <small>No hay clientes online</small>
                                </div>
                            </div>
                        </div>
                        <div class="block pull-r-l block-opt-hidden">
                            <div class="block-header bg-gray-lighter">
                                <ul class="block-options">
                                    <li>
                                        <button type="button" data-toggle="block-option" data-action="content_toggle"></button>
                                    </li>
                                </ul>
                                <h3 class="block-title">Configuración</h3>
                            </div>
                            <div class="block-content">
                                <form class="form-bordered" action="index.html" method="post" onsubmit="return false;">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-xs-8">
                                                <div class="font-s13 font-w600">Estado Online</div>
                                                <div class="font-s13 font-w400 text-muted">Mostrar mi estado a todos</div>
                                            </div>
                                            <div class="col-xs-4 text-right">
                                                <label class="css-input switch switch-sm switch-primary push-10-t">
                                                    <input type="checkbox"><span></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-xs-8">
                                                <div class="font-s13 font-w600">Notificaciones</div>
                                                <div class="font-s13 font-w400 text-muted">Activar notificaciones</div>
                                            </div>
                                            <div class="col-xs-4 text-right">
                                                <label class="css-input switch switch-sm switch-primary push-10-t">
                                                    <input type="checkbox" checked><span></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <nav id="sidebar">
                <div id="sidebar-scroll">
                    <div class="sidebar-content">
                        <div class="side-header side-content side-header-bg">
                            <button class="btn btn-link text-gray pull-right hidden-md hidden-lg" type="button" data-toggle="layout" data-action="sidebar_close">
                                <i class="fa fa-times"></i>
                            </button>
                            <div class="btn-group pull-right">
                                <button class="btn btn-link text-gray dropdown-toggle" data-toggle="dropdown" type="button">
                                    <i class="si si-settings"></i>
                                </butto n>
                                <ul class="dropdown-menu dropdown-menu-right font-s13 sidebar-mini-hide">
                                    <li>
                                        <a data-toggle="theme" data-theme="default" tabindex="-1" href="javascript:void(0)">
                                            <i class="fa fa-circle text-default pull-right"></i> <span class="font-w600">Default</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <a class="h5 text-white" href="index.html">
                                <span class="h4 font-w600 sidebar-mini-hide">[[ $user->business_name ]]</span>
                            </a>
                        </div>
                        <div class="side-content">
                            <ul class="nav-main">
                                <li>
                                    <a ng-href="/admin/#/dashboard"><i class="fa fa-bar-chart-o fa-fw"></i><span class="sidebar-mini-hide">Dashboard</span></a>
                                </li>
                                <li>
                                    <a ng-href="/admin/#/calendar"><i class="fa fa-calendar-o fa-fw"></i><span class="sidebar-mini-hide">Calendario</span></a>
                                </li>
                                <li>
                                    <a ng-href="/admin/#/orders"><i class="fa fa-usd fa-fw"></i><span class="sidebar-mini-hide">Reservas</span></a>
                                </li>
                                <li>
                                    <a ng-href="/admin/#/customers"><i class="fa fa-users fa-fw"></i><span class="sidebar-mini-hide">Clientes</span></a>
                                </li>
                                <li>
                                    <a ng-href="/admin/#/experiences"><i class="fa fa-glass fa-fw"></i><span class="sidebar-mini-hide">Experiencias</span></a>
                                </li>
                                <li>
                                    <a ng-href="/admin/#/company"><i class="fa fa-cog fa-fw"></i><span class="sidebar-mini-hide">Configuración</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <header id="header-navbar" class="content-mini content-mini-full">
                <ul class="nav-header pull-right">
                    <li>
                        <div class="btn-group">
                            <button class="btn btn-default btn-image dropdown-toggle" data-toggle="dropdown" type="button">
                            <img src="/images/backend/default-avatar.png" alt="">
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li class="dropdown-header">Perfil</li>
                                <li>
                                    <a tabindex="-1" href="base_pages_inbox.html">
                                        <i class="si si-envelope-open pull-right"></i>
                                        <span class="badge badge-primary pull-right">3</span>Mensajes
                                    </a>
                                </li>
                                <li>
                                    <a tabindex="-1" href="base_pages_profile.html">
                                        <i class="si si-user pull-right"></i>
                                        <span class="badge badge-success pull-right">1</span>Mi Cuenta
                                    </a>
                                </li>
                                <li>
                                    <a tabindex="-1" href="javascript:void(0)">
                                        <i class="si si-settings pull-right"></i>Configuración
                                    </a>
                                </li>
                                <li class="divider"></li>
                                <li class="dropdown-header">Acciones</li>
                                <li>
                                    <a tabindex="-1" href="/auth/logout">
                                        <i class="si si-lock pull-right"></i>Bloquear
                                    </a>
                                </li>
                                <li>
                                    <a tabindex="-1" ng-href="/auth/logout">
                                        <i class="si si-logout pull-right"></i>Salir
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <button class="btn btn-default" data-toggle="layout" data-action="side_overlay_toggle" type="button">
                            <i class="fa fa-tasks"></i>
                        </button>
                    </li>
                </ul>
                <ul class="nav-header pull-left">
                    <li class="hidden-md hidden-lg">
                        <button class="btn btn-default" data-toggle="layout" data-action="sidebar_toggle" type="button">
                            <i class="fa fa-navicon"></i>
                        </button>
                    </li>
                    <li class="hidden-xs hidden-sm">
                        <button class="btn btn-default" data-toggle="layout" data-action="sidebar_mini_toggle" type="button">
                            <i class="fa fa-ellipsis-v"></i>
                        </button>
                    </li>
                    <li class="ng-hide">
                        <button class="btn btn-default pull-right" data-toggle="modal" data-target="#apps-modal" type="button">
                            <i class="si si-grid"></i>
                        </button>
                    </li>
                    <li class="visible-xs">
                        <button class="btn btn-default" data-toggle="class-toggle" data-target=".js-header-search" data-class="header-search-xs-visible" type="button">
                            <i class="fa fa-search"></i>
                        </button>
                    </li>
                    <li class="js-header-search header-search">
                        <form class="form-horizontal" action="base_pages_search.html" method="post">
                            <div class="form-material form-material-primary input-group remove-margin-t remove-margin-b">
                                <input class="form-control" type="text" id="base-material-text" name="base-material-text" placeholder="Buscar..">
                                <span class="input-group-addon"><i class="si si-magnifier"></i></span>
                            </div>
                        </form>
                    </li>
                </ul>
            </header>
            <main id="main-container" ng-view>loading...</main>
        </div>
        <script src="/js/backend/app-libs.js"></script>
        <script src="/js/backend/app.js"></script>
        <script>
            angular.bootstrap(document, ['App']);
        </script>
    </body>
</html>