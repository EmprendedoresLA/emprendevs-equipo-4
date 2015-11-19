<?php

namespace App\Entities\Api;

use App\Models\Ticket as Model;

class Ticket extends \App\Entities\BaseEntity
{
	protected $entity;

	public function __construct(Model $entity)
	{
		$this->entity = $entity;

		$this->attributes = [
			'id', 
			'number', 
			'experience_id', 
			'created_at', 
			'updated_at', 
		];

	}

	public function id()
	{
		return $this->entity->_id;
	}

	public function number()
	{
		return $this->entity->number;
	}

	public function experience_id()
	{
		return $this->entity->experience_id;
	}
}
