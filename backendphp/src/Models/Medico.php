<?php
namespace App\Models;

use PDO;

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
        $sql = "INSERT INTO medicos (nome, crm, ufcrm) VALUES (:nome, :crm, :ufcrm)";
        $stmt = $this->conexao->prepare($sql);

        $nomeLimpo = htmlspecialchars(strip_tags($dados['nome']));
        $crmLimpo = htmlspecialchars(strip_tags($dados['crm']));
        $ufcrmlimpo = htmlspecialchars(strip_tags($dados['ufcrm']));

        $stmt->bindValue(':nome', $nomeLimpo);
        $stmt->bindValue(':crm', $crmLimpo);
        $stmt->bindValue(':ufcrm', $ufcrmlimpo);

        return $stmt->execute();
    }
}