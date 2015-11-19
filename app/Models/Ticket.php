<?php

namespace App\Models;

use Jenssegers\Mongodb\Model;

use App\Traits\Validate;

class Ticket extends Model
{
	use Validate;

	protected $fillable = [
		'number', 
		'order_id', 
	];

	public function __construct(array $attributes = [])
	{
		parent::__construct($attributes);
	}
}
