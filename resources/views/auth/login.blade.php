@extends('auth.layout')

@section('content')
<div class="content overflow-hidden">
    <div class="row">
        <div class="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
            <div class="block block-rounded animated fadeIn">
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
                    <form class="js-validation-login form-horizontal push-30-t" action="/auth/login" method="post">
                        <div class="form-group">
                            <div class="col-xs-12">
                                <div class="form-material form-material-primary floating">
                                    <input class="form-control" type="email" id="email" name="email" value="[[ @old('email') ]]">
                                    <label for="email">Su email</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <div class="form-material form-material-primary floating">
                                    <input class="form-control" type="password" id="password" name="password" value="">
                                    <label for="password">Su contraseña</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <label class="css-input switch switch-sm switch-primary">
                                    <input type="checkbox" id="login-remember-me" name="login-remember-me"><span></span> Recordarme
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-block btn-primary" type="submit"><i class="si si-login pull-right"></i> Ingresar</button>
                        </div>
                        <input type="hidden" name="_token" value="[[ csrf_token() ]]">
                    </form>
                </div>
            </div>
            <p class="text-center"><a href="/auth/register">¿Aún no tiene cuenta? Regístrese</a></p>
        </div>
    </div>
</div>
@stop