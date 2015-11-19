<?php

namespace App\Entities\Api;

use App\Models\Customer as Model;

class Customer extends \App\Entities\BaseEntity
{
	protected $entity;

	public function __construct(Model $entity)
	{
		$this->entity = $entity;

		$this->attributes = [
			'id', 
			'name', 
			'first_name', 
			'last_name', 
			'email', 
			'phone', 
			'status', 
			'created_at', 
			'updated_at', 
		];

	}

	public function id()
	{
		return $this->entity->_id;
	}

	public function name()
	{
		if ($this->first_name() && $this->last_name())
			return $this->first_name() . ' ' .$this->last_name();
		elseif (!$this->first_name() && $this->last_name())
			return $this->last_name();
		else
			return $this->first_name();
	}

	public function first_name()
	{
		return $this->entity->first_name;
	}

	public function last_name()
	{
		return $this->entity->last_name;
	}

	public function email()
	{
		return $this->entity->email;
	}

	public function phone()
	{
		return $this->entity->phone;
	}

	public function status()
	{
		return $this->entity->status;
	}
}
