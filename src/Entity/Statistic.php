<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\State\StatisticStateProvider;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(provider: StatisticStateProvider::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
    ],
    normalizationContext: ['groups' => ['statistic:read']],
    paginationEnabled: false,
)]
#[ORM\HasLifecycleCallbacks]
class Statistic
{
    #[Groups(["statistic:read"])]
    #[ApiProperty(identifier: true)]
    public $date;

    #[Groups(["statistic:read", "statistic:write"])]
    public int $name;

    #[Assert\Length(max: 255)]
    #[Groups(["statistic:read"])]
    public int $totalModules;
    #[Groups(["statistic:read"])]
    public int $totalModuleStatuses;
    #[Groups(["statistic:read"])]
    public int $totalModuleTypes;
    #[Groups(["statistic:read"])]
    public int $totalModuleHistories;
    #[Groups(["statistic:read"])]
    public int $totalUsers;

    public function __construct()
    {
        $this->date = new \DateTime();
    }


}