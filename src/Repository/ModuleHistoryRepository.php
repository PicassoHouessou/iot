<?php

namespace App\Repository;

use App\Entity\ModuleHistory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ModuleHistory>
 *
 * @method ModuleHistory|null find($id, $lockMode = null, $lockVersion = null)
 * @method ModuleHistory|null findOneBy(array $criteria, array $orderBy = null)
 * @method ModuleHistory[]    findAll()
 * @method ModuleHistory[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ModuleHistoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ModuleHistory::class);
    }

    public function findCreatedBetween(\DateTimeInterface $startDate, \DateTimeInterface $endDate): array
    {
        $qb = $this->createQueryBuilder('u')
            ->where('u.createdAt BETWEEN :startDate AND :endDate')
            ->setParameter('startDate', $startDate)
            ->setParameter('endDate', $endDate);

        return $qb->getQuery()->getResult();
    }

}
