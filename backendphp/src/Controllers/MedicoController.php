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

    public function cadastrar() {
        header('Content-Type: application/json; charset=UTF-8');

        try{
            $json_recebido = file_get_contents('php://input');
            $dados = json_decode($json_recebido, true);

            if (empty($dados['nome']) || empty($dados['crm']) || empty($dados['ufcrm'])) {
                http_response_code(400);
                echo json_encode(['erro' => 'Todos os campos (nome, crm, ufcrm) são obrigatórios.']);

                return;
            }

            $modelMedico = new Medico($this->db);
            $modelMedico->cadastrarMedico($dados);

            http_response_code(201);
            echo json_encode(['status' => 'SUCESSO', 'mensagem' => 'Médico criado com sucesso!']);

        } catch (\Exception $e) {
                http_response_code(409);
                echo json_encode(['erro' => $e->getMessage()]);
            
            }

    }
    public function editar(int $id) {
    header('Content-Type: application/json; charset=UTF-8');

        try {
            $json_recebido = file_get_contents('php://input');
            $dados = json_decode($json_recebido, true);

            if (empty($dados['nome']) || empty($dados['crm']) || empty($dados['ufcrm'])) {
                http_response_code(400);
                echo json_encode(['erro' => 'Preencha todos os campos para editar.']);
                return;
            }

            $modelMedico = new Medico($this->db);
            $modelMedico->editarMedico($id, $dados);

            echo json_encode(['status' => 'SUCESSO', 'mensagem' => 'Médico atualizado com sucesso!']);
        } catch (\Exception $e) {
            http_response_code(409);
            echo json_encode(['erro' => $e->getMessage()]);
        }
    }

    public function deletar(int $id) {
        header('Content-Type: application/json; charset=UTF-8');

        try {
            $modelMedico = new Medico($this->db);
            $modelMedico->deletarMedico($id);

            echo json_encode(['status' => 'SUCESSO', 'mensagem' => 'Médico removido com sucesso!']);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(['erro' => 'Erro ao deletar médico.']);
        }
    }
}