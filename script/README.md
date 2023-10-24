# Documentação do Script e Pipeline - Atualização e Implantação do Weedu Client

## **Descrição**

Este documento fornece informações sobre um script e um pipeline usados para atualizar e implantar o Weedu Client em um servidor remoto. O script é responsável por atualizar o código-fonte da aplicação e executar um script de implantação no servidor. O pipeline automatiza a execução desse script em um ambiente de integração contínua (CI).

## **Script de Atualização e Implantação**

### **Descrição**

O script de atualização e implantação é responsável por realizar as seguintes ações:

1. Navega até o diretório da aplicação Weedu.
2. Atualiza o repositório Git da aplicação.
3. Executa um script de implantação chamado "deploy.sh".

### **Uso**

Para usar o script, siga os passos a seguir:

1. **Navegação até o Diretório da Aplicação:**
    - **`cd /home/ubuntu/weedu-client`**
    - Este comando muda o diretório de trabalho para a localização do código-fonte da aplicação Weedu.
2. **Atualização do Repositório Git:**
    - **`sudo git pull --rebase`**
    - O comando "git pull --rebase" é usado para atualizar o repositório Git da aplicação Weedu.
3. **Execução do Script de Implantação:**
    - **`script/deploy.sh`**
    - Após a atualização do código-fonte, o script "deploy.sh" é executado para implantar a aplicação.

### **Pré-requisitos**

Certifique-se de que os seguintes pré-requisitos estejam atendidos antes de executar o script:

- Acesso ao servidor onde a aplicação Weedu está instalada.
- O arquivo "devops.pem" deve estar presente no diretório onde o script é executado.
- Permissões de superusuário (sudo) para executar os comandos.

### **Exemplo de Uso**

Aqui está um exemplo de como executar o script:

```bash
./script.sh
```

## **Pipeline de Integração Contínua (CI)**

### **Descrição**

O pipeline de integração contínua automatiza a execução do script de atualização e implantação em um ambiente de CI/CD. Ele garante que as atualizações do código-fonte sejam refletidas no servidor de implantação de forma eficiente.

### **Configuração do Pipeline**

O pipeline é configurado da seguinte forma:

- **Imagem Docker Utilizada:**
    - **`atlassian/default-image:2`**
    - A imagem Docker padrão é usada para a execução deste pipeline.
- **Etapas do Pipeline:**
    - Nome da Etapa: "Deploy via SSH"
    - Script:
        
        ```bash
        - chmod 400 devops.pem
        - ssh -i devops.pem ubuntu@18.232.197.188 "cd /home/ubuntu/weedu-client && sudo git pull --rebase && script/deploy.sh"
        
        ```
        
        - A etapa realiza as seguintes ações:
            - Altera as permissões do arquivo "devops.pem" para torná-lo seguro.
            - Conecta-se via SSH ao servidor usando a chave "devops.pem".
            - Navega até o diretório da aplicação Weedu no servidor.
            - Atualiza o repositório Git com "git pull --rebase".
            - Executa o script de implantação "deploy.sh".

### **Pré-requisitos**

Certifique-se de que os seguintes pré-requisitos estejam atendidos antes de executar o pipeline:

- Configuração do arquivo "devops.pem" com as chaves SSH necessárias.
- O servidor de destino (no exemplo, "ubuntu@18.232.197.188") deve estar acessível via SSH.

## **Conclusão**

Este documento fornece informações detalhadas sobre o script e o pipeline usados para atualizar e implantar o Weedu Client em um servidor remoto. Seguindo as instruções e pré-requisitos fornecidos, é possível manter e implantar a aplicação de forma eficiente.

Isso conclui a documentação combinada do script e do pipeline. Se você tiver mais perguntas ou precisar de informações adicionais, não hesite em perguntar.