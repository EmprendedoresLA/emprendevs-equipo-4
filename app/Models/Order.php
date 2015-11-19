<?php

namespace App\Models;

use Jenssegers\Mongodb\Model;

use App\Traits\Validate;

class Order extends Model
{
	use Validate;

	protected $fillable = [
		'date', 
		'total',
		'status', 
		'experience_id',  
		'customer_id',  
	];

	protected $dates = [
		'date', 
	];

	public function __construct(array $attributes = [])
	{
		$this->attributes['status'] = true;

		static::$rules = array_add(static::$rules, 'date', 'required|max:255');
		static::$rules = array_add(static::$rules, 'total', 'required|numeric|min:0');
		static::$rules = array_add(static::$rules, 'experience_id', 'required|numeric|min:0');

		parent::__construct($attributes);
	}

	/**
	 * One order has one experience
	 */
	public function experience()
	{
		return $this->hasOne(Experience::class);
	}

	/**
	 * One order has one customer
	 */
	public function customer()
	{
		return $this->hasOne(Customer::class);
	}

	/**
	 * Order has many tickets
	 */
	public function tickets()
	{
		return $this->hasMany(Ticket::class);
	}
}
