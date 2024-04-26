<?php

namespace App\Entity;

use App\Repository\ModuleStatusRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ModuleStatusRepository::class)]
#[UniqueEntity("name")]
#[UniqueEntity("slug")]
class ModuleStatus
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    #[ORM\Column(type: "string", length: 255, unique: true)]
    #[Assert\Length(max: 255)]
    private string $name;

    #[ORM\Column(type: "string", length: 255, unique: true)]
    #[Assert\Length(max: 255)]
    private string $slug;

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

    public function getSlug(): string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;
        return $this;

    }
}
