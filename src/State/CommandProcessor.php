<?php
// api/src/State/BlogPostProcessor.php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\ApiResource\Command;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\HttpKernel\KernelInterface;

/**
 * @implements ProcessorInterface<Command, Command|void>
 */
final class CommandProcessor implements ProcessorInterface
{
    public function __construct(private KernelInterface $kernel
    )
    {
    }

    /**
     * @return Command|void
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        // Create input and output for the command
        $input = new ArrayInput([]);
        $output = new BufferedOutput(OutputInterface::VERBOSITY_NORMAL, true);

        // Find the command
        $simulateCommand = $this->kernel->getContainer()->get('console.command_loader')->get('app:module:simulate');

        // Run the command
        $simulateCommand->run($input, $output);
        // call your persistence layer to save $data
        return $data;
    }
}
