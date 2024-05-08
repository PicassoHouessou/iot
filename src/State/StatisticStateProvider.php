<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Module;
use App\Entity\ModuleHistory;
use App\Entity\ModuleStatus;
use App\Entity\ModuleType;
use App\Entity\Statistic;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class StatisticStateProvider implements ProviderInterface
{
    public function __construct(
        private EntityManagerInterface $manager,
    )
    {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $statistic = new Statistic();

        $statistic->totalUsers = $this->manager->getRepository(User::class)->count();
        $statistic->totalModules = $this->manager->getRepository(Module::class)->count();
        $statistic->totalModuleHistories = $this->manager->getRepository(ModuleHistory::class)->count();
        $statistic->totalModuleStatuses = $this->manager->getRepository(ModuleStatus::class)->count();
        $statistic->totalModuleTypes = $this->manager->getRepository(ModuleType::class)->count();

        dump($statistic);
        return $statistic;
    }
}
