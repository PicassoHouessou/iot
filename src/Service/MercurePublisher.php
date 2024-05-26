<?php

namespace App\Service;

use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;


class MercurePublisher
{
    const OPERATION_NEW = "NEW";
    const OPERATION_UPDATE = "UPDATE";
    const OPERATION_DELETE = "DELETE";

    public function __construct(private HubInterface $hub)
    {

    }

    public function publishUpdate($entity, string $topic): void
    {
        $update = new Update(
            $topic,
            json_encode($entity),
        );
        $this->hub->publish($update);
    }
}
