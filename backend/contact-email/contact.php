<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

const ALLOWED_ORIGIN = 'https://assuredrestoration.com';
const MAX_REQUEST_BYTES = 32768;
const MAX_FIELD_LENGTHS = [
    'name' => 120,
    'email' => 254,
    'phone' => 40,
    'service' => 120,
    'address' => 250,
    'message' => 500,
    'website' => 250,
];

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
sendCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST, OPTIONS');
    respond(405, false, 'Method not allowed.');
}

$contentType = strtolower(trim((string) ($_SERVER['CONTENT_TYPE'] ?? '')));
if (strpos($contentType, 'application/json') !== 0) {
    respond(415, false, 'Content-Type must be application/json.');
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > MAX_REQUEST_BYTES) {
    respond(413, false, 'Request is too large.');
}

$rawBody = file_get_contents('php://input', false, null, 0, MAX_REQUEST_BYTES + 1);
if ($rawBody === false || strlen($rawBody) > MAX_REQUEST_BYTES) {
    respond(413, false, 'Request is too large.');
}

try {
    $payload = json_decode($rawBody, true, 32, JSON_THROW_ON_ERROR);
} catch (JsonException $exception) {
    respond(400, false, 'Invalid JSON request body.');
}

if (!is_array($payload)) {
    respond(400, false, 'Invalid JSON request body.');
}

$data = [];
foreach (MAX_FIELD_LENGTHS as $field => $maxLength) {
    $value = $payload[$field] ?? '';
    if (!is_string($value)) {
        respond(422, false, sprintf('The %s field must be text.', $field));
    }

    $data[$field] = sanitizeText($value, $maxLength);
}

// Bots commonly fill hidden fields. Return success so they do not retry.
if ($data['website'] !== '') {
    respond(200, true, 'Your message has been sent.');
}

$requiredFields = [
    'name' => 'Name',
    'email' => 'Email',
    'phone' => 'Phone',
    'service' => 'Service',
];

foreach ($requiredFields as $field => $label) {
    if ($data[$field] === '') {
        respond(422, false, sprintf('%s is required.', $label));
    }
}

if (filter_var($data['email'], FILTER_VALIDATE_EMAIL) === false) {
    respond(422, false, 'Please enter a valid email address.');
}

loadEnvironment();

$smtpHost = requireEnvironment('SMTP_HOST');
$smtpPort = requireIntegerEnvironment('SMTP_PORT');
$smtpUsername = requireEnvironment('SMTP_USERNAME');
$smtpPassword = requireEnvironment('SMTP_PASSWORD');
$smtpEncryption = strtolower(requireEnvironment('SMTP_ENCRYPTION'));
$mailFrom = requireEmailEnvironment('MAIL_FROM');
$mailFromName = requireEnvironment('MAIL_FROM_NAME');
$mailTo = requireEmailEnvironment('MAIL_TO');

$autoloadPaths = [
    __DIR__ . '/vendor/autoload.php',
    dirname(__DIR__) . '/vendor/autoload.php',
];

$autoloadPath = null;
foreach ($autoloadPaths as $candidate) {
    if (is_file($candidate)) {
        $autoloadPath = $candidate;
        break;
    }
}

if ($autoloadPath === null) {
    error_log('Contact form: PHPMailer autoloader was not found.');
    respond(500, false, 'The message service is temporarily unavailable.');
}

require $autoloadPath;

$requestId = bin2hex(random_bytes(8));

try {
    $mailer = new PHPMailer(true);
    $mailer->isSMTP();
    $mailer->Host = $smtpHost;
    $mailer->Port = $smtpPort;
    $mailer->SMTPAuth = true;
    $mailer->Username = $smtpUsername;
    $mailer->Password = $smtpPassword;
    $mailer->CharSet = PHPMailer::CHARSET_UTF8;
    $mailer->Timeout = 15;
    $mailer->SMTPKeepAlive = false;

    if (in_array($smtpEncryption, ['tls', 'starttls'], true)) {
        $mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    } elseif (in_array($smtpEncryption, ['ssl', 'smtps'], true)) {
        $mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } elseif (!in_array($smtpEncryption, ['', 'none'], true)) {
        throw new RuntimeException('Unsupported SMTP_ENCRYPTION value.');
    }

    $mailer->setFrom($mailFrom, $mailFromName);
    $mailer->addAddress($mailTo);
    $mailer->addReplyTo($data['email'], $data['name']);
    $mailer->Subject = buildSubject($data['name'], $data['service']);
    $mailer->isHTML(true);
    $mailer->Body = buildHtmlBody($data, $requestId);
    $mailer->AltBody = buildTextBody($data, $requestId);
    $mailer->send();

    respond(200, true, 'Your message has been sent.');
} catch (Throwable $exception) {
    error_log(sprintf('Contact form [%s]: %s', $requestId, $exception->getMessage()));
    respond(500, false, 'We could not send your message right now. Please try again or call us.');
}

function sendCorsHeaders(): void
{
    $origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
    header('Vary: Origin');

    if ($origin !== '' && $origin !== ALLOWED_ORIGIN) {
        respond(403, false, 'Origin not allowed.');
    }

    if ($origin === ALLOWED_ORIGIN) {
        header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Max-Age: 86400');
    }
}

function sanitizeText(string $value, int $maxLength): string
{
    $value = str_replace("\0", '', $value);
    $value = strip_tags($value);
    $value = preg_replace('/[ \t]+/u', ' ', $value) ?? '';
    $value = preg_replace('/\R{3,}/u', "\n\n", $value) ?? '';
    $value = trim($value);

    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength, 'UTF-8');
    }

    return substr($value, 0, $maxLength);
}

function loadEnvironment(): void
{
    $customPath = getenv('CONTACT_ENV_FILE');
    $paths = array_filter([
        is_string($customPath) ? $customPath : null,
        dirname(__DIR__, 2) . '/.env',
        dirname(__DIR__) . '/.env',
        __DIR__ . '/.env',
    ]);

    foreach ($paths as $path) {
        if (!is_file($path) || !is_readable($path)) {
            continue;
        }

        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lines === false) {
            continue;
        }

        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || $line[0] === '#') {
                continue;
            }

            $parts = explode('=', $line, 2);
            if (count($parts) !== 2) {
                continue;
            }

            $key = trim($parts[0]);
            $value = trim($parts[1]);
            if ($key === '' || getenv($key) !== false) {
                continue;
            }

            if (strlen($value) >= 2) {
                $first = $value[0];
                $last = $value[strlen($value) - 1];
                if (($first === '"' && $last === '"') || ($first === "'" && $last === "'")) {
                    $value = substr($value, 1, -1);
                }
            }

            putenv($key . '=' . $value);
            $_ENV[$key] = $value;
        }

        return;
    }
}

function requireEnvironment(string $key): string
{
    $value = getenv($key);
    if (!is_string($value) || trim($value) === '') {
        error_log(sprintf('Contact form: required environment variable %s is missing.', $key));
        respond(500, false, 'The message service is temporarily unavailable.');
    }

    return trim($value);
}

function requireIntegerEnvironment(string $key): int
{
    $value = requireEnvironment($key);
    $integer = filter_var($value, FILTER_VALIDATE_INT, [
        'options' => ['min_range' => 1, 'max_range' => 65535],
    ]);

    if ($integer === false) {
        error_log(sprintf('Contact form: environment variable %s is invalid.', $key));
        respond(500, false, 'The message service is temporarily unavailable.');
    }

    return $integer;
}

function requireEmailEnvironment(string $key): string
{
    $value = requireEnvironment($key);
    if (filter_var($value, FILTER_VALIDATE_EMAIL) === false) {
        error_log(sprintf('Contact form: environment variable %s is not a valid email.', $key));
        respond(500, false, 'The message service is temporarily unavailable.');
    }

    return $value;
}

function buildSubject(string $name, string $service): string
{
    return sprintf('Website inquiry: %s - %s', singleLine($service), singleLine($name));
}

function buildHtmlBody(array $data, string $requestId): string
{
    $rows = [
        'Name' => $data['name'],
        'Email' => $data['email'],
        'Phone' => $data['phone'],
        'Service' => $data['service'],
        'Address' => $data['address'],
        'Message' => $data['message'],
    ];

    $htmlRows = '';
    foreach ($rows as $label => $value) {
        if ($value === '') {
            continue;
        }

        $htmlRows .= sprintf(
            '<tr><th style="padding:10px 12px;text-align:left;vertical-align:top;background:#f3f4f6;border:1px solid #d1d5db;width:120px;">%s</th><td style="padding:10px 12px;border:1px solid #d1d5db;">%s</td></tr>',
            escapeHtml($label),
            nl2br(escapeHtml($value))
        );
    }

    return '<!doctype html><html><body style="font-family:Arial,sans-serif;color:#1f2937;">'
        . '<h2 style="color:#3D4F5F;">New Assured Restoration website inquiry</h2>'
        . '<p>A visitor submitted the contact form at assuredrestoration.com.</p>'
        . '<table style="border-collapse:collapse;width:100%;max-width:700px;">' . $htmlRows . '</table>'
        . '<p style="font-size:12px;color:#6b7280;">Reply to this email to respond directly to the visitor.<br>Reference: '
        . escapeHtml($requestId) . '</p></body></html>';
}

function buildTextBody(array $data, string $requestId): string
{
    $lines = [
        'New Assured Restoration website inquiry',
        '',
        'Name: ' . $data['name'],
        'Email: ' . $data['email'],
        'Phone: ' . $data['phone'],
        'Service: ' . $data['service'],
    ];

    if ($data['address'] !== '') {
        $lines[] = 'Address: ' . $data['address'];
    }

    if ($data['message'] !== '') {
        $lines[] = '';
        $lines[] = 'Message:';
        $lines[] = $data['message'];
    }

    $lines[] = '';
    $lines[] = 'Reply to this email to respond directly to the visitor.';
    $lines[] = 'Reference: ' . $requestId;

    return implode("\n", $lines);
}

function singleLine(string $value): string
{
    return trim(preg_replace('/\s+/u', ' ', $value) ?? '');
}

function escapeHtml(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function respond(int $status, bool $success, string $message): void
{
    http_response_code($status);
    echo json_encode(
        ['success' => $success, 'message' => $message],
        JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
    );
    exit;
}
