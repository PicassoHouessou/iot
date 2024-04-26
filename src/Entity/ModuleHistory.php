<?php

namespace App\Entity;

use App\Repository\ModuleHistoryRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\HasLifecycleCallbacks]
#[ORM\Entity(repositoryClass: ModuleHistoryRepository::class)]
class ModuleHistory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    private ?Module $module = null;

    #[ORM\ManyToOne(targetEntity: ModuleStatus::class)]
    private ?ModuleStatus $status = null;

    #[ORM\Column(type: Types::FLOAT, nullable: true)]
    private ?float $value = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $createdAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getModule(): ?Module
    {
        return $this->module;
    }

    public function setModule(?Module $module): self
    {
        $this->module = $module;
        return $this;
    }

    public function getStatus(): ?ModuleStatus
    {
        return $this->status;
    }

    public function setStatus(?ModuleStatus $status): self
    {
        $this->status = $status;
        return $this;
    }

    public function getValue(): ?float
    {
        return $this->value;
    }

    public function setValue(?float $value): void
    {
        $this->value = $value;
    }


    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }


    #[ORM\PrePersist]
    public function updatedTimestamps(): void
    {
        if ($this->getCreatedAt() === null) {
            $this->createdAt = new \DateTime('now');
        }

    }
}
