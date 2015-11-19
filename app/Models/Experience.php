<?php

namespace App\Models;

use Jenssegers\Mongodb\Model;

use App\Traits\Validate;

class Experience extends Model
{
	use Validate;

	protected $fillable = [
		'name', 
		'description', 
		'price'
	];

	public function __construct(array $attributes = [])
	{
		$this->attributes['status'] = true;

		static::$rules = array_add(static::$rules, 'name', 'required|max:255');
		static::$rules = array_add(static::$rules, 'price', 'required|numeric|min:0');

		parent::__construct($attributes);
	}
}
