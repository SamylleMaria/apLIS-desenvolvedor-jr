<?php

use App\Controllers\MedicoController;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$metodo = $_SERVER['REQUEST_METHOD'];

    $controller = new MedicoController();

    if ($metodo === 'GET' && $uri === '/api/v1/medicos') {
        $controller->listar();
        exit;
    }


    if ($metodo === 'POST' && $uri === '/api/v1/medicos') {
        $controller->cadastrar();
        exit;
    }

