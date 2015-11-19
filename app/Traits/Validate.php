<?php

namespace App\Traits;

trait Validate
{
	protected $errors;

	protected static $rules = [];

	public function validate()
	{
		$validator = app('validator');

		$v = $validator->make($this->attributes, static::$rules);

		if ($v->passes()) return true;

		$this->setErrors($v->messages());

		return false;
	}

	protected function setErrors($errors)
	{
		$this->errors = $errors;
	}

	public function getErrors()
	{
		return $this->errors;
	}

	public function hasErrors()
	{
		return !empty($this->errors);
	}
}