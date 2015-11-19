<?php

namespace App\Entities\Api;

use App\Models\Company as Model;

class Company extends \App\Entities\BaseEntity
{
  protected $entity;

  public function __construct(Model $entity)
  {
    $this->entity = $entity;

    $this->attributes = [
      'id',
      'name',
      'description',
      'email',
      'phone',
      'location',
      'web',
      'logo',
      'bg',
      'start_at_hh',
      'end_at_hh',
      'days',
      'capacity_max',
      'extends_tables',
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

  public function email()
  {
    return $this->entity->email;
  }

  public function phone()
  {
    return $this->entity->phone;
  }

  public function location()
  {
    return $this->entity->location;
  }

  public function web()
  {
    return $this->entity->website;
  }

  public function logo()
  {
    return $this->entity->logo;
  }

  public function bg()
  {
    return $this->entity->background_image;
  }

  public function start_at_hh()
  {
    return $this->entity->start_at_hh;
  }

  public function end_at_hh()
  {
    return $this->entity->end_at_hh;
  }

  public function days()
  {
    return $this->entity->days;
  }

  public function capacity_max()
  {
    return $this->entity->capacity_max;
  }

  public function extends_tables()
  {
    return $this->entity->extends_tables;
  }

  public function status()
  {
    return $this->entity->status;
  }
}
