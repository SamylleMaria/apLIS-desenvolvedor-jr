<?php

use App\Controllers\MedicoController;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$metodo = $_SERVER['REQUEST_METHOD'];

$controller = new MedicoController();

$partesUri = explode('/', trim($uri, '/'));
$id = (isset($partesUri[3]) && is_numeric($partesUri[3])) ? (int)$partesUri[3] : null;

if ($metodo === 'GET' && $uri === '/api/v1/medicos') {
    $controller->listar();
    exit;
}

if ($metodo === 'POST' && $uri === '/api/v1/medicos') {
    $controller->cadastrar();
    exit;
}

if ($metodo === 'PUT' && $id && strpos($uri, '/api/v1/medicos') !== false) {
    $controller->editar($id);
    exit;
}

if ($metodo === 'DELETE' && $id && strpos($uri, '/api/v1/medicos') !== false) {
    $controller->deletar($id);
    exit;
}


http_response_code(404);
echo json_encode(['erro' => 'Rota não encontrada']);