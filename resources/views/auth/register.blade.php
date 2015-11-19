@extends('auth.layout')

@section('content')
<div class="content overflow-hidden">
    <div class="row">
        <div class="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
            <div class="block block-rounded block-themed animated fadeIn">
                <div class="block-content block-content-narrow">
                    <div class="text-center">
                        <img src="/images/logo2.png" width="200">
                    </div>
                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>[[ $error ]]</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                    <form class="js-validation-register form-horizontal push-30-t" action="/auth/register" method="post">
                        <div class="form-group">
                            <div class="col-xs-12">
                                <div class="form-material form-material-success">
                                    <input class="form-control" type="text" id="name" name="name" placeholder="Nombre del restaurante" value="[[ @old('name') ]]">
                                    <label for="name">Nombre del Restaurante</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <div class="form-material form-material-success">
                                    <input class="form-control" type="email" id="email" name="email" placeholder="Ingrese su email" value="[[ @old('email') ]]">
                                    <label for="email">Su email</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <div class="form-material form-material-success">
                                    <input class="form-control" type="password" id="password" name="password" placeholder="Ingrese una contraseña" value="">
                                    <label for="password">Su contraseña</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <label class="css-input switch switch-sm switch-success">
                                    <input type="checkbox" id="register-terms" name="register-terms"><span></span> Accepto las condiciones de uso
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-block btn-success" type="submit"><i class="fa fa-plus pull-right"></i> Crear Cuenta</button>
                        </div>
                        <input type="hidden" name="_token" value="[[ csrf_token() ]]">
                    </form>
                </div>
            </div>
            <p class="text-center"><a href="/auth/login">¿Ya está registrado? Login</a></p>
        </div>
    </div>
</div>
@stop