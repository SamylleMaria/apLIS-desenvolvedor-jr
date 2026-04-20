<?php
namespace App\Models;

use Exception;
use PDO;
use PDOException;

class Medico {
    private ?PDO $conexao;

    public function __construct(PDO $conexao) {
        $this->conexao = $conexao; 
    }

    public function listarTodos(): array {
        $sql = "SELECT id, nome, crm, ufcrm FROM medicos";
        $stmt = $this->conexao->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function cadastrarMedico(array $dados): bool {

        $nomeLimpo = htmlspecialchars(strip_tags($dados['nome']));
        $crmLimpo = htmlspecialchars(strip_tags($dados['crm']));
        $ufcrmLimpo = htmlspecialchars(strip_tags($dados['ufcrm']));

        if(empty($nomeLimpo) || empty($crmLimpo) || empty($ufcrmLimpo)) {
            throw new Exception('Nome, CRM e UF são obrigatórios.');
        }

        $sql = "INSERT INTO medicos (nome, crm, ufcrm) VALUES (:nome, :crm, :ufcrm)";
        $stmt = $this->conexao->prepare($sql);


        try {
            $stmt->bindValue(':nome', $nomeLimpo);
            $stmt->bindValue(':crm', $crmLimpo);
            $stmt->bindValue(':ufcrm', $ufcrmLimpo);

            return $stmt->execute();


            } catch (PDOException $e) {
                if ($e->errorInfo[1] === 1062) {
                    throw new Exception('CRM já cadastrado');
                }
            throw $e;
        }
    }
}