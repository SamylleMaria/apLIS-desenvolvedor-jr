<?php
namespace App\Controllers;

use App\Config\Database;
use App\Models\Medico;

class MedicoController {
    private ?\PDO $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConexao();
    }

    public function listar() {
        header('Content-Type: application/json; chartset=UTF-8');

        $modelMedico = new Medico($this->db);
        $listaMedicos = $modelMedico->listarTodos();
        
        echo json_encode($listaMedicos);
    }
}