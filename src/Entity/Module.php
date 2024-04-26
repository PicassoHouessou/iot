<?php

namespace App\Entity;

use App\Repository\ModuleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\HasLifecycleCallbacks]
#[ORM\Entity(repositoryClass: ModuleRepository::class)]
class Module
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    #[ORM\Column(type: Types::STRING, length: 255)]
    private string $name;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description;


    #[ORM\ManyToOne(targetEntity: ModuleType::class)]
    private ?ModuleType $type = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $createdAt = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $updatedAt = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    #[ORM\OneToMany(targetEntity: ModuleHistory::class, mappedBy: "module")]
    private Collection $histories;

    public function __construct()
    {
        $this->histories = new ArrayCollection();
    }

    /**
     * @return Collection|ModuleHistory[]
     */
    public function getHistories(): Collection
    {
        return $this->histories;
    }

    public function addHistory(ModuleHistory $history): self
    {
        if (!$this->histories->contains($history)) {
            $this->histories[] = $history;
            $history->setModule($this);
        }

        return $this;
    }

    public function removeHistory(ModuleHistory $history): self
    {
        if ($this->histories->removeElement($history)) {
            // set the owning side to null (unless already changed)
            if ($history->getModule() === $this) {
                $history->setModule(null);
            }
        }

        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function getType(): ?ModuleType
    {
        return $this->type;
    }

    public function setType(?ModuleType $type): self
    {
        $this->type = $type;
        return $this;
    }


    #[ORM\PrePersist]
    #[ORM\PreUpdate]
    public function updatedTimestamps(): void
    {
        $this->updatedAt = new \DateTime('now');
        if ($this->getCreatedAt() === null) {
            $this->createdAt = new \DateTime('now');
        }
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }


}
