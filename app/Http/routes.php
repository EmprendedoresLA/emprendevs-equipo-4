<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/admin', ['middleware' => 'auth', 'uses' => 'Backend\\AdminController@index']);

Route::get('/auth/login', 'Auth\\AuthController@getLogin');
Route::post('/auth/login', 'Auth\\AuthController@postLogin');

Route::get('/auth/register', 'Auth\\AuthController@getRegister');
Route::post('/auth/register', 'Auth\\AuthController@postRegister');

Route::get('/auth/logout', 'Auth\\AuthController@logout');

Route::get('/', function() {
  return view('welcome');
});

Route::group(['prefix' => 'v1', 'namespace' => 'Backend'], function ()
{
  Route::get('restaurant', function() {
    $company = App\Models\Company::first();

    if (!$company) return response()->json([], 404);

    $company = new App\Entities\Api\Company($company);

    return response()->json($company->toArray());
  });

  Route::get('calendar', function() {
    $data = [];

    return response()->json($data);
  });

  Route::get('calendar/backend', function() {
    $data = [
      ['id' => '1', 'title' => 'tets 1', 'start' => \Carbon\Carbon::now()->toISO8601String(), 'end' => \Carbon\Carbon::now()->addHour()->toISO8601String()], 
      ['id' => '2', 'title' => 'tets 2', 'start' => \Carbon\Carbon::now()->toISO8601String(), 'end' => \Carbon\Carbon::now()->addHour()->toISO8601String()], 
    ];

    return response()->json($data);
  });

  Route::group(['prefix' => 'customers'], function()
  {
    Route::get('', 'CustomerController@index');
    Route::post('', 'CustomerController@store');
    Route::get('{id}', 'CustomerController@show');
    Route::put('{id}', 'CustomerController@update');
    Route::delete('{id}', 'CustomerController@destroy');
  });

  Route::group(['prefix' => 'experiences'], function()
  {
    Route::get('', 'ExperienceController@index');
    Route::post('', 'ExperienceController@store');
    Route::get('{id}', 'ExperienceController@show');
    Route::put('{id}', 'ExperienceController@update');
    Route::delete('{id}', 'ExperienceController@destroy');
  });

  Route::group(['prefix' => 'orders'], function()
  {
    Route::get('', 'OrderController@index');
    Route::post('', 'OrderController@store');
    Route::get('{id}', 'OrderController@show');
    Route::put('{id}', 'OrderController@update');
    Route::delete('{id}', 'OrderController@destroy');
  });

  Route::group(['prefix' => 'company'], function() {
    Route::get('', 'CompanyController@index');
    Route::post('', 'CompanyController@store');
    Route::get('{id}', 'CompanyController@show');
    Route::put('{id}', 'CompanyController@update');
  });

});
