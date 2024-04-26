<?php

namespace App\Entity;

use App\Repository\ModuleRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ModuleRepository::class)]
class Module
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;




    #[ORM\Column(type: "string", length: 255)]
    private string $name;

    #[ORM\Column(type: "text", nullable: true)]
    private ?string $description;

    #[ORM\Column(type: "string", length: 255)]
    private string $status;

    #[ORM\Column(type: "float", nullable: true)]
    private ?float $lastMeasuredValue;

    #[ORM\Column(type: "datetime")]
    private \DateTimeInterface $createdAt;

    #[ORM\Column(type: "datetime")]
    private \DateTimeInterface $updatedAt;

    public function getId(): ?int
    {
        return $this->id;
    }
    #[ORM\OneToMany(targetEntity:ModuleHistory::class, mappedBy:"module")]

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
}
