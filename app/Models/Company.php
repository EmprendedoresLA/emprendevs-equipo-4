<?php

namespace App\Models;

use Jenssegers\Mongodb\Model;

use App\Traits\Validate;

class Company extends Model
{
  use Validate;

  protected $fillable = [
    'name',
    'description',
    'email',
    'phone',
    'location',
    'website',
    'logo',
    'background_image',
    'start_at_hh',
    'end_at_hh',
    'days',
    'capacity_max',
    'extends_tables'
  ];

  public function __construct(array $attributes = [])
  {
    $this->attributes['status'] = true;

    static::$rules = array_add(static::$rules, 'name', 'required|max:100');
    // static::$rules = array_add(static::$rules, 'description', 'required|max:100');
    // static::$rules = array_add(static::$rules, 'phone', 'required|max:100');
    // static::$rules = array_add(static::$rules, 'email', 'required');
    // static::$rules = array_add(static::$rules, 'location', 'required');
    // static::$rules = array_add(static::$rules, 'website', 'required');
    // static::$rules = array_add(static::$rules, 'logo', 'required|mimes:jpeg,bmp,png,jpg');
    // static::$rules = array_add(static::$rules, 'background_image', 'required|mimes:jpeg,bmp,png,jpg');
    // static::$rules = array_add(static::$rules, 'start_at_hh', 'required');
    // static::$rules = array_add(static::$rules, 'end_at_hh', 'required');
    // static::$rules = array_add(static::$rules, 'days', 'required');
    // static::$rules = array_add(static::$rules, 'capacity_max', 'required');
    // static::$rules = array_add(static::$rules, 'extends_tables', '');

    parent::__construct($attributes);
  }
}
