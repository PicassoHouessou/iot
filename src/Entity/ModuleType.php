<?php

namespace App\Entity;

use App\Repository\ModuleTypeRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ModuleTypeRepository::class)]
class ModuleType
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::STRING, length: 255)]
    #[Assert\NotBlank]
    private string $name;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\Length(max: 5000)]
    private string $description;

    #[ORM\Column(type: Types::STRING, length: 50)]
    #[Assert\Length(max: 50)]
    private string $unitOfMeasure;

    #[ORM\Column(type: Types::TEXT, length: 5000)]
    #[Assert\Length(max: 5000)]
    private string $unitDescription;

    #[ORM\Column(type: Types::FLOAT, nullable: true)]
    private ?float $minValue = null;

    #[ORM\Column(type: Types::FLOAT, nullable: true)]
    private ?float $maxValue = null;

    private string $max;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getUnitOfMeasure(): string
    {
        return $this->unitOfMeasure;
    }

    public function setUnitOfMeasure(string $unitOfMeasure): self
    {
        $this->unitOfMeasure = $unitOfMeasure;
        return $this;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function getUnitDescription(): string
    {
        return $this->unitDescription;
    }

    public function setUnitDescription(string $unitDescription): self
    {
        $this->unitDescription = $unitDescription;
        return $this;
    }

    public function getMinValue(): ?float
    {
        return $this->minValue;
    }

    public function setMinValue(?float $minValue): void
    {
        $this->minValue = $minValue;
    }

    public function getMaxValue(): ?float
    {
        return $this->maxValue;
    }

    public function setMaxValue(?float $maxValue): void
    {
        $this->maxValue = $maxValue;
    }

}
