# Sistema de Acompanhamento de Alunos

## Resumo

O Sistema de Acompanhamento de Alunos é uma aplicação web projetada para ajudar professores e administradores escolares a gerenciar turmas, alunos e aulas de forma eficiente. O sistema permite o controle de presenças, registro de dificuldades dos alunos e oferece uma visão geral do desempenho das turmas.

## Funções e Escopo do Projeto

1. Gerenciamento de turmas:
   - Adicionar novas turmas com quantidade específica de aulas (4, 8 ,12 ou 18)
   - Visualizar lista de turmas existentes
   - Excluir turmas

2. Gerenciamento de alunos:
   - Adicionar novos alunos a uma turma
   - Editar informações dos alunos
   - Excluir alunos de uma turma

3. Controle de presenças:
   - Registrar presenças dos alunos por aula
   - Visualizar histórico de presenças

4. Gerenciamento de dificuldades:
   - Adicionar dificuldades para cada aluno
   - Marcar dificuldades como resolvidas
   - Visualizar lista de dificuldades por aluno

5. Gerenciamento de aulas:
   - Editar informações das aulas
   - Visualizar lista de aulas por turma

## Backlog e Correções de Bugs

1. Bug NaN na quantidade de aulas:
   - **Problema:** Ao adicionar as aulas, a quantidade era mostrada como NaN.
   - **Solução:** Resolvido trocando o ID do formulário, pois estava sendo utilizado em outra função, gerando conflito.

2. Verificação de turmas com nome repetido:
   - **Problema:** Não havia verificação para turmas com nome repetido.
   - **Solução:** Implementada verificação ao adicionar nova turma.

3. Exclusão e edição de alunos:
   - **Problema:** Não era possível excluir aluno ou editar informações.
   - **Solução:** Adicionados elementos como novo modal e respectivas funções.

4. Baixa visibilidade na navegação:
   - **Problema:** Navegação de aula e alunos com baixa visibilidade.
   - **Solução:** Mudada a cor da fonte e estilos para melhorar a visibilidade.

5. Funções de contagem e edição de faltas:
   - **Problema:** Faltavam as funções de contar e editar faltas.
   - **Solução:** Implementadas funções para verificar e editar presenças.

6. UI do sistema de presenças:
   - **Problema:** Interface do usuário para o sistema de presenças precisava de melhorias.
   - **Solução:** Redesenhada a UI para tornar mais intuitiva e fácil de usar.

7. Edição de aulas:
   - **Problema:** Erro ao tentar editar e salvar informações da aula, página recarregava.
   - **Solução:** Modificada a função de edição de aulas para corrigir o problema.

8. Gerenciamento de dificuldades:
   - **Problema:** Faltava funcionalidade para gerenciar dificuldades dos alunos.
   - **Solução:** Implementada função para contagem e listagem de dificuldades ao estilo to-do list.

9. Modulação do código:
   - **Problema:** Código não estava bem organizado.
   - **Solução:** Separadas responsabilidades e criada nova pasta para melhor organização.

10. Bug na contagem de presenças:
    - **Problema:** Ao excluir um aluno, a contagem de presenças não considerava a lista atualizada.
    - **Solução:** Corrigida a função relacionada para atualizar corretamente a contagem.

## Sugestões para Implementações Futuras

1. Adicionar número na chamada para os alunos (embora possa não ser necessário devido ao ID existente no backend para cada aluno).
2. Gerar relatório da turma com gráficos e filtros para melhor visualização.
3. Adicionar funcionalidade para incluir aulas extras, se necessário.
4. Implementar roles de admin e usuário com diferentes responsabilidades.
5. Adicionar local storage como exemplo para futuras implementações com banco de dados.

## Como Usar

Realize o fork do repositorio e habilite o live share na sua IDE favorita

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)

## Contribuição

Luan Oliveira (código original)

Johnny Alysson
