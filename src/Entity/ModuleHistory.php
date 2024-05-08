<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\ModuleHistoryRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new Get(),
        new Put(),
        new Patch(),
        new Delete(),
        new GetCollection(),
        new Post(),
    ],
    normalizationContext: ['groups' => ['module_history:read']],
    denormalizationContext: ['groups' => ['module_history:write']],
    paginationClientEnabled: true,
    paginationClientItemsPerPage: true,
    paginationEnabled: true,
)]
#[ApiFilter(filterClass: OrderFilter::class, properties: ['id', 'name', 'slug'])]
#[ApiFilter(filterClass: SearchFilter::class, properties: ['id' => 'exact', 'value' => 'partial', 'module' => 'exact', 'status' => 'exact'])]
#[ApiFilter(DateFilter::class, properties: ['createdAt'])]
#[ORM\HasLifecycleCallbacks]
#[ORM\Entity(repositoryClass: ModuleHistoryRepository::class)]
class ModuleHistory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;


    #[ORM\ManyToOne(targetEntity: Module::class, inversedBy: "histories")]
    #[Groups(["module_history:read", "module_history:write"])]
    private ?Module $module = null;

    #[ORM\ManyToOne(targetEntity: ModuleStatus::class)]
    #[Groups(["module_history:read", "module_history:write"])]
    private ?ModuleStatus $status = null;

    #[ORM\Column(type: Types::FLOAT, nullable: true)]
    #[Groups(["module_history:read", "module_history:write"])]
    private ?float $value = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(["module_history:read"])]
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
