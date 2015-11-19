<?php

namespace App\Models;

use Jenssegers\Mongodb\Model;

use App\Traits\Validate;

class Customer extends Model
{
	use Validate;

	protected $fillable = [
		'first_name', 
		'last_name', 
		'email', 
		'phone', 
	];

	public function __construct(array $attributes = [])
	{
		$this->attributes['status'] = true;

		static::$rules = array_add(static::$rules, 'first_name', 'required|max:100');
		static::$rules = array_add(static::$rules, 'phone', 'required|max:100');
		static::$rules = array_add(static::$rules, 'email', 'required|email|max:100');

		parent::__construct($attributes);
	}

	/**
	 * Customer has many orders
	 */
	public function orders()
	{
		return $this->hasMany(Order::class);
	}
}
