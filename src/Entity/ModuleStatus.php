<?php

namespace App\Entity;

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
use App\Repository\ModuleStatusRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    operations: [
        new Get(security: 'is_granted(\'view\',object)'),
        new Put(security: 'is_granted(\'edit\',object)'),
        new Delete(security: 'is_granted(\'edit\',object)'),
        new Patch,
        new GetCollection(),
        new Post(),
    ],
    normalizationContext: ['groups' => ['module_type:read']],
    denormalizationContext: ['groups' => ['module_type:write']],
    paginationClientEnabled: true,
    paginationClientItemsPerPage: true,
    paginationEnabled: true,
)]
#[ORM\HasLifecycleCallbacks]
#[ApiFilter(filterClass: OrderFilter::class, properties: ['id', 'name', 'slug'])]
#[ApiFilter(filterClass: SearchFilter::class, properties: ['id' => 'exact', 'name' => 'partial', 'slug' => 'partial'])]
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