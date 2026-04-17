<?php
namespace App\Models;

use PDO;

class Medico {
    private ?PDO $conexao;

    public function __construct(PDO $conexao) {
        $this->conexao = $conexao; 
    }

    public function listarTodos(): array {
        $sql = "SELECT id, nome, crm, uf_crm FROM medicos";
        $stmt = $this->conexao->prepare($sql);
        $stmt->execute();

         return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}