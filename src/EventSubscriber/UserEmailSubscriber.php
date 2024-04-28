<?php


namespace App\EventSubscriber;

use App\Event\UserEvent;
use App\Security\EmailVerifier;
use Doctrine\Persistence\ManagerRegistry;
use Kritek\EmailTemplateBundle\Entity\EmailTemplate;
use Kritek\EmailTemplateBundle\Service\EmailTemplateService;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class UserEmailSubscriber implements EventSubscriberInterface
{
    protected $mailer;
    protected $router;
    protected $noReplyEmail;
    protected $contactEmail;
    private $translator;
    private $emailVerifier;
    private $managerRegistry;
    private $emailTemplateService;

    public function __construct(MailerInterface $mailer, UrlGeneratorInterface $router, $noReplyEmail, TranslatorInterface $translator, ManagerRegistry $managerRegistry, EmailVerifier $emailVerifier = null, EmailTemplateService $emailTemplateService = null)
    {
        $this->mailer = $mailer;
        $this->router = $router;
        $this->noReplyEmail = $noReplyEmail;
        $this->translator = $translator;
        $this->emailVerifier = $emailVerifier;
        $this->managerRegistry = $managerRegistry;
        $this->emailTemplateService = $emailTemplateService;
    }

    public function onUserSendPlainPassword(UserEvent $userEvent)
    {
        $manager = $this->managerRegistry->getManager();
        $emailTemplate = $manager->getRepository(EmailTemplate::class)->findOneBy(["slug" => "user-registration-password"]);
        $content = null;
        if ($emailTemplate) {
            $content = $this->emailTemplateService->getContentBasedOnCurrentLanguage($emailTemplate);
        }

        $user = $userEvent->getUser();
        $email =
            (new TemplatedEmail())
                ->from($this->noReplyEmail)
                ->to($user->getEmail())
                ->subject($content?->getSubject() ?? 'Your password')
                ->htmlTemplate('@KritekAdmin/emails/plain_password.html.twig')
                ->context([
                    'user' => $user,
                    "content" => $content,
                    'plainPassword' => $userEvent->getPlainPassword()
                ]);
        $this->mailer->send($email);
    }


    public function onUserConfirmEmail(UserEvent $userEvent)
    {
        $manager = $this->managerRegistry->getManager();
        $emailTemplate = $manager->getRepository(EmailTemplate::class)->findOneBy(["slug" => "user-registration-confirm"]);
        $content = null;
        if ($emailTemplate) {
            $content = $this->emailTemplateService->getContentBasedOnCurrentLanguage($emailTemplate);
        }

        $user = $userEvent->getUser();

        $this->emailVerifier->sendEmailConfirmation(
            'app_verify_email',
            $user,
            (new TemplatedEmail())
                ->from($this->noReplyEmail)
                ->to($user->getEmail())
                ->subject($content?->getSubject() ?? 'Confirm your email')
                ->htmlTemplate('@KritekAdmin/emails/confirmation_email.html.twig')
                ->context([
                    'user' => $user,
                    "content" => $content,
                ])
        );
    }


    public static function getSubscribedEvents(): array
    {
        return [
            UserEvent::CONFIRM_EMAIL => 'onUserConfirmEmail',
            UserEvent::SEND_PLAIN_PASSWORD => 'onUserSendPlainPassword',
        ];
    }
}
