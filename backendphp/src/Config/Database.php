<?php

namespace App\Config;

use PDO;
use PDOException;


class Database {
    private ?PDO $conexao = null;

    public function getConexao(): ?PDO {
        if($this->conexao === null) {
            try {
                $host = $_ENV['DB_HOST'];
                $port = $_ENV['DB_PORT'];
                $db_name = $_ENV['DB_DATABASE'];
                $username = $_ENV['DB_USERNAME'];
                $password = $_ENV['DB_PASSWORD'];

                $dsn = "mysql:host={$host};port={$port};dbname={$db_name};charset=utf8mb4";

                $options = [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ];

                $this->conexao = new PDO($dsn, $username, $password, $options);

            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode ([
                    'erro' => 'Erro de conexão com o banco de dados.'
                ]);
                exit;
            }
        }
        return $this->conexao;
    }
}