<?php

namespace App\Entities\Api;

use App\Models\Order as Model;

class Order extends \App\Entities\BaseEntity
{
	protected $entity;

	public function __construct(Model $entity)
	{
		$this->entity = $entity;

		$this->attributes = [
			'id', 
			'date', 
			'total', 
			'status', 
			'customer_id', 
			'experience_id', 
			'created_at', 
			'updated_at', 
		];
	}

	public function toArray(array $options = [])
	{
		$attributes = parent::toArray();

		$experience = $this->entity->experience()->first();

		if (!$experience)
			$attributes['experience'] = null;
		else
		{
			$experience = new Experience($experience);
			$attributes['experience'] = $experience->toArray();
		}

		$customer = $this->entity->customer()->first();

		if (!$customer)
			$attributes['customer'] = null;
		else
		{
			$customer = new Customer($customer);
			$attributes['customer'] = $customer->toArray();
		}

		return $attributes;
	}

	public function id()
	{
		return $this->entity->_id;
	}

	public function date()
	{
		return $this->entity->date->toIso8601String();
	}

	public function total()
	{
		return $this->entity->total;
	}

	public function status()
	{
		return $this->entity->status;
	}

	public function experience_id()
	{
		return $this->entity->experience_id;
	}

	public function customer_id()
	{
		return $this->entity->customer_id;
	}
}
