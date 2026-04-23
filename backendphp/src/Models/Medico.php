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

    public function editarMedico(int $id, array $dados): bool {
    // Sanitização dos dados
    $nomeLimpo = htmlspecialchars(strip_tags($dados['nome']));
    $crmLimpo = htmlspecialchars(strip_tags($dados['crm']));
    $ufcrmLimpo = htmlspecialchars(strip_tags($dados['ufcrm']));

    $sql = "UPDATE medicos SET nome = :nome, crm = :crm, ufcrm = :ufcrm WHERE id = :id";
    $stmt = $this->conexao->prepare($sql);

        try {
            $stmt->bindValue(':nome', $nomeLimpo);
            $stmt->bindValue(':crm', $crmLimpo);
            $stmt->bindValue(':ufcrm', $ufcrmLimpo);
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);

            return $stmt->execute();
            
        } catch (PDOException $e) {
            if ($e->errorInfo[1] === 1062) {
                throw new Exception('Este CRM já está sendo usado por outro médico.');
            }
            throw $e;
        }
    }

    public function deletarMedico(int $id): bool {
        $sql = "DELETE FROM medicos WHERE id = :id";
        $stmt = $this->conexao->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        
        return $stmt->execute();
    }
}