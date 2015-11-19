<?php

namespace App\Entities\Api;

use App\Models\Experience as Model;

class Experience extends \App\Entities\BaseEntity
{
	protected $entity;

	public function __construct(Model $entity)
	{
		$this->entity = $entity;

		$this->attributes = [
			'id', 
			'name', 
			'description', 
			'price', 
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
		return $this->entity->name;
	}

	public function description()
	{
		return $this->entity->description;
	}

	public function price()
	{
		return $this->entity->price;
	}

	public function status()
	{
		return $this->entity->status;
	}
}
