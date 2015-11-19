<?php

namespace App\Entities;

class BaseEntity
{
	protected $attributes;

	public function toArray(array $options = [])
	{
		if (isset($options['attributes']))
		{
			$this->attributes = array_intersect($this->attributes, $options['attributes']);
		}

		$attributes = [];

		foreach ($this->attributes as $k => $v) {
			$attributes[$v] = $this->$v();
		}

		return $attributes;
	}

	public function toJson()
	{
		return json_encode($this->toArray());
	}

	public function __toString()
	{
		return $this->toJson();
	}

	public function created_at()
	{
		return $this->entity->created_at->toIso8601String();
	}

	public function updated_at()
	{
		return $this->entity->updated_at->toIso8601String();
	}


}