<?php

namespace App\Command;

use App\Entity\Module;
use App\Entity\ModuleHistory;
use App\Entity\ModuleStatus;
use Doctrine\ORM\EntityManagerInterface;
use Faker\Factory;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:module:simulate',
    description: 'Add a short description for your command',
)]
class ModuleSimulateCommand extends Command
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description');
    }


    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $faker = Factory::create();

        $modules = $this->entityManager->getRepository(Module::class)->findAll();

        $statuses = $this->entityManager->getRepository(ModuleStatus::class)->findAll();
        foreach ($modules as $module) {
            $output->writeln('<info>Début de simulation du module :' . $module->getName() . "</info>");
            $type = $module->getType();

            for ($i = 1; $i <= $faker->numberBetween(2, 10); $i++) {
                $value = $faker->randomFloat(2, $type->getMinValue() ?? 0, $type->getMaxValue() ?? 100);
                $status = $faker->randomElement($statuses);
                $moduleHistory = new ModuleHistory();
                $moduleHistory->setModule($module);
                $moduleHistory->setValue($value);
                $moduleHistory->setStatus($status);
                $this->entityManager->persist($moduleHistory);
                $output->writeln("Ajout d'un historique ayant le statut :" . $status->getName());
            }
            $this->entityManager->flush();
            $output->writeln('<info>Fin de simulation du module :' . $module->getName() . '</info>');
        }


        $output->writeln('<info>Les modules ont été simulés</info>');

        return Command::SUCCESS;
    }
}
