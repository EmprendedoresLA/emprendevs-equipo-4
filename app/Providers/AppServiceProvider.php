<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use Blade;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {        
        // $this->app->bind(
        //     '\Auth0\Login\Contract\Auth0UserRepository',
        //     '\Auth0\Login\Repository\Auth0UserRepository');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        Blade::setRawTags('[!!', '!!]');
        Blade::setContentTags('[[', ']]');
        Blade::setEscapedContentTags('[[[', ']]]');
    }
}
