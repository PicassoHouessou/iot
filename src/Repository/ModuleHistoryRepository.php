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

    //    /**
    //     * @return ModuleHistory[] Returns an array of ModuleHistory objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('m')
    //            ->andWhere('m.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('m.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?ModuleHistory
    //    {
    //        return $this->createQueryBuilder('m')
    //            ->andWhere('m.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
