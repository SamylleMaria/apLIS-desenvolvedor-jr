<?php
ini_set('displapy_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Acesse-Control-Allow-Headers: Content-Type, Authorization');
header('Acesse-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Content-type: application/json; charset=UTF-8');

require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$metodo = $_SERVER['REQUEST_METHOD'];

use App\Controllers\MedicoController;

if ($metodo === 'GET' && $uri === '/api/v1/medicos') {
    $controller = new MedicoController();
    $controller->listar();
    exit;
}

http_response_code(404);
echo json_encode(['erro' => 'Rota não encontrada']);